import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { invokeFunction } from '@/lib/supabase';

type ResultState = 'loading' | 'success' | 'failed';
type MetaPixel = (...args: any[]) => void;

declare global {
  interface Window {
    fbq?: MetaPixel;
  }
}

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [state, setState] = useState<ResultState>('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    let cancelled = false;

    const trackPurchase = (eventId: string, value: number, orderId: string) => {
      if (!eventId || !Number.isFinite(value) || value <= 0) return;
      if (typeof window.fbq !== 'function') {
        console.warn('Meta Pixel is not available. Purchase event skipped.');
        return;
      }

      const storageKey = `meta_purchase_${eventId}`;
      try {
        if (sessionStorage.getItem(storageKey)) {
          console.log('Meta Purchase already tracked:', eventId);
          return;
        }

        window.fbq(
          'track',
          'Purchase',
          {
            value,
            currency: 'LKR',
            order_id: orderId,
          },
          { eventID: eventId },
        );
        sessionStorage.setItem(storageKey, '1');
        console.log('[Meta] MarxPay Purchase:', {
          eventId,
          orderId,
          value,
          currency: 'LKR',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Unable to track MarxPay browser Purchase:', error);
      }
    };

    const verify = async () => {
      const trId = searchParams.get('trId');
      const merchantRID = searchParams.get('merchantRID');

      if (!trId || !merchantRID) {
        if (cancelled) return;
        setState('failed');
        setMessage(
          'The payment return information is incomplete. Please contact us if your card was charged.',
        );
        return;
      }

      try {
        const result = await invokeFunction<{
          success: boolean;
          paid: boolean;
          orderNumber?: string;
          orderId?: string;
          value?: number;
          eventId?: string;
          message?: string;
        }>('verify-payment', { trId, merchantRID });

        if (cancelled) return;

        if (result.success && result.paid) {
          setState('success');
          setOrderNumber(result.orderNumber || '');
          setMessage(
            'Your payment was successfully verified and your order has been confirmed.',
          );

          if (result.eventId) {
            trackPurchase(
              result.eventId,
              Number(result.value),
              String(result.orderId || result.orderNumber || ''),
            );
          } else {
            console.warn('Purchase event ID was not returned by Supabase.');
          }

          clearCart();
        } else {
          setState('failed');
          setMessage(
            result.message ||
              'The payment was not completed. You can return to checkout and try again.',
          );
        }
      } catch (error) {
        if (cancelled) return;
        setState('failed');
        setMessage(
          error instanceof Error
            ? error.message
            : 'We could not verify the payment.',
        );
      }
    };

    void verify();
    return () => {
      cancelled = true;
    };
  }, [searchParams, clearCart]);

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4 py-16'>
      <div className='bg-white text-black rounded-2xl border border-gray-200 shadow-lg p-8 max-w-lg w-full text-center'>
        {state === 'loading' && (
          <Loader2 className='w-14 h-14 mx-auto mb-5 text-primary animate-spin' />
        )}
        {state === 'success' && (
          <CheckCircle2 className='w-16 h-16 mx-auto mb-5 text-green-600' />
        )}
        {state === 'failed' && (
          <XCircle className='w-16 h-16 mx-auto mb-5 text-red-600' />
        )}
        <h1 className='text-2xl font-bold mb-3'>
          {state === 'loading'
            ? 'Verifying Payment'
            : state === 'success'
              ? 'Payment Successful'
              : 'Payment Not Completed'}
        </h1>
        <p className='text-gray-600 mb-5'>{message}</p>
        {orderNumber && (
          <p className='font-semibold mb-6'>Order: {orderNumber}</p>
        )}
        {state === 'success' ? (
          <Button asChild className='text-white'>
            <Link to='/products'>Continue Shopping</Link>
          </Button>
        ) : state === 'failed' ? (
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button asChild variant='outline'>
              <Link to='/checkout'>Return to Checkout</Link>
            </Button>
            <Button asChild className='text-white'>
              <Link to='/products'>Browse Products</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentResult;
