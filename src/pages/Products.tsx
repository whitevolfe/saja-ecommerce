import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { products } from '@/data/products';

const categories = [
  {
    name: 'SOAP',
    description: 'Natural soaps for gentle cleansing',
    image: '/assets/Neem.png',
  },
  {
    name: 'SHAMPOO',
    description: 'Herbal shampoos for healthy hair',
    image: '/assets/cinnamon shampoo.png',
  },
  {
    name: 'CONDITIONER',
    description: 'Conditioners to nourish your hair',
    image: '/assets/cinnamon hair conditioner.png',
  },
  {
    name: 'LIQUID SOAP',
    description: 'Liquid soaps for refreshing wash',
    image: '/assets/cinnamon castile soap.png',
  },
  {
    name: 'FACECREAMS',
    description: 'Face creams for radiant skin',
    image: '/assets/Morin Night Cream .jpeg',
  },
  {
    name: 'MASSAGE OILS',
    description: 'Massage oils for relaxation',
    image: '/assets/cinnamon body massage oil.png',
  },
  {
    name: 'DOGGY PRODUCTS',
    description: 'Pet care products for your furry friends',
    image: '/assets/Doggy soap.JPG',
  },
];

const Products = () => {
  const [openCategory, setOpenCategory] = useState('');

  const handleToggle = (category: string) => {
    setOpenCategory(openCategory === category ? '' : category);
  };

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-2'>Our Products</h1>

        <p className='text-muted-foreground mb-8'>
          Discover our complete collection of premium products
        </p>

        <div className='space-y-6'>
          {categories.map((cat) => {
            const categoryProducts = products.filter(
              (p) => p.category === cat.name,
            );

            const isOpen = openCategory === cat.name;

            return (
              <div key={cat.name}>
                {/* Category Card */}
                <CategoryCard
                  category={cat}
                  onClick={() => handleToggle(cat.name)}
                />

                {/* Dropdown Products */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? 'max-h-[5000px] opacity-100 mt-4'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
