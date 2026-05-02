import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Star,
  Plus,
  Minus,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  // Get featured products (excluding current product)
  const featuredProducts = products
    .filter((p) => p.featured && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className='min-h-screen py-16 px-4'>
        <div className='container mx-auto max-w-2xl text-center'>
          <h1 className='text-3xl font-bold mb-4'>Product Not Found</h1>
          <p className='text-muted-foreground mb-8'>
            The product you're looking for doesn't exist.
          </p>
          <Button asChild size='lg'>
            <Link to='/products'>Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in this product:\n\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}\n\n${product.description}\n\nCan you provide more details?`;
    const whatsappUrl = `https://wa.me/94777383471?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Back Button */}
        <Button
          variant='ghost'
          onClick={() => navigate(-1)}
          className='mb-6 gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </Button>

        {/* Product Details */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          {/* Product Image */}
          <div className='space-y-4'>
            <div className='aspect-square bg-card rounded-xl overflow-hidden border border-border'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </div>
            {product.featured && (
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                <span>Featured Product</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-4xl font-bold mb-4'>{product.name}</h1>
              <p className='text-2xl font-bold text-primary mb-4'>
                Rs. {product.price.toLocaleString()}
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='font-medium'>Quantity:</span>
                <div className='flex items-center gap-2 bg-muted rounded-lg'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className='w-4 h-4' />
                  </Button>
                  <span className='px-3 font-medium min-w-[3rem] text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className='w-4 h-4' />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                <Button
                  onClick={handleAddToCart}
                  size='lg'
                  className='w-full gap-2'
                >
                  <ShoppingCart className='w-5 h-5' />
                  Add to Cart
                </Button>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Button
                    onClick={handleBuyNow}
                    variant='outline'
                    size='lg'
                    className='gap-2'
                  >
                    Buy Now
                  </Button>

                  <Button
                    onClick={handleWhatsApp}
                    variant='outline'
                    size='lg'
                    className='gap-2'
                  >
                    <MessageCircle className='w-5 h-5' />
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* Product Details */}
              <div className='space-y-3 pt-6 border-t border-border'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Category:</span>
                  <span className='capitalize font-medium'>
                    {product.category}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>SKU:</span>
                  <span className='font-medium'>{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <div className='space-y-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold mb-4'>You Might Also Like</h2>
              <p className='text-muted-foreground'>
                Discover more amazing products from our collection
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
