import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const outOfStockCategories = [
  'SHAMPOO',
  'CONDITIONER',
  'LIQUID SOAP',
  'FACECREAMS',
  'DOGGY PRODUCTS',
];

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const isOutOfStock = outOfStockCategories.includes(product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    addToCart(product);

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className='block'>
      <div className='group bg-productCard rounded-xl overflow-hidden border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300'>
        <div className='relative overflow-hidden aspect-square bg-white'>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-contain p-3 transition-transform duration-300 ${
              isOutOfStock ? 'opacity-70' : 'group-hover:scale-105'
            }`}
          />

          {/* OUT OF STOCK BADGE */}
          {isOutOfStock && (
            <div className='absolute top-3 left-3 z-20'>
              <span className='bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-md shadow-lg tracking-wider'>
                OUT OF STOCK
              </span>
            </div>
          )}

          {product.featured && (
            <div className='absolute top-3 right-3 bg-secondary text-secondary-foreground text-white font-semibold px-3 py-1 rounded-full'>
              Featured
            </div>
          )}
        </div>

        <div className='p-4'>
          <h3 className='font-semibold text-lg mb-1 text-card-foreground'>
            {product.name}
          </h3>

          <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
            {product.description}
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-xl font-bold text-MUTED'>
              Rs. {product.price.toLocaleString()}
            </span>

            <div className='flex gap-2'>
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                size='sm'
                variant='secondary'
                className='gap-2 text-white'
              >
                <ShoppingCart className='w-4 h-4' />
                {isOutOfStock ? 'Unavailable' : 'Add'}
              </Button>

              {!isOutOfStock && (
                <Button asChild size='sm' variant='outline' className='gap-2'>
                  <Link to={`/product/${product.id}`}>Buy Now</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
