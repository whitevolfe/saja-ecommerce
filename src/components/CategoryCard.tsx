import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    image: string;
  };
  isOpen?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const CategoryCard = ({ category, isOpen, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className='group relative overflow-hidden rounded-2xl border border-green-700 bg-[#0a6d3b] hover:shadow-xl transition-all duration-300 cursor-pointer'
    >
      <div className='flex items-center justify-between p-4'>
        {/* Left Content */}
        <div className='flex items-center gap-4'>
          {/* Image */}
          <div className='relative w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0'>
            <img
              src={category.image}
              alt={category.name}
              className='w-full h-full object-cover p-1 group-hover:scale-105 transition-transform duration-300'
            />
          </div>

          {/* Text */}
          <div>
            <h3 className='font-bold text-xl text-white'>{category.name}</h3>

            <p className='text-sm text-white/80 mt-1 max-w-[220px]'>
              {category.description}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className='text-white'>
          {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
