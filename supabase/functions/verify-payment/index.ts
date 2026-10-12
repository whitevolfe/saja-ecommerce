import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const sendWeb3Forms = async (subject: string, message: string, email: string) => {
  const accessKey = Deno.env.get('WEB3FORMS_ACCESS_KEY');
  if (!accessKey) throw new Error('WEB3FORMS_ACCESS_KEY is not configured.');

  const body = new FormData();
  body.append('access_key', accessKey);
  body.append('subject', subject);
  body.append('from_name', 'SAJ Associates Website');
  body.append('message', message);
  body.append('email', email);

  const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result?.success) throw new Error(result?.message || 'Email notification failed.');
};

const formatOrderMessage = (order: any) => {
  const itemLines = (order.items || []).map((item: any) =>
    `• ${item.name}\n  Qty: ${item.quantity}\n  Unit Price: Rs. ${Number(item.unitPrice).toLocaleString()}\n  Line Total: Rs. ${Number(item.lineTotal).toLocaleString()}`,
  ).join('\n\n');

  return `NEW PAID ONLINE ORDER\n\nOrder Number: ${order.order_number}\nPayment: ONLINE CARD PAYMENT\nPayment Status: PAID\nMarx Transaction ID: ${order.marx_transaction_id}\n\n${itemLines}\n\nSubtotal: Rs. ${Number(order.subtotal).toLocaleString()}\nDelivery: Rs. ${Number(order.delivery_fee).toLocaleString()}\nTotal Paid: Rs. ${Number(order.total_amount).toLocaleString()}\n\nCustomer:\n${order.customer_name}\nPhone: ${order.customer_phone}\nEmail: ${order.customer_email}\n\nDelivery Address:\n${order.address}\n${order.city}${order.province ? `, ${order.province}` : ''}${order.postal_code ? ` ${order.postal_code}` : ''}\n${order.delivery_note ? `\nDelivery Note: ${order.delivery_note}` : ''}`;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  try {
    const body = await request.json();
    const trId = Number(body?.trId);
    const merchantRID = String(body?.merchantRID || '').trim();

    if (!Number.isInteger(trId) || !merchantRID) return json({ error: 'Invalid payment references.' }, 400);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('marx_merchant_rid', merchantRID)
      .maybeSingle();

    if (orderError) throw orderError;
    if (!order) return json({ error: 'Payment order could not be found.' }, 404);
    if (Number(order.marx_transaction_id) !== trId) {
      return json({ error: 'Payment transaction reference does not match the stored order.' }, 400);
    }

    if (order.payment_status === 'paid') {
      return json({ success: true, paid: true, orderNumber: order.order_number, message: 'Payment already verified.' });
    }

    const marxApiKey = Deno.env.get('MARX_API_KEY');
    const marxBaseUrl = (Deno.env.get('MARX_BASE_URL') || 'https://payment.api.dev.marxpos.com/api/v4/ipg/orders').replace(/\/$/, '');
    if (!marxApiKey) return json({ error: 'Payment gateway is not configured.' }, 500);

    // Marx requires the returned trId/merchantRID to be checked against stored values before initiating payment.
    const marxResponse = await fetch(`${marxBaseUrl}/${trId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'merchant-api-key': marxApiKey,
      },
      body: JSON.stringify({ merchantRID }),
    });

    const marxResult = await marxResponse.json().catch(() => ({}));
    const data = marxResult?.data;
    const gatewayCode = data?.gatewayResponse?.response?.gatewayCode || '';
    const summaryResult = data?.summaryResult || '';
    const capturedAmount = Number(data?.gatewayResponse?.order?.totalCapturedAmount ?? data?.gatewayResponse?.order?.amount ?? NaN);
    const responseTrId = Number(data?.trId);
    const responseRID = String(data?.merchantRID || '');

    const approvedGatewayCodes = new Set(['APPROVED', 'APPROVED_AUTO', 'APPROVED_PENDING_SETTLEMENT']);
    const paid = marxResponse.ok && marxResult?.status === 0 && summaryResult === 'SUCCESS' && approvedGatewayCodes.has(gatewayCode) && responseTrId === trId && responseRID === merchantRID && capturedAmount === Number(order.total_amount);

    await supabase.from('orders').update({
      marx_gateway_code: gatewayCode || null,
      marx_response: marxResult,
      updated_at: new Date().toISOString(),
      payment_status: paid ? 'paid' : 'failed',
    }).eq('id', order.id);

    if (!paid) {
      return json({
        success: false,
        paid: false,
        orderNumber: order.order_number,
        message: gatewayCode ? `Payment was not approved (${gatewayCode}).` : 'Payment was not completed.',
      });
    }

    // Prevent duplicate notifications if the customer refreshes the return page.
    if (!order.email_sent_at) {
      try {
        await sendWeb3Forms(`PAID Online Order - ${order.order_number}`, formatOrderMessage({ ...order, payment_status: 'paid', marx_transaction_id: trId }), order.customer_email);
        await supabase.from('orders').update({ email_sent_at: new Date().toISOString() }).eq('id', order.id).is('email_sent_at', null);
      } catch (emailError) {
        console.error('Paid order email notification failed:', emailError);
      }
    }

    return json({ success: true, paid: true, orderNumber: order.order_number, message: 'Payment verified successfully.' });
  } catch (error) {
    console.error(error);
    return json({ error: error instanceof Error ? error.message : 'Unable to verify payment.' }, 500);
  }
});
