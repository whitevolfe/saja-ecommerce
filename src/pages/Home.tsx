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
  const HAIRCARE = products
    .filter((p) => p.category === 'HAIR CARE')
    .slice(0, 4);
  const FACECREAMS = products
    .filter((p) => p.category === 'FACECREAMS')
    .slice(0, 4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const carouselImages = [
    '/assets/Banner_image_1.jpeg',
    '/assets/Banner_image_3.jpeg',
    // '/assets/Banner_image_1.jpeg',
  ];

  const testimonials = [
    {
      name: 'Gunapala Nanayakkara',
      role: 'Prof',
      avatar: 'JD',
      rating: 5,
      text: 'The soap produces a gentle, creamy lather that cleanses effectively without drying the skin. Its subtle, refreshing fragrance feels authentic rather than artificial. What stands out most is the soft and nourished feeling it leaves after each wash. In a market crowded with chemical-heavy products, this natural formulation offers a reassuring, high-quality alternative.',
      color: 'primary',
    },
    {
      name: 'Dilnoza P.',
      role: 'Verified Customer',
      avatar: 'AS',
      rating: 5,
      text: 'I have been using the Moringa shampoo for 3 months now. My hair is so much healthier and the natural fragrance is amazing. Best herbal shampoo I have ever tried!',
      color: 'secondary',
    },
    {
      name: 'Amali S',
      role: 'Pet Owner',
      avatar: 'MR',
      rating: 5,
      text: "The Doggy Bath Soap is a game changer! My golden retriever's coat is so shiny and the flea issue is completely resolved. Love that it is plant-based.",
      color: 'primary',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1,
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

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
          {/* Carousel */}
          <div className='relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden'>
            <div className='absolute inset-0'>
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hero ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ${
                    index === currentImageIndex
                      ? 'translate-x-0'
                      : index < currentImageIndex
                        ? '-translate-x-full'
                        : 'translate-x-full'
                  }`}
                />
              ))}
            </div>

            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? carouselImages.length - 1 : prev - 1,
                )
              }
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors'
              aria-label='Previous image'
            >
              <ArrowLeft className='w-6 h-6' />
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === carouselImages.length - 1 ? 0 : prev + 1,
                )
              }
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors'
              aria-label='Next image'
            >
              <ArrowRightIcon className='w-6 h-6' />
            </button>

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

          <div className='flex justify-center gap-2 mt-4'>
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <BrandIconsCarousel />

      {/* HAIR CARE Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Zap className='w-8 h-8 text-primary' />
            <div>
              <h2 className='text-3xl font-bold text-foreground'>HAIR CARE</h2>
              <p className='text-muted-foreground'>
                Latest tech gadgets and accessories
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {HAIRCARE.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button asChild variant='outline'>
              <Link to='/products?category=HAIR CARE'>
                View All HAIR CARE <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FACECREAMS Section */}
      <section className='py-16 px-4 bg-muted/30'>
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
      </section>

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
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
              What Our Customers Say
            </h2>
            <p className='text-muted-foreground text-lg'>
              Real reviews from satisfied customers
            </p>
          </div>

          <div className='max-w-6xl mx-auto'>
            <div className='relative overflow-hidden'>
              {/* Navigation Arrows */}

              {/* Testimonial Cards */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4'>
                {testimonials.map((testimonial, index) => {
                  // Calculate position for 3-card layout
                  const position =
                    (index - currentTestimonialIndex + testimonials.length) %
                    testimonials.length;

                  return (
                    <div
                      key={index}
                      className={`bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-1000 ${
                        position === 0
                          ? 'opacity-100 scale-100'
                          : position === 1
                            ? 'opacity-80 scale-95 translate-x-full'
                            : 'opacity-60 scale-90 translate-x-full'
                      }`}
                    >
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                          <span className='text-primary font-bold text-lg'>
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <h4 className='font-semibold text-foreground'>
                            {testimonial.name}
                          </h4>
                          <p className='text-sm text-muted-foreground'>
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
                      <p className='text-muted-foreground leading-relaxed text-sm'>
                        "{testimonial.text}"
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Testimonial Indicators */}
              <div className='flex justify-center gap-3 mt-8'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonialIndex
                        ? 'bg-primary w-8'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
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
