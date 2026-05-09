import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Phone, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalAmount, clearCart } = useCart();

  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    emailNews: true,
    country: 'Sri Lanka',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    saveInfo: false,
    shippingMethod: 'standard',
    paymentMethod: 'bank_deposit',
    billingSameAsShipping: true,
  });

  const shippingCost = 400;
  const subtotal = getTotalAmount();
  const total = subtotal + shippingCost;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');

    try {
      const orderDetails = cart
        .map(
          (item) =>
            `• ${item.name}\nQty: ${item.quantity}\nPrice: Rs. ${(item.price * item.quantity).toLocaleString()}`,
        )
        .join('\n\n');

      const message = `
NEW ORDER

${orderDetails}

Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: Rs. ${shippingCost.toLocaleString()}
Total: Rs. ${total.toLocaleString()}

Customer:
${formData.firstName} ${formData.lastName}
${formData.phone}
${formData.address}, ${formData.city}
`;

      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'YOUR_KEY');
      formDataToSend.append('subject', 'New Order');
      formDataToSend.append('message', message);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        setResult('Order placed successfully!');
        toast({
          title: 'Success',
          description: 'Your order has been submitted.',
        });

        setTimeout(() => {
          clearCart();
          navigate('/products');
        }, 1500);
      } else {
        setResult('Failed to submit order');
      }
    } catch (err) {
      setResult('Error submitting order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center text-center px-4'>
        <div>
          <h1 className='text-3xl font-bold text-card-foreground mb-4'>
            Your cart is empty
          </h1>
          <Button asChild>
            <Link to='/products'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background text-foreground py-10 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* BACK */}
        <Button
          variant='ghost'
          onClick={() => navigate(-1)}
          className='mb-6 text-card-foreground gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </Button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* LEFT FORM */}
          <div className='lg:col-span-2 space-y-6'>
            <form onSubmit={onSubmit} className='space-y-6'>
              {/* CONTACT */}
              <div className='bg-card border border-border rounded-xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Contact</h2>
                <Input
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {/* DELIVERY */}
              <div className='bg-card border border-border rounded-xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Delivery</h2>

                <div className='grid md:grid-cols-2 gap-4'>
                  <Input placeholder='First name' />
                  <Input placeholder='Last name' />
                </div>

                <Input className='mt-4' placeholder='Address' />
                <Input className='mt-4' placeholder='City' />
              </div>

              {/* SHIPPING */}
              <div className='bg-card border border-border rounded-xl p-6'>
                <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                  <Truck className='w-5 h-5 text-primary' />
                  Shipping Method
                </h2>

                <div className='p-4 rounded-lg border border-primary/40 bg-primary/10'>
                  Standard Delivery - Rs 400
                </div>
              </div>

              {/* PAYMENT */}
              <div className='bg-card border border-border rounded-xl p-6'>
                <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                  <CreditCard className='w-5 h-5 text-primary' />
                  Payment
                </h2>

                <RadioGroup defaultValue='cod'>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='cod' />
                    Cash on Delivery
                  </div>

                  <div className='flex items-center gap-2 mt-2'>
                    <RadioGroupItem value='bank' />
                    Bank Deposit
                  </div>
                </RadioGroup>
              </div>

              {/* BUTTON */}
              <Button
                type='submit'
                className='w-full bg-primary text-white'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>

              {result && (
                <p className='text-center text-primary mt-2'>{result}</p>
              )}
            </form>
          </div>

          {/* RIGHT SUMMARY */}
          <div className='bg-card border border-border rounded-xl p-6 sticky top-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            <div className='space-y-4'>
              {cart.map((item) => (
                <div key={item.id} className='flex items-center gap-3'>
                  {/* ✅ IMAGE FIXED */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-14 h-14 object-cover rounded-lg border border-border'
                  />

                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{item.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className='text-sm font-semibold text-primary'>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <hr className='border-border my-4' />

            <div className='flex justify-between font-bold'>
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
