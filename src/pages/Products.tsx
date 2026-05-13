import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

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

        {/* Category Filter */}
        <div className='flex flex-wrap gap-3 mb-8'>
          <Button
            variant={selectedCategory === 'SOAP' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('SOAP')}
          >
            Soap
          </Button>

          <Button
            variant={selectedCategory === 'SHAMPOO' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('SHAMPOO')}
          >
            Shampoo
          </Button>

          <Button
            variant={
              selectedCategory === 'DOGGY PRODUCTS'
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange('DOGGY PRODUCTS')}
          >
            Doggy Products
          </Button>

          <Button
            variant={
              selectedCategory === 'CONDITIONER'
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange('CONDITIONER')}
          >
            Conditioner
          </Button>

          <Button
            variant={
              selectedCategory === 'LIQUID SOAP'
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange('LIQUID SOAP')}
          >
            Liquid Soap
          </Button>

          <Button
            variant={
              selectedCategory === 'FACECREAMS'
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange('FACECREAMS')}
          >
            Face Creams
          </Button>

          <Button
            variant={
              selectedCategory === 'MASSAGE OILS'
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange('MASSAGE OILS')}
          >
            Massage Oils
          </Button>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!selectedCategory && (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              Please select a category to view products.
            </p>
          </div>
        )}

        {selectedCategory && filteredProducts.length === 0 && (
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