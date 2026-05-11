import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalAmount, clearCart } =
    useCart();

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before placing an order.',
        variant: 'destructive',
      });
      return;
    }

    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.name}\n  Qty: ${item.quantity}\n  Price: Rs. ${(item.price * item.quantity).toLocaleString()}`,
      )
      .join('\n\n');

    const totalAmount = getTotalAmount();
    const message = `🛍️ *New Order from ZareSAJ Associates (Pvt) Ltd Herbal Products Shopping*\n\n${orderDetails}\n\n*Total Amount: Rs. ${totalAmount.toLocaleString()}*\n\nPlease confirm this order.`;

    const whatsappUrl = `https://wa.me/94777383471?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Order sent!',
      description:
        'Your order has been sent via WhatsApp. We will confirm shortly.',
    });

    // Optionally clear cart after sending
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className='min-h-screen py-16 px-4'>
        <div className='container mx-auto max-w-2xl text-center'>
          <ShoppingBag className='w-24 h-24 mx-auto text-muted-foreground mb-6' />
          <h1 className='text-3xl font-bold mb-4'>Your cart is empty</h1>
          <p className='text-muted-foreground mb-8'>
            Start shopping to add items to your cart!
          </p>
          <Button asChild size='lg'>
            <Link to='/products'>Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto max-w-4xl'>
        <h1 className='text-4xl font-bold mb-8 text-white'>Shopping Cart</h1>

        <div className='space-y-4 mb-8'>
          {cart.map((item) => (
            <div
              key={item.id}
              className='bg-white border border-gray-200 rounded-xl p-4 flex gap-4 text-black'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-24 h-24 object-cover rounded-lg'
              />

              <div className='flex-1'>
                <Link
                  to={`/product/${item.id}`}
                  className='font-semibold text-lg mb-1 hover:text-primary transition-colors block text-black'
                >
                  {item.name}
                </Link>

                <p className='text-sm text-gray-600 mb-2'>
                  Rs. {item.price.toLocaleString()} each
                </p>

                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2 bg-gray-100 rounded-lg'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='text-black hover:bg-gray-200'
                    >
                      <Minus className='w-4 h-4' />
                    </Button>

                    <span className='px-3 font-medium text-black'>
                      {item.quantity}
                    </span>

                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='text-black hover:bg-gray-200'
                    >
                      <Plus className='w-4 h-4' />
                    </Button>
                  </div>

                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 hover:text-red-600 hover:bg-red-50'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              </div>

              <div className='text-right'>
                <p className='text-xl font-bold text-black'>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white rounded-xl p-6 border border-gray-200 text-black'>
          <div className='flex justify-between items-center mb-6'>
            <span className='text-xl font-semibold text-black'>
              Total Amount:
            </span>

            <span className='text-3xl font-bold text-primary'>
              Rs. {getTotalAmount().toLocaleString()}
            </span>
          </div>

          <div className='space-y-3'>
            <Button asChild size='lg' className='w-full text-white'>
              <Link to='/checkout'>Proceed to Checkout</Link>
            </Button>

            <Button
              onClick={handleBuyNow}
              variant='outline'
              size='lg'
              className='w-full text-black border-gray-300 hover:bg-gray-100'
            >
              Buy Now via WhatsApp
            </Button>
          </div>

          <p className='text-sm text-gray-600 text-center mt-4'>
            Choose checkout for detailed order form or WhatsApp for quick order
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
