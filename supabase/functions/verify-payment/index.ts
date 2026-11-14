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

// --------------------------------------------------
// WEB3FORMS EMAIL NOTIFICATION
// --------------------------------------------------

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

// --------------------------------------------------
// ORDER EMAIL FORMAT
// --------------------------------------------------

const formatOrderMessage = (order: any) => {
  const itemLines = (order.items || [])
    .map(
      (item: any) =>
        `• ${item.name}\n` +
        `Qty: ${item.quantity}\n` +
        `Unit Price: Rs. ${Number(item.unitPrice).toLocaleString()}\n` +
        `Line Total: Rs. ${Number(item.lineTotal).toLocaleString()}`,
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

// --------------------------------------------------
// META CONVERSIONS API HELPERS
// --------------------------------------------------

const sha256 = async (value: string): Promise<string> => {
  const data = new TextEncoder().encode(value);

  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const normalizeEmail = (value: unknown): string => {
  return String(value ?? '')
    .trim()
    .toLowerCase();
};

const normalizePhone = (value: unknown): string => {
  return String(value ?? '')
    .replace(/\D/g, '')
    .replace(/^0+/, '');
};

// One stable event ID per order.
// The same ID must be used by the browser Meta Pixel.
const getPurchaseEventId = (order: any): string => {
  return `saj_purchase_${order.id}`;
};

// --------------------------------------------------
// SEND META PURCHASE EVENT
// --------------------------------------------------

const sendMetaPurchase = async (
  order: any,
  request: Request,
): Promise<boolean> => {
  const pixelId = Deno.env.get('META_PIXEL_ID');
  const accessToken = Deno.env.get('META_ACCESS_TOKEN');

  if (!pixelId || !accessToken) {
    console.error(
      'Meta Purchase skipped: META_PIXEL_ID or META_ACCESS_TOKEN is missing.',
    );
    return false;
  }

  const apiVersion = Deno.env.get('META_API_VERSION') || 'v25.0';

  const eventId = getPurchaseEventId(order);

  const email = normalizeEmail(order.customer_email);
  const phone = normalizePhone(order.customer_phone);

  const userData: Record<string, unknown> = {};

  if (email) {
    userData.em = [await sha256(email)];
  }

  if (phone) {
    userData.ph = [await sha256(phone)];
  }

  const customerName = String(order.customer_name ?? '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (customerName[0]) {
    userData.fn = [await sha256(customerName[0])];
  }

  if (customerName.length > 1) {
    userData.ln = [await sha256(customerName.slice(1).join(' '))];
  }

  // These values are not hashed.
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  const userAgent = request.headers.get('user-agent');

  if (clientIp) {
    userData.client_ip_address = clientIp;
  }

  if (userAgent) {
    userData.client_user_agent = userAgent;
  }

  const contents = (order.items || []).map((item: any) => ({
    id: String(item.id ?? item.name),
    quantity: Number(item.quantity),
    item_price: Number(item.unitPrice),
  }));

  const contentIds = (order.items || []).map((item: any) =>
    String(item.id ?? item.name),
  );

  const origin = request.headers.get('origin');

  const eventSourceUrl =
    origin && /^https?:\/\//i.test(origin) ? origin : 'https://www.saja.lk';

  const event = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: eventSourceUrl,
    user_data: userData,
    custom_data: {
      currency: 'LKR',
      value: Number(order.total_amount),
      order_id: String(order.order_number),
      content_type: 'product',
      content_ids: contentIds,
      contents,
      num_items: (order.items || []).reduce(
        (total: number, item: any) => total + Number(item.quantity || 0),
        0,
      ),
    },
  };

  const payload: Record<string, unknown> = {
    data: [event],
  };

  const testEventCode = Deno.env.get('META_TEST_EVENT_CODE');

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok || Number(result?.events_received ?? 0) < 1) {
    console.error('Meta Purchase API error:', {
      status: response.status,
      result,
      orderNumber: order.order_number,
    });

    return false;
  }

  console.log('Meta Purchase event accepted:', {
    eventId,
    orderNumber: order.order_number,
    eventsReceived: result.events_received,
  });

  return true;
};

// --------------------------------------------------
// CLAIM AND SEND META EVENT
// --------------------------------------------------

const attemptMetaPurchase = async (
  order: any,
  request: Request,
): Promise<string> => {
  const eventId = getPurchaseEventId(order);

  if (order.payment_status !== 'paid') {
    return eventId;
  }

  const now = new Date().toISOString();

  // Allow recovery if a previous invocation crashed
  // while holding the claim for more than 10 minutes.
  const staleTime = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  // Atomic claim: only one invocation can send this
  // order's server-side Purchase event at a time.
  const { data: claim, error: claimError } = await supabase
    .from('orders')
    .update({
      meta_purchase_claimed_at: now,
    })
    .eq('id', order.id)
    .eq('payment_status', 'paid')
    .or(
      `meta_purchase_claimed_at.is.null,meta_purchase_claimed_at.lt.${staleTime}`,
    )
    .select('id')
    .maybeSingle();

  if (claimError) {
    console.error('Meta Purchase claim failed:', claimError);
    return eventId;
  }

  if (!claim) {
    console.log(
      'Meta Purchase already sent or currently being processed:',
      eventId,
    );

    return eventId;
  }

  try {
    const sent = await sendMetaPurchase(order, request);

    if (!sent) {
      throw new Error('Meta Purchase event was not accepted.');
    }
  } catch (error) {
    console.error('Meta Purchase sending failed:', error);

    // Release the claim so a later payment-result
    // verification request can retry the event.
    const { error: releaseError } = await supabase
      .from('orders')
      .update({
        meta_purchase_claimed_at: null,
      })
      .eq('id', order.id)
      .eq('meta_purchase_claimed_at', now);

    if (releaseError) {
      console.error('Failed to release Meta Purchase claim:', releaseError);
    }
  }

  return eventId;
};

// --------------------------------------------------
// MAIN PAYMENT VERIFICATION
// --------------------------------------------------

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

    // Find order using merchant reference.
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

    // Already paid: do not verify or email again.
    // Retry Meta only if its previous attempt failed
    // and the claim has been released.
    if (order.payment_status === 'paid') {
      const eventId = await attemptMetaPurchase(order, request);

      return json({
        success: true,
        paid: true,
        orderNumber: order.order_number,
        eventId,
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

    // Verify directly with MarxPay.
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

    // Validate gateway status, references and amount.
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

      // Store response for troubleshooting.
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
      .select('*')
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    // Handle another simultaneous request winning
    // the payment-status update.
    let paidOrder = updatedOrder;

    if (!paidOrder) {
      const { data: latestOrder, error: latestError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', order.id)
        .maybeSingle();

      if (latestError) {
        throw latestError;
      }

      if (!latestOrder || latestOrder.payment_status !== 'paid') {
        throw new Error('Unable to confirm the final paid order status.');
      }

      paidOrder = latestOrder;
    }

    // Send Meta Purchase after successful payment.
    // Meta failure must never undo the payment.
    const eventId = await attemptMetaPurchase(paidOrder, request);

    // Send Web3Forms email only for the request
    // that successfully changed the order to paid.
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
      eventId,
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
