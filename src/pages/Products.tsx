import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/CategoryCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const category = searchParams.get('category');

    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-2'>Our Products</h1>

        <p className='text-muted-foreground mb-8'>
          Discover our complete collection of premium products
        </p>

        {/* Category Filter - replaced with image cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {[
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
          ].map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              onClick={() => handleCategoryChange(cat.name)}
            />
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              {selectedCategory
                ? 'No products found in this category.'
                : 'Please select a category to view products.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
