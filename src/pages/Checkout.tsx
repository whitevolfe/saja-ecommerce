
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

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    phone: '',
    deliveryNote: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // DELIVERY CHARGE BASED ON DISTRICT
  const isColomboDistrict =
    formData.district.trim().toLowerCase() === 'colombo';

  const shippingCost = isColomboDistrict ? 400 : 500;

  const subtotal = getTotalAmount();
  const total = subtotal + shippingCost;

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear the error when the customer edits the field
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  // VALIDATE CHECKOUT FORM
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. EMAIL VALIDATION
    const email = formData.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 2. SRI LANKAN PHONE NUMBER VALIDATION
    const phone = formData.phone.replace(/[\s-]/g, '');
    const phonePattern = /^(?:0\d{9}|\+94\d{9})$/;

    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(phone)) {
      newErrors.phone =
        'Enter a valid Sri Lankan phone number (0771234567 or +94771234567).';
    }

    // 3. FIRST NAME AND LAST NAME VALIDATION
    const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (!namePattern.test(formData.firstName.trim())) {
      newErrors.firstName = 'Please enter a valid first name.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (!namePattern.test(formData.lastName.trim())) {
      newErrors.lastName = 'Please enter a valid last name.';
    }

    // 4. ADDRESS VALIDATION
    if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a valid delivery address.';
    }

    // 5. CITY VALIDATION
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    } else if (
      !/^[\p{L}\p{M}\s'.-]+$/u.test(formData.city.trim())
    ) {
      newErrors.city = 'Please enter a valid city.';
    }

    // 6. DISTRICT VALIDATION
    if (!formData.district.trim()) {
      newErrors.district = 'District is required.';
    } else if (
      !/^[\p{L}\p{M}\s'.-]+$/u.test(formData.district.trim())
    ) {
      newErrors.district = 'Please enter a valid district.';
    }

    // 7. POSTAL CODE VALIDATION (REQUIRED)
    const postalCode = formData.postalCode.trim();

    if (!postalCode) {
      newErrors.postalCode = 'Postal code is required.';
    } else if (!/^\d{5}$/.test(postalCode)) {
      newErrors.postalCode =
        'Please enter a valid 5-digit postal code.';
    }

    return newErrors;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate customer details before submitting
    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: 'Invalid Details',
        description: 'Please correct the highlighted fields and try again.',
        variant: 'destructive',
      });

      const firstError = Object.keys(validationErrors)[0];

      document.getElementById(firstError)?.focus();

      return;
    }

    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add products first.',
        variant: 'destructive',
      });

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
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        shippingCost,
      });

      if (!result.success) {
        throw new Error(result.message || 'Unable to create your order.');
      }

      if (paymentMethod === 'online' && result.payUrl) {
        // MarxPay handles card entry and 3DS.
        // Customer returns to /payment-result afterwards.
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
      const message =
        error instanceof Error ? error.message : 'Something went wrong.';

      toast({
        title: 'Order failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable error message
  const showError = (field: string) =>
    errors[field] ? (
      <p className="text-red-600 text-sm mt-1" role="alert">
        {errors[field]}
      </p>
    ) : null;

  // Reusable input styling
  const inputClass = (field: string) =>
    `text-black ${
      errors[field]
        ? 'border-red-500 focus-visible:ring-red-500'
        : ''
    }`;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Your cart is empty
          </h1>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-white gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={onSubmit} noValidate className="space-y-6">

              {/* CONTACT */}
              <div className="bg-white text-black border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {/* EMAIL */}
                  <div>
                    <Input
                      id="email"
                      required
                      type="email"
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {showError('email')}
                  </div>

                  {/* PHONE */}
                  <div>
                    <Input
                      id="phone"
                      required
                      type="tel"
                      placeholder="Phone number *"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className={inputClass('phone')}
                      aria-invalid={!!errors.phone}
                    />
                    {showError('phone')}
                  </div>
                </div>
              </div>

              {/* DELIVERY */}
              <div className="bg-white text-black border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery</h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {/* FIRST NAME */}
                  <div>
                    <Input
                      id="firstName"
                      required
                      placeholder="First name *"
                      value={formData.firstName}
                      className={inputClass('firstName')}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                      aria-invalid={!!errors.firstName}
                    />
                    {showError('firstName')}
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <Input
                      id="lastName"
                      required
                      placeholder="Last name *"
                      value={formData.lastName}
                      className={inputClass('lastName')}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      aria-invalid={!!errors.lastName}
                    />
                    {showError('lastName')}
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="mt-4">
                  <Input
                    id="address"
                    required
                    className={inputClass('address')}
                    placeholder="Delivery address *"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
                    aria-invalid={!!errors.address}
                  />
                  {showError('address')}
                </div>

                {/* CITY, DISTRICT, POSTAL CODE */}
                <div className="grid md:grid-cols-3 gap-4 mt-4">

                  {/* CITY */}
                  <div>
                    <Input
                      id="city"
                      required
                      placeholder="City *"
                      value={formData.city}
                      className={inputClass('city')}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      aria-invalid={!!errors.city}
                    />
                    {showError('city')}
                  </div>

                  {/* DISTRICT */}
                  <div>
                    <Input
                      id="district"
                      required
                      placeholder="District *"
                      value={formData.district}
                      className={inputClass('district')}
                      onChange={(e) =>
                        handleInputChange('district', e.target.value)
                      }
                      aria-invalid={!!errors.district}
                    />
                    {showError('district')}
                  </div>

                  {/* POSTAL CODE */}
                  <div>
                    <Input
                      id="postalCode"
                      required
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="Postal code *"
                      value={formData.postalCode}
                      className={inputClass('postalCode')}
                      onChange={(e) =>
                        handleInputChange('postalCode', e.target.value)
                      }
                      aria-invalid={!!errors.postalCode}
                    />
                    {showError('postalCode')}
                  </div>
                </div>

                {/* DELIVERY NOTE */}
                <textarea
                  value={formData.deliveryNote}
                  onChange={(e) =>
                    handleInputChange('deliveryNote', e.target.value)
                  }
                  placeholder="Delivery note (optional)"
                  className="mt-4 w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* SHIPPING METHOD */}
              <div className="bg-white text-black border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-primary" />
                  Shipping Method
                </h2>

                <div className="p-4 rounded-lg border border-gray-300 bg-gray-50 flex justify-between">
                  <span>Standard Delivery</span>
                  <strong>Rs. {shippingCost.toLocaleString()}</strong>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Colombo: Rs. 400 | Other districts: Rs. 500
                </p>
              </div>

              {/* PAYMENT */}
              <div className="bg-white text-black border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as 'cod' | 'online')
                  }
                >
                  <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" className="mt-1" />

                    <span>
                      <span className="font-medium flex items-center gap-2">
                        <Banknote className="w-4 h-4" />
                        Cash on Delivery
                      </span>

                      <span className="text-sm text-gray-500 block mt-1">
                        Pay when your order is delivered.
                      </span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 mt-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="online" className="mt-1" />

                    <span>
                      <span className="font-medium">
                        Pay Online by Card
                      </span>

                      <span className="text-sm text-gray-500 block mt-1">
                        Secure payment through MarxPay. Visa, Mastercard,
                        UnionPay and supported cards.
                      </span>
                    </span>
                  </label>
                </RadioGroup>
              </div>

              {/* SUBMIT ORDER */}
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting
                  ? 'Processing...'
                  : paymentMethod === 'online'
                    ? `Pay Rs. ${total.toLocaleString()}`
                    : 'Place Order'}
              </Button>

              {paymentMethod === 'online' && (
                <p className="text-center text-white/80 text-sm">
                  You will be redirected to MarxPay's secure payment page.
                </p>
              )}
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white text-black border border-gray-200 rounded-xl p-6 sticky top-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Rs. {shippingCost.toLocaleString()}</span>
              </div>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
