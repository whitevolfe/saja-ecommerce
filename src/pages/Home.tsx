import { Link } from 'react-router-dom';
import BrandIconsCarousel from '@/components/BrandIconsCarousel';
import {
  ArrowRight,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useState, useEffect } from 'react';

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const CONDITIONER = products
    .filter((p) => p.category === 'CONDITIONER')
    .slice(0, 4);
  const FACECREAMS = products
    .filter((p) => p.category === 'FACECREAMS')
    .slice(0, 4);
  const SOAPS = products.filter((p) => p.category === 'SOAP').slice(0, 4);
  const SHAMPOO = products.filter((p) => p.category === 'SHAMPOO').slice(0, 4);

  const LIQUIDSOAP = products
    .filter((p) => p.category === 'LIQUID SOAP')
    .slice(0, 4);
  // const PETCARE = products.filter((p) => p.category === 'PET CARE').slice(0, 4);
  const MASSAGEOILS = products
    .filter((p) => p.category === 'MASSAGE OILS')
    .slice(0, 4);

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const heroImage = '/assets/Banner_image_1.png';

  const testimonials = [
    {
      name: 'Gunapala Nanayakkara',
      role: 'Prof',
      avatar: 'GN',
      rating: 5,
      text: 'The soap produces a gentle, creamy lather that cleanses effectively without drying the skin. Its subtle, refreshing fragrance feels authentic rather than artificial. What stands out most is the soft and nourished feeling it leaves after each wash. In a market crowded with chemical-heavy products, this natural formulation offers a reassuring, high-quality alternative.',
      color: 'primary',
    },
    {
      name: 'Dilnoza P.',
      role: 'Verified Customer',
      avatar: 'DP',
      rating: 5,
      text: 'I have been using the Moringa shampoo for 3 months now. My hair is so much healthier and the natural fragrance is amazing. Best herbal shampoo I have ever tried!',
      color: 'secondary',
    },
    {
      name: 'Amali S',
      role: 'Pet Owner',
      avatar: 'AS',
      rating: 5,
      text: "The Doggy Bath Soap is a game changer! My golden retriever's coat is so shiny and the flea issue is completely resolved. Love that it is plant-based.",
      color: 'primary',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}

      <section className='relative py-0 px-0'>
        <div className='relative w-full'>
          {/* Hero Image */}
          <div className='relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden'>
            <img
              src={heroImage}
              alt='Hero'
              className='absolute inset-0 w-full h-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            <div className='absolute bottom-8 left-8 text-white max-w-2xl'>
              <h1 className='text-4xl md:text-6xl font-bold mb-4'></h1>
              <p className='text-lg md:text-xl text-white/90 mb-8'></p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button
                  asChild
                  size='lg'
                  className='gap-2 bg-white text-black hover:bg-white/90'
                >
                  <Link to='/products'>
                    Shop Now <ArrowRight className='w-4 h-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BrandIconsCarousel />

      {/* SOAPS Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Sparkles className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>SOAPS</h2>
              <p className='text-muted-foreground'>Natural and gentle soaps</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {SOAPS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=SOAPS'>
                View All SOAPS <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* HAIR CARE Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>SHAMPOOS</h2>
              <p className='text-muted-foreground'>
                Nourishing shampoos for healthy hair
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {SHAMPOO.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=SHAMPOO'>
                View All SHAMPOO <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* HAIR CARE Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>
                CONDITIONER
              </h2>
              <p className='text-muted-foreground'>
                Nourishing conditioners for healthy hair
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {CONDITIONER.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=CONDITIONER'>
                View All CONDITIONER <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* LIQUID SOAPS Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>
                LIQUID SOAPS
              </h2>
              <p className='text-muted-foreground'>
                Nourishing liquid soaps for clean and healthy skin
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {LIQUIDSOAP.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=LIQUID SOAP'>
                View All LIQUID SOAP <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* FACECREAMS Section */}
      {/* <section className='py-16 px-4 bg-muted/30'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Sparkles className='w-8 h-8 text-secondary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>FACECREAMS</h2>
              <p className='text-muted-foreground'>
                Premium beauty and skincare products
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {FACECREAMS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=FACECREAMS'>
                View All FACECREAMS <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* MASSAGE OILS Section */}
      {/* <section className='py-16 px-4 bg-muted/30'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>
                MASSAGE OILS
              </h2>
              <p className='text-muted-foreground'>Relaxing massage oils</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {MASSAGEOILS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=MASSAGE OILS'>
                View All MASSAGE OILS <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* BODY CARE Section */}
      {/* <section className='py-16 px-4 bg-muted/30'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>BODY CARE</h2>
              <p className='text-muted-foreground'>Body care essentials</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {BODYCARE.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=BODY CARE'>
                View All BODY CARE <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* PET CARE Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-secondary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>PET CARE</h2>
              <p className='text-muted-foreground'>Products for your pets</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {PETCARE.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=PET CARE'>
                View All PET CARE <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* GIFT PACKS Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Sparkles className='w-8 h-8 text-secondary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>GIFT PACKS</h2>
              <p className='text-muted-foreground'>
                Perfect gifts for any occasion
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {GIFTPACKS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=GIFT PACKS'>
                View All GIFT PACKS <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* FOOD SUPPLEMENTS Section */}
      {/* <section className='py-16 px-4 bg-muted/30'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>
                FOOD SUPPLEMENTS
              </h2>
              <p className='text-muted-foreground'>
                Health and nutrition supplements
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {FOODSUPPLEMENTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=FOOD SUPPLEMENTS'>
                View All FOOD SUPPLEMENTS{' '}
                <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Brand Titles Section */}
      <section className='py-8 px-4 bg-gradient-to-r from-primary to-secondary'>
        <div className='container mx-auto'>
          <div className='relative overflow-hidden'>
            <div className='flex gap-8 animate-scroll'>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              {/* Duplicate for seamless loop */}
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
              <div className='flex-shrink-0 text-white text-2xl md:text-4xl font-bold whitespace-nowrap'>
                SAJ ASSOCIATE HERBAL PRODUCTS SHOPPING
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 px-4 bg-gradient-to-br from-muted/50 to-background'>
        <div className='container mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              What Our Customers Say
            </h2>

            <p className='text-gray-300 text-lg'>
              Real reviews from satisfied customers
            </p>
          </div>

          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-black'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                      <span className='text-primary font-bold text-lg'>
                        {testimonial.avatar}
                      </span>
                    </div>

                    <div>
                      <h4 className='font-semibold text-black'>
                        {testimonial.name}
                      </h4>

                      <p className='text-sm text-gray-600'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className='text-yellow-500'>
                        ★
                      </span>
                    ))}
                  </div>

                  <p className='text-gray-700 leading-relaxed text-sm'>
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Ready to Shop?
            </h2>
            <p className='text-lg mb-6 opacity-90'>
              Browse our full collection and find your perfect products
            </p>
            <Button asChild size='lg' variant='secondary'>
              <Link to='/products'>
                Explore All Products <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
