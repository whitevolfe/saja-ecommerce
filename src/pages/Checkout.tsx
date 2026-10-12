import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Banknote } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { invokeFunction } from '@/lib/supabase';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalAmount, clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  const shippingCost = 400;
  const subtotal = getTotalAmount();
  const total = subtotal + shippingCost;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    deliveryNote: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast({ title: 'Cart is empty', description: 'Please add products first.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await invokeFunction<{
        success: boolean;
        orderNumber: string;
        payUrl?: string;
        message?: string;
      }>('create-order', {
        paymentMethod,
        customer: formData,
        items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
        shippingCost,
      });

      if (!result.success) {
        throw new Error(result.message || 'Unable to create your order.');
      }

      if (paymentMethod === 'online' && result.payUrl) {
        // MarxPay handles card entry and 3DS. The customer returns to /payment-result afterwards.
        window.location.assign(result.payUrl);
        return;
      }

      clearCart();
      toast({
        title: 'Order placed successfully',
        description: `Your order ${result.orderNumber} has been received.`,
      });
      navigate('/products');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      toast({ title: 'Order failed', description: message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center text-center px-4'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-4'>Your cart is empty</h1>
          <Button asChild>
            <Link to='/products'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-10 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <Button variant='ghost' onClick={() => navigate(-1)} className='mb-6 text-white gap-2'>
          <ArrowLeft className='w-4 h-4' />
          Back
        </Button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <form onSubmit={onSubmit} className='space-y-6'>
              <div className='bg-white text-black border border-gray-200 rounded-xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Contact</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  <Input
                    required
                    type='email'
                    placeholder='Email address *'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='text-black'
                  />
                  <Input
                    required
                    type='tel'
                    placeholder='Phone number *'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className='text-black'
                  />
                </div>
              </div>

              <div className='bg-white text-black border border-gray-200 rounded-xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Delivery</h2>

                <div className='grid md:grid-cols-2 gap-4'>
                  <Input required placeholder='First name *' value={formData.firstName} className='text-black' onChange={(e) => handleInputChange('firstName', e.target.value)} />
                  <Input required placeholder='Last name *' value={formData.lastName} className='text-black' onChange={(e) => handleInputChange('lastName', e.target.value)} />
                </div>

                <Input required className='mt-4 text-black' placeholder='Delivery address *' value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />

                <div className='grid md:grid-cols-3 gap-4 mt-4'>
                  <Input required placeholder='City *' value={formData.city} className='text-black' onChange={(e) => handleInputChange('city', e.target.value)} />
                  <Input placeholder='Province' value={formData.province} className='text-black' onChange={(e) => handleInputChange('province', e.target.value)} />
                  <Input placeholder='Postal code' value={formData.postalCode} className='text-black' onChange={(e) => handleInputChange('postalCode', e.target.value)} />
                </div>

                <textarea
                  value={formData.deliveryNote}
                  onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                  placeholder='Delivery note (optional)'
                  className='mt-4 w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-ring'
                />
              </div>

              <div className='bg-white text-black border border-gray-200 rounded-xl p-6'>
                <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                  <Truck className='w-5 h-5 text-primary' />
                  Shipping Method
                </h2>
                <div className='p-4 rounded-lg border border-gray-300 bg-gray-50 flex justify-between'>
                  <span>Standard Delivery</span>
                  <strong>Rs. {shippingCost.toLocaleString()}</strong>
                </div>
              </div>

              <div className='bg-white text-black border border-gray-200 rounded-xl p-6'>
                <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                  <CreditCard className='w-5 h-5 text-primary' />
                  Payment
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'cod' | 'online')}>
                  <label className='flex items-start gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50'>
                    <RadioGroupItem value='cod' className='mt-1' />
                    <span>
                      <span className='font-medium flex items-center gap-2'><Banknote className='w-4 h-4' /> Cash on Delivery</span>
                      <span className='text-sm text-gray-500 block mt-1'>Pay when your order is delivered.</span>
                    </span>
                  </label>

                  <label className='flex items-start gap-3 rounded-lg border border-gray-200 p-4 mt-3 cursor-pointer hover:bg-gray-50'>
                    <RadioGroupItem value='online' className='mt-1' />
                    <span>
                      <span className='font-medium'>Pay Online by Card</span>
                      <span className='text-sm text-gray-500 block mt-1'>Secure payment through MarxPay. Visa, Mastercard, UnionPay and supported cards.</span>
                    </span>
                  </label>
                </RadioGroup>
              </div>

              <Button type='submit' className='w-full text-white' disabled={isSubmitting} size='lg'>
                {isSubmitting ? 'Processing...' : paymentMethod === 'online' ? `Pay Rs. ${total.toLocaleString()}` : 'Place Order'}
              </Button>

              {paymentMethod === 'online' && (
                <p className='text-center text-white/80 text-sm'>You will be redirected to MarxPay's secure payment page.</p>
              )}
            </form>
          </div>

          <div className='bg-white text-black border border-gray-200 rounded-xl p-6 sticky top-6 h-fit'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            <div className='space-y-4'>
              {cart.map((item) => (
                <div key={item.id} className='flex items-center gap-3'>
                  <img src={item.image} alt={item.name} className='w-14 h-14 object-cover rounded-lg border' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{item.name}</p>
                    <p className='text-xs text-gray-600'>Qty: {item.quantity}</p>
                  </div>
                  <p className='text-sm font-semibold'>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <hr className='border-gray-200 my-4' />
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
              <div className='flex justify-between'><span>Delivery</span><span>Rs. {shippingCost.toLocaleString()}</span></div>
            </div>
            <hr className='border-gray-200 my-4' />
            <div className='flex justify-between font-bold text-lg'>
              <span>Total</span>
              <span className='text-primary'>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
