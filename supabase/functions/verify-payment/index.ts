import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sendWeb3Forms = async (
  subject: string,
  message: string,
  email: string,
) => {
  const accessKey = Deno.env.get('WEB3FORMS_ACCESS_KEY');

  if (!accessKey) {
    throw new Error('WEB3FORMS_ACCESS_KEY is not configured.');
  }

  const body = new FormData();
  body.append('access_key', accessKey);
  body.append('subject', subject);
  body.append('from_name', 'SAJ Associates Website');
  body.append('message', message);
  body.append('email', email);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Email notification failed.');
  }
};

const formatOrderMessage = (order: any) => {
  const itemLines = (order.items || [])
    .map(
      (item: any) =>
        `• ${item.name}\n` +
        `  Qty: ${item.quantity}\n` +
        `  Unit Price: Rs. ${Number(item.unitPrice).toLocaleString()}\n` +
        `  Line Total: Rs. ${Number(item.lineTotal).toLocaleString()}`,
    )
    .join('\n\n');

  return `NEW PAID ONLINE ORDER

Order Number: ${order.order_number}
Payment: ONLINE CARD PAYMENT
Payment Status: PAID
Marx Transaction ID: ${order.marx_transaction_id}

${itemLines}

Subtotal: Rs. ${Number(order.subtotal).toLocaleString()}
Delivery: Rs. ${Number(order.delivery_fee).toLocaleString()}
Total Paid: Rs. ${Number(order.total_amount).toLocaleString()}

Customer:
${order.customer_name}
Phone: ${order.customer_phone}
Email: ${order.customer_email}

Delivery Address:
${order.address}
${order.city}${order.province ? `, ${order.province}` : ''}${order.postal_code ? ` ${order.postal_code}` : ''}
${order.delivery_note ? `\nDelivery Note: ${order.delivery_note}` : ''}`;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  try {
    const body = await request.json();

    // MarxPay transaction IDs can be UUID strings.
    // Never convert them to numbers.
    const trId = String(body?.trId ?? '').trim();
    const merchantRID = String(body?.merchantRID ?? '').trim();

    if (!trId || !merchantRID) {
      return json({ error: 'Invalid payment references.' }, 400);
    }

    // Find the order using the merchant reference.
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('marx_merchant_rid', merchantRID)
      .maybeSingle();

    if (orderError) {
      throw orderError;
    }

    if (!order) {
      return json({ error: 'Payment order could not be found.' }, 404);
    }

    // Compare transaction IDs as strings.
    const storedTrId = String(order.marx_transaction_id ?? '').trim();

    if (!storedTrId || storedTrId !== trId) {
      return json(
        {
          error:
            'Payment transaction reference does not match the stored order.',
        },
        400,
      );
    }

    // Prevent duplicate verification and email notifications.
    if (order.payment_status === 'paid') {
      return json({
        success: true,
        paid: true,
        orderNumber: order.order_number,
        message: 'Payment already verified.',
      });
    }

    const marxApiKey = Deno.env.get('MARX_API_KEY');

    const marxBaseUrl = (
      Deno.env.get('MARX_BASE_URL') ||
      'https://payment.api.dev.marxpos.com/api/v4/ipg/orders'
    ).replace(/\/$/, '');

    if (!marxApiKey) {
      return json({ error: 'Payment gateway is not configured.' }, 500);
    }

    // Verify the transaction directly with MarxPay.
    // The UUID is retained as a string in the URL path.
    const marxResponse = await fetch(
      `${marxBaseUrl}/${encodeURIComponent(trId)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'merchant-api-key': marxApiKey,
        },
        body: JSON.stringify({ merchantRID }),
      },
    );

    const marxResult = await marxResponse.json().catch(() => ({}));

    if (!marxResponse.ok) {
      console.error('MarxPay verification HTTP error:', {
        status: marxResponse.status,
        response: marxResult,
      });

      return json(
        {
          error:
            'Unable to verify payment with the gateway. Please try again or contact support.',
        },
        502,
      );
    }

    const data = marxResult?.data;

    const gatewayCode = String(
      data?.gatewayResponse?.response?.gatewayCode ?? '',
    );

    const summaryResult = String(data?.summaryResult ?? '');

    const capturedAmount = Number(
      data?.gatewayResponse?.order?.totalCapturedAmount ??
        data?.gatewayResponse?.order?.amount ??
        NaN,
    );

    const responseTrId = String(data?.trId ?? '').trim();

    const responseRID = String(data?.merchantRID ?? '').trim();

    const approvedGatewayCodes = new Set([
      'APPROVED',
      'APPROVED_AUTO',
      'APPROVED_PENDING_SETTLEMENT',
    ]);

    // Do not trust the browser redirect alone.
    // Confirm gateway status, both references, and amount.
    const paid =
      marxResult?.status === 0 &&
      summaryResult === 'SUCCESS' &&
      approvedGatewayCodes.has(gatewayCode) &&
      responseTrId === trId &&
      responseRID === merchantRID &&
      Number.isFinite(capturedAmount) &&
      Math.round(capturedAmount * 100) ===
        Math.round(Number(order.total_amount) * 100);

    if (!paid) {
      console.error('MarxPay payment not approved:', {
        gatewayCode,
        summaryResult,
        responseTrIdMatches: responseTrId === trId,
        responseRIDMatches: responseRID === merchantRID,
        capturedAmount,
        expectedAmount: Number(order.total_amount),
        response: marxResult,
      });

      // Store the gateway response for troubleshooting.
      await supabase
        .from('orders')
        .update({
          marx_gateway_code: gatewayCode || null,
          marx_response: marxResult,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      return json({
        success: false,
        paid: false,
        orderNumber: order.order_number,
        message: gatewayCode
          ? `Payment was not verified (${gatewayCode}).`
          : 'Payment could not be verified. Please contact support if you were charged.',
      });
    }

    // Mark as paid only after server-side verification.
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        marx_gateway_code: gatewayCode,
        marx_response: marxResult,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)
      .neq('payment_status', 'paid')
      .select('id')
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    // If another request already marked it paid,
    // do not send a duplicate notification.
    if (updatedOrder && !order.email_sent_at) {
      try {
        await sendWeb3Forms(
          `PAID Online Order - ${order.order_number}`,
          formatOrderMessage({
            ...order,
            payment_status: 'paid',
            marx_transaction_id: trId,
          }),
          order.customer_email,
        );

        await supabase
          .from('orders')
          .update({
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', order.id)
          .is('email_sent_at', null);
      } catch (emailError) {
        console.error('Paid order email notification failed:', emailError);
      }
    }

    return json({
      success: true,
      paid: true,
      orderNumber: order.order_number,
      message: 'Payment verified successfully.',
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    return json(
      {
        error:
          error instanceof Error ? error.message : 'Unable to verify payment.',
      },
      500,
    );
  }
});
