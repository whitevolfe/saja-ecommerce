import { useState } from 'react';
import { Product } from '@/data/products';

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    image: string;
  };
  onClick?: (e: React.MouseEvent) => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className='group relative overflow-hidden rounded-1xl border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 cursor-pointer'
    >
      <div className='relative w-16 h-16 bg-white rounded-lg overflow-hidden mr-3'>
        <img
          src={category.image}
          alt={category.name}
          className='w-full h-full object-cover p-1 group-hover:scale-105 transition-transform duration-200'
        />
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
      <div>
        <h3 className='font-semibold text-base text-card-foreground'>
          {category.name}
        </h3>
        <p className='text-xs text-muted-foreground line-clamp-2'>
          {category.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
