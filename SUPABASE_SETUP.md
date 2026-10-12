# SAJ Associates - Supabase + MarxPay setup

The website checkout has been changed to remove WhatsApp ordering and support:
- Cash on Delivery
- Online card payment through MarxPay
- Server-side MarxPay verification
- Supabase order storage
- Web3Forms order email notifications

## 1. Frontend environment

Create a local `.env` file from `.env.example`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Never put the Marx API key or Supabase service-role key in this file.

## 2. Run the SQL migration

Open Supabase Dashboard → SQL Editor and run:

`supabase/migrations/001_orders_and_products.sql`

This creates:
- `products`
- `orders`
- indexes
- RLS protection
- the current website product prices

The Edge Functions use the Supabase service role and therefore can read/write these tables without exposing database credentials to the browser.

## 3. Deploy the Edge Functions

Install/login to the Supabase CLI, link this project with your real Supabase project ref, then deploy:

```bash
supabase functions deploy create-order --no-verify-jwt
supabase functions deploy verify-payment --no-verify-jwt
```

## 4. Add Edge Function secrets

Set these in Supabase Dashboard → Edge Functions → Secrets, or with the CLI:

```text
MARX_API_KEY=YOUR_ROTATED_MARX_API_KEY
MARX_BASE_URL=https://payment.api.dev.marxpos.com/api/v4/ipg/orders
PUBLIC_SITE_URL=https://YOUR-LIVE-DOMAIN.com
WEB3FORMS_ACCESS_KEY=YOUR_WEB3FORMS_ACCESS_KEY
```

For production MarxPay, change `MARX_BASE_URL` to:

```text
https://payment.v4.api.marx.lk/api/v4/ipg/orders
```

Do not paste your real secrets into the source code.

## 5. MarxPay flow used by this project

1. `create-order` validates the cart against the server-side `products` table.
2. It creates a pending order in Supabase.
3. For online payment it creates the MarxPay order with `paymentMethod: OTHER` (LKR Visa/Mastercard/UnionPay).
4. The browser is redirected to MarxPay's `payUrl`.
5. MarxPay redirects to `/payment-result?trId=...&merchantRID=...`.
6. `verify-payment` checks those values against the stored order.
7. It calls MarxPay's Initiate Payment API.
8. It checks `summaryResult`, gateway approval, transaction ID, merchant RID and the captured amount.
9. Only then is the Supabase order marked `paid` and the Web3Forms notification sent.

## 6. Testing

Use Marx's sandbox base URL first. Use the sandbox test cards supplied by Marx. The production key and production base URL should only be enabled after sandbox testing succeeds.

## Important

The delivery address is stored in Supabase and included in the Web3Forms order email. It is not sent as a dedicated Marx order field because the Marx v4 create-order API does not provide a delivery-address parameter.
