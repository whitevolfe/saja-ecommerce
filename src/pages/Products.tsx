import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-2'>Our Products</h1>
        <p className='text-muted-foreground mb-8'>
          Discover our complete collection of premium products
        </p>

        {/* Category Filter */}
        <div className='flex flex-wrap gap-3 mb-8'>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('all')}
            className='text-white'
          >
            All Products
          </Button>
          <Button
            variant={selectedCategory === 'HAIR CARE' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('HAIR CARE')}
          >
            HAIR CARE
          </Button>
          <Button
            variant={selectedCategory === 'FACECREAMS' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('FACECREAMS')}
          >
            Face Creams
          </Button>
          <Button
            variant={
              selectedCategory === 'FOOD SUPPLEMENTS' ? 'default' : 'outline'
            }
            onClick={() => handleCategoryChange('FOOD SUPPLEMENTS')}
          >
            Food Supplements
          </Button>
          <Button
            variant={selectedCategory === 'BODY CARE' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('BODY CARE')}
          >
            Body Care
          </Button>
          <Button
            variant={selectedCategory === 'PET CARE' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('PET CARE')}
          >
            Pet Care
          </Button>
          <Button
            variant={
              selectedCategory === 'MASSAGE OILS' ? 'default' : 'outline'
            }
            onClick={() => handleCategoryChange('MASSAGE OILS')}
          >
            Massage Oils
          </Button>
          <Button
            variant={selectedCategory === 'GIFT PACKS' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('GIFT PACKS')}
          >
            Gift Packs
          </Button>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
