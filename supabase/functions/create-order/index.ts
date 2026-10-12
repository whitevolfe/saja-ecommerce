
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
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const clean = (value: unknown, max = 500) =>
  String(value ?? '')
    .trim()
    .slice(0, max);

const sendWeb3Forms = async (
  subject: string,
  message: string,
  email?: string,
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

  if (email) {
    body.append('email', email);
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result?.success) {
    throw new Error(
      result?.message || 'Web3Forms email notification failed.',
    );
  }
};

const formatOrderMessage = (order: any) => {
  const itemLines = (order.items || [])
    .map(
      (item: any) =>
        `• ${item.name}\n  Qty: ${item.quantity}\n  Unit Price: Rs. ${Number(item.unitPrice).toLocaleString()}\n  Line Total: Rs. ${Number(item.lineTotal).toLocaleString()}`,
    )
    .join('\n\n');

  return `NEW ORDER

Order Number: ${order.order_number}
Payment: ${
    order.payment_method === 'online'
      ? 'ONLINE CARD PAYMENT'
      : 'CASH ON DELIVERY'
  }
Payment Status: ${order.payment_status}

${itemLines}

Subtotal: Rs. ${Number(order.subtotal).toLocaleString()}
Delivery: Rs. ${Number(order.delivery_fee).toLocaleString()}
Total: Rs. ${Number(order.total_amount).toLocaleString()}

Customer:
${order.customer_name}
Phone: ${order.customer_phone}
Email: ${order.customer_email}

Delivery Address:
${order.address}
${order.city}${order.province ? `, ${order.province}` : ''}${
    order.postal_code ? ` ${order.postal_code}` : ''
  }${order.delivery_note ? `\n\nDelivery Note: ${order.delivery_note}` : ''}`;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  try {
    const body = await request.json();

    const paymentMethod =
      body?.paymentMethod === 'online' ? 'online' : 'cod';

    const customer = body?.customer || {};
    const rawItems = Array.isArray(body?.items) ? body.items : [];
    const shippingCost = Number(body?.shippingCost ?? 400);

    if (!rawItems.length || rawItems.length > 30) {
      return json({ error: 'Your cart is empty or too large.' }, 400);
    }

    if (
      !Number.isFinite(shippingCost) ||
      shippingCost < 0 ||
      shippingCost > 10000
    ) {
      return json({ error: 'Invalid delivery fee.' }, 400);
    }

    const firstName = clean(customer.firstName, 80);
    const lastName = clean(customer.lastName, 80);
    const email = clean(customer.email, 160).toLowerCase();
    const phone = clean(customer.phone, 40);
    const address = clean(customer.address, 500);
    const city = clean(customer.city, 100);
    const province = clean(customer.province, 100);
    const postalCode = clean(customer.postalCode, 30);
    const deliveryNote = clean(customer.deliveryNote, 500);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city
    ) {
      return json(
        {
          error:
            'Please complete all required customer and delivery fields.',
        },
        400,
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json(
        { error: 'Please enter a valid email address.' },
        400,
      );
    }

    const normalizedItems = rawItems.map((item: any) => ({
      id: clean(item?.id, 100),
      quantity: Math.floor(Number(item?.quantity)),
    }));

    if (
      normalizedItems.some(
        (item: any) =>
          !item.id ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 99,
      )
    ) {
      return json({ error: 'Invalid cart quantity.' }, 400);
    }

    const ids = [
      ...new Set(normalizedItems.map((item: any) => item.id)),
    ];

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id,name,price,active')
      .in('id', ids)
      .eq('active', true);

    if (productsError) {
      throw productsError;
    }

    if (!products || products.length !== ids.length) {
      return json(
        { error: 'One or more products are unavailable.' },
        400,
      );
    }

    const productMap = new Map(
      products.map((product: any) => [product.id, product]),
    );

    const orderItems = normalizedItems.map((item: any) => {
      const product: any = productMap.get(item.id);
      const unitPrice = Number(product.price);

      return {
        id: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      };
    });

    const subtotal = orderItems.reduce(
      (sum: number, item: any) => sum + item.lineTotal,
      0,
    );

    const total = subtotal + shippingCost;

    const orderNumber = `SAJ-${Date.now()}-${crypto
      .randomUUID()
      .slice(0, 6)
      .toUpperCase()}`;

    const merchantRID = `SAJ-${crypto.randomUUID()}`;
    const customerName = `${firstName} ${lastName}`;

    const initialStatus =
      paymentMethod === 'cod' ? 'cod_pending' : 'pending';

    const { data: insertedOrder, error: insertError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_phone: phone,
        customer_email: email,
        address,
        city,
        province,
        postal_code: postalCode,
        delivery_note: deliveryNote,
        items: orderItems,
        subtotal,
        delivery_fee: shippingCost,
        total_amount: total,
        payment_method: paymentMethod,
        payment_status: initialStatus,
        marx_merchant_rid: merchantRID,
      })
      .select('*')
      .single();

    if (insertError) {
      throw insertError;
    }

    // Cash on delivery order
    if (paymentMethod === 'cod') {
      try {
        await sendWeb3Forms(
          `New COD Order - ${orderNumber}`,
          formatOrderMessage(insertedOrder),
          email,
        );

        await supabase
          .from('orders')
          .update({ email_sent_at: new Date().toISOString() })
          .eq('id', insertedOrder.id);
      } catch (emailError) {
        console.error('COD email notification failed:', emailError);
      }

      return json({
        success: true,
        orderNumber,
        message: 'Order placed successfully.',
      });
    }

    // MarxPay configuration
    const marxApiKey = Deno.env.get('MARX_API_KEY');

    const marxBaseUrl = (
      Deno.env.get('MARX_BASE_URL') ||
      'https://payment.api.dev.marxpos.com/api/v4/ipg/orders'
    ).replace(/\/$/, '');

    const siteUrl = (
      Deno.env.get('PUBLIC_SITE_URL') || ''
    ).replace(/\/$/, '');

    if (!marxApiKey || !siteUrl) {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('id', insertedOrder.id);

      return json(
        { error: 'Online payment is not configured yet.' },
        500,
      );
    }

    // Normalize Sri Lankan mobile number
    const mobileInput = phone.replace(/[\s()-]/g, '');
    let customerMobile: string;

    if (/^07\d{8}$/.test(mobileInput)) {
      customerMobile = `+94${mobileInput.slice(1)}`;
    } else if (/^\+947\d{8}$/.test(mobileInput)) {
      customerMobile = mobileInput;
    } else if (/^947\d{8}$/.test(mobileInput)) {
      customerMobile = `+${mobileInput}`;
    } else if (/^7\d{8}$/.test(mobileInput)) {
      customerMobile = `+94${mobileInput}`;
    } else {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('id', insertedOrder.id);

      return json(
        {
          error: 'Please enter a valid Sri Lankan mobile number.',
        },
        400,
      );
    }

    const marxPayload = {
      merchantRID,
      amount: total,
      validTimeLimit: 2,
      returnUrl: `${siteUrl}/payment-result`,
      customerMail: email,
      customerMobile,
      orderSummary: `SAJ Associates Order ${orderNumber}`.slice(
        0,
        250,
      ),
      customerReference: orderNumber,
      paymentMethod: 'OTHER',
    };

    const marxResponse = await fetch(marxBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'merchant-api-key': marxApiKey,
      },
      body: JSON.stringify(marxPayload),
    });

    const marxResult = await marxResponse.json().catch(() => ({}));

    if (
      !marxResponse.ok ||
      marxResult?.status !== 0 ||
      !marxResult?.data?.payUrl ||
      !marxResult?.data?.trId
    ) {
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          marx_response: marxResult,
        })
        .eq('id', insertedOrder.id);

      console.error('Marx create order failed:', {
        httpStatus: marxResponse.status,
        response: marxResult,
      });

      return json(
        {
          error:
            marxResult?.message ||
            'Unable to start the secure payment.',
        },
        502,
      );
    }

    // IMPORTANT:
    // MarxPay returns trId as a UUID string, not a number.
    // Do not convert it with Number() or validate it as an integer.
    const marxTrId = String(marxResult.data.trId).trim();

    const returnedRID = String(
      marxResult.data.merchantRID || '',
    ).trim();

    if (!marxTrId || returnedRID !== merchantRID) {
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          marx_response: marxResult,
        })
        .eq('id', insertedOrder.id);

      console.error('Invalid MarxPay transaction reference:', {
        hasTransactionId: Boolean(marxTrId),
        merchantRIDMatches: returnedRID === merchantRID,
      });

      return json(
        {
          error:
            'The payment gateway returned an invalid transaction reference.',
        },
        502,
      );
    }

    // Save the UUID transaction ID as a string.
    // The marx_transaction_id database column must support text/UUID values.
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        marx_transaction_id: marxTrId,
        marx_response: marxResult,
      })
      .eq('id', insertedOrder.id);

    if (updateError) {
      console.error(
        'Failed to save MarxPay transaction details:',
        updateError,
      );

      return json(
        {
          error:
            'The payment was initialized, but we could not save its transaction details. Please contact support before retrying.',
        },
        500,
      );
    }

    return json({
      success: true,
      orderNumber,
      payUrl: marxResult.data.payUrl,
    });
  } catch (error) {
    console.error('Create order error:', error);

    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to create order.',
      },
      500,
    );
  }
});
