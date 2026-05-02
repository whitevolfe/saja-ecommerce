import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Check,
} from 'lucide-react';
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

  // Form state
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
    billingCountry: 'Sri Lanka',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingPostalCode: '',
    billingPhone: '',
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
            `• ${item.name}\n  Qty: ${item.quantity}\n  Price: Rs. ${(item.price * item.quantity).toLocaleString()}`,
        )
        .join('\n\n');

      const orderMessage = `🛍️ **NEW ORDER FROM SAJ ASSOCIATES HERBAL PRODUCTS SHOPPING**

**Order Details:**
${orderDetails}

**Order Summary:**
Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: Rs. ${shippingCost.toLocaleString()}
Total: Rs. ${total.toLocaleString()}

**Customer Information:**
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}
City: ${formData.city}${formData.postalCode ? ', ' + formData.postalCode : ''}
Country: ${formData.country}

**Shipping Method:** ${formData.shippingMethod === 'standard' ? 'Standard (Rs 400)' : 'Express'}
**Payment Method:** ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'}

${
  formData.paymentMethod === 'bank_deposit'
    ? `
**Bank Details for Payment:**
Account No: 8116023528
Name: SAJ Associates (Pvt) Ltd 
Bank: Commercial Bank
Branch: raid evenue
WhatsApp No: +94 777 383 471
`
    : ''
}

${
  formData.billingSameAsShipping
    ? ''
    : `
