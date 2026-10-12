import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { invokeFunction } from '@/lib/supabase';

type ResultState = 'loading' | 'success' | 'failed';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [state, setState] = useState<ResultState>('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const verify = async () => {
      const trId = searchParams.get('trId');
      const merchantRID = searchParams.get('merchantRID');

      if (!trId || !merchantRID) {
        setState('failed');
        setMessage('The payment return information is incomplete. Please contact us if your card was charged.');
        return;
      }

      try {
        const result = await invokeFunction<{
          success: boolean;
          paid: boolean;
          orderNumber?: string;
          message?: string;
        }>('verify-payment', { trId, merchantRID });

        if (result.success && result.paid) {
          setState('success');
          setOrderNumber(result.orderNumber || '');
          setMessage('Your payment was successfully verified and your order has been confirmed.');
          clearCart();
        } else {
          setState('failed');
          setMessage(result.message || 'The payment was not completed. You can return to checkout and try again.');
        }
      } catch (error) {
        setState('failed');
        setMessage(error instanceof Error ? error.message : 'We could not verify the payment.');
      }
    };

    void verify();
  }, [searchParams, clearCart]);

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4 py-16'>
      <div className='bg-white text-black rounded-2xl border border-gray-200 shadow-lg p-8 max-w-lg w-full text-center'>
        {state === 'loading' && <Loader2 className='w-14 h-14 mx-auto mb-5 text-primary animate-spin' />}
        {state === 'success' && <CheckCircle2 className='w-16 h-16 mx-auto mb-5 text-green-600' />}
        {state === 'failed' && <XCircle className='w-16 h-16 mx-auto mb-5 text-red-600' />}

        <h1 className='text-2xl font-bold mb-3'>
          {state === 'loading' ? 'Verifying Payment' : state === 'success' ? 'Payment Successful' : 'Payment Not Completed'}
        </h1>

        <p className='text-gray-600 mb-5'>{message}</p>
        {orderNumber && <p className='font-semibold mb-6'>Order: {orderNumber}</p>}

        {state === 'success' ? (
          <Button asChild className='text-white'><Link to='/products'>Continue Shopping</Link></Button>
        ) : state === 'failed' ? (
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button asChild variant='outline'><Link to='/checkout'>Return to Checkout</Link></Button>
            <Button asChild className='text-white'><Link to='/products'>Browse Products</Link></Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentResult;
