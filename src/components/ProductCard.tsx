import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className='block'>
      <div className='group bg-card rounded-xl overflow-hidden border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300'>
        <div className='relative overflow-hidden aspect-square'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          {product.featured && (
            <div className='absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full'>
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
            <span className='text-xl font-bold text-primary'>
              Rs. {product.price.toLocaleString()}
            </span>
            <div className='flex gap-2'>
              <Button onClick={handleAddToCart} size='sm' className='gap-2'>
                <ShoppingCart className='w-4 h-4' />
                Add
              </Button>
              <Button asChild size='sm' variant='outline' className='gap-2'>
                <Link to={`/product/${product.id}`}>Buy Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