**Billing Address:**
Name: ${formData.billingFirstName} ${formData.billingLastName}
Address: ${formData.billingAddress}${formData.billingApartment ? ', ' + formData.billingApartment : ''}
City: ${formData.billingCity}${formData.billingPostalCode ? ', ' + formData.billingPostalCode : ''}
Country: ${formData.billingCountry}
Phone: ${formData.billingPhone}
`
}

Please confirm this order and provide delivery timeline.`;

      const formDataToSend = new FormData();
      formDataToSend.append(
        'access_key',
        'df9f6835-bc61-4250-9c91-7778e3e71352',
      );
      formDataToSend.append(
        'subject',
        `New Order - ${formData.firstName} ${formData.lastName}`,
      );
      formDataToSend.append(
        'from_name',
        'SAJ Associates (Pvt) Ltd Herbal Products Shopping Website',
      );
      formDataToSend.append('message', orderMessage);
      formDataToSend.append('customer_email', formData.email);
      formDataToSend.append(
        'customer_name',
        `${formData.firstName} ${formData.lastName}`,
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Order Submitted Successfully!');
        toast({
          title: 'Order Placed!',
          description:
            'Your order has been submitted successfully. We will contact you shortly.',
        });

        // Clear cart after successful submission
        setTimeout(() => {
          clearCart();
          navigate('/products');
        }, 2000);
      } else {
        setResult('Error submitting order. Please try again.');
        toast({
          title: 'Submission Error',
          description:
            'There was an error submitting your order. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setResult('Error submitting order. Please try again.');
      toast({
        title: 'Submission Error',
        description:
          'There was an error submitting your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className='min-h-screen py-16 px-4'>
        <div className='container mx-auto max-w-2xl text-center'>
          <h1 className='text-3xl font-bold mb-4'>No items in cart</h1>
          <p className='text-muted-foreground mb-8'>
            Please add items to your cart before proceeding to checkout.
          </p>
          <Button asChild size='lg'>
            <Link to='/products'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-8 px-4 bg-gray-50'>
      <div className='container mx-auto max-w-6xl'>
        {/* Back Button */}
        <Button
          variant='ghost'
          onClick={() => navigate(-1)}
          className='mb-6 gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Cart
        </Button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2 space-y-8'>
            <form onSubmit={onSubmit} className='space-y-8'>
              {/* Contact Information */}
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold'>Contact</h2>
                  <Link
                    to='/contact'
                    className='text-sm text-primary hover:underline'
                  >
                    Sign in
                  </Link>
                </div>

                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='emailNews'
                      checked={formData.emailNews}
                      onCheckedChange={(checked) =>
                        handleInputChange('emailNews', checked as boolean)
                      }
                    />
                    <Label htmlFor='emailNews' className='text-sm'>
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h2 className='text-xl font-semibold mb-6'>Delivery</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Label htmlFor='country'>Country/Region</Label>
                    <select
                      id='country'
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange('country', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    >
                      <option value='Sri Lanka'>Sri Lanka</option>
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Label htmlFor='firstName'>First name</Label>
                    <Input
                      id='firstName'
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='lastName'>Last name</Label>
                    <Input
                      id='lastName'
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className='space-y-4 mb-4'>
                  <div>
                    <Label htmlFor='address'>Address</Label>
                    <Input
                      id='address'
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='apartment'>
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input
                      id='apartment'
                      value={formData.apartment}
                      onChange={(e) =>
                        handleInputChange('apartment', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='postalCode'>Postal code (optional)</Label>
                    <Input
                      id='postalCode'
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange('postalCode', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='mb-4'>
                  <Label htmlFor='phone' className='flex items-center gap-2'>
                    Phone
                    <Phone className='w-4 h-4' />
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='saveInfo'
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      handleInputChange('saveInfo', checked as boolean)
                    }
                  />
                  <Label htmlFor='saveInfo' className='text-sm'>
                    Save this information for next time
                  </Label>
                </div>
              </div>

              {/* Shipping Method */}
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                  <Truck className='w-5 h-5' />
                  Shipping method
                </h2>

                <RadioGroup
                  value={formData.shippingMethod}
                  onValueChange={(value) =>
                    handleInputChange('shippingMethod', value)
                  }
                >
                  <div className='flex items-center space-x-2 p-4 border border-green-500 rounded-lg bg-green-50'>
                    <RadioGroupItem value='standard' id='standard' />
                    <div className='flex-1'>
                      <Label
                        htmlFor='standard'
                        className='flex items-center justify-between'
                      >
                        <span>Standard</span>
                        <span className='font-semibold'>Rs 400.00</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Information */}
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h2 className='text-xl font-semibold mb-2 flex items-center gap-2'>
                  <CreditCard className='w-5 h-5' />
                  Payment
                </h2>
                <p className='text-sm text-muted-foreground mb-6'>
                  All transactions are secure and encrypted.
                </p>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    handleInputChange('paymentMethod', value)
                  }
                  className='space-y-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='cod' id='cod' />
                    <Label htmlFor='cod'>Cash on Delivery (COD)</Label>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2 p-4 border border-green-500 rounded-lg bg-green-50'>
                      <RadioGroupItem value='bank_deposit' id='bank_deposit' />
                      <Label htmlFor='bank_deposit'>Bank Deposit</Label>
                    </div>

                    {formData.paymentMethod === 'bank_deposit' && (
                      <div className='ml-6 p-4 bg-gray-50 rounded-lg text-sm'></div>
                    )}
                  </div>
                </RadioGroup>
              </div>

              {/* Billing Address */}
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h2 className='text-xl font-semibold mb-6'>Billing address</h2>

                <RadioGroup
                  value={formData.billingSameAsShipping ? 'same' : 'different'}
                  onValueChange={(value) =>
                    handleInputChange('billingSameAsShipping', value === 'same')
                  }
                  className='mb-6'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='same' id='same' />
                    <Label htmlFor='same'>Same as shipping address</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='different' id='different' />
                    <Label htmlFor='different'>
                      Use a different billing address
                    </Label>
                  </div>
                </RadioGroup>

                {!formData.billingSameAsShipping && (
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='billingCountry'>Country/Region</Label>
                      <select
                        id='billingCountry'
                        value={formData.billingCountry}
                        onChange={(e) =>
                          handleInputChange('billingCountry', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                      >
                        <option value='Sri Lanka'>Sri Lanka</option>
                      </select>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='billingFirstName'>First name</Label>
                        <Input
                          id='billingFirstName'
                          value={formData.billingFirstName}
                          onChange={(e) =>
                            handleInputChange(
                              'billingFirstName',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor='billingLastName'>Last name</Label>
                        <Input
                          id='billingLastName'
                          value={formData.billingLastName}
                          onChange={(e) =>
                            handleInputChange('billingLastName', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='billingAddress'>Address</Label>
                        <Input
                          id='billingAddress'
                          value={formData.billingAddress}
                          onChange={(e) =>
                            handleInputChange('billingAddress', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor='billingApartment'>
                          Apartment, suite, etc. (optional)
                        </Label>
                        <Input
                          id='billingApartment'
                          value={formData.billingApartment}
                          onChange={(e) =>
                            handleInputChange(
                              'billingApartment',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='billingCity'>City</Label>
                        <Input
                          id='billingCity'
                          value={formData.billingCity}
                          onChange={(e) =>
                            handleInputChange('billingCity', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor='billingPostalCode'>
                          Postal code (optional)
                        </Label>
                        <Input
                          id='billingPostalCode'
                          value={formData.billingPostalCode}
                          onChange={(e) =>
                            handleInputChange(
                              'billingPostalCode',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor='billingPhone'
                        className='flex items-center gap-2'
                      >
                        Phone (optional)
                        <Phone className='w-4 h-4' />
                      </Label>
                      <Input
                        id='billingPhone'
                        type='tel'
                        value={formData.billingPhone}
                        onChange={(e) =>
                          handleInputChange('billingPhone', e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                size='lg'
                className='w-full bg-purple-600 hover:bg-purple-700'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete order'}
              </Button>

              {result && (
                <div
                  className={`text-center p-4 rounded-lg ${
                    result.includes('Successfully')
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {result}
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl p-6 border border-gray-200 sticky top-6'>
              <h2 className='text-xl font-semibold mb-6'>Order summary</h2>

              <div className='space-y-4'>
                {cart.map((item) => (
                  <div key={item.id} className='flex gap-4'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div className='flex-1'>
                      <h3 className='font-medium text-sm'>{item.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        Qty: {item.quantity}
                      </p>
                      <p className='font-semibold text-primary'>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t border-gray-200 pt-4 mt-6 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='flex items-center gap-1'>
                    Shipping
                    <Phone className='w-3 h-3' />
                  </span>
                  <span>Rs. {shippingCost.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-lg font-bold border-t border-gray-200 pt-2'>
                  <span>Total</span>
                  <span>LKR Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
