import { Link } from 'react-router-dom';
import BrandIconsCarousel from '@/components/BrandIconsCarousel';
import {
  ArrowRight,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Sparkles,
  Zap,
  Leaf,
  ShieldCheck,
  FlaskConical,
  HeartHandshake,
  BadgeCheck,
  CheckCircle2,
  Award,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useState, useEffect } from 'react';

const Home = () => {
  const [expandedCards, setExpandedCards] = useState([]);

  const toggleReadMore = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

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
  const heroImage = '/assets/Banner_image_1.jpeg';

  const testimonials = [
    {
      name: 'Gunapala Nanayakkara',
      role: 'Prof',
      avatar: 'GN',
      rating: 5,
      text: 'My wife and I recently had the opportunity to use this new soap brands of SAJ made with natural ingredients, and I must say the experience has been truly impressive. The soap produces a gentle, creamy lather that cleanses effectively without drying the skin. Its subtle, refreshing fragrance feels authentic rather than artificial, reflecting the purity of its ingredients. What stands out most is the soft and nourished feeling it leaves after each wash, suggesting a careful balance between cleansing and skin care. In a market crowded with chemical-heavy products, this natural formulation offers a reassuring, high-quality alternative for those who value both wellness and authenticity in their daily personal care.',
      color: 'primary',
    },
    {
      name: 'Mr Nalaka Hewamaduma',
      role: 'Verified Customer',
      avatar: 'NH',
      rating: 5,
      text: 'After nearly 10 years of using Dove, I rarely change my skincare products. But recently my friend Jayantha Arambepola sent me a sample of his Lemongrass Wellness Bar by SAJ Skincare, and I must say I was genuinely impressed.The soap has a very soothing feel on the skin, a refreshing natural fragrance, and leaves the skin soft, clean, and energized. What I appreciate most is that it is a natural handmade glycerine bar enriched with plant-based oils and herbal ingredients, which makes the experience feel both gentle and authentic.Sometimes the best products are not the big global brands we see every day, but passionate creations from local entrepreneurs who truly care about quality.Wishing my friend Arambe great success with this wonderful product. If you enjoy natural, herbal skincare, this Lemongrass Wellness Bar is definitely worth trying.',
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

            {/* Content */}
            <div className='absolute inset-0 flex items-center'>
              <div className='px-6 md:px-12 lg:px-20 max-w-3xl text-white'>
                <h1
                  className='
              text-4xl
              md:text-5xl
              lg:text-7xl
              font-bold
              leading-tight
              mt-6
            '
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Discover the Essence
                  <br />
                  of Nature – 100% Srilankan.
                </h1>

                <h2
                  className='
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              mb-6
            '
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  100% Natural
                </h2>

                <p className='text-lg md:text-2xl leading-relaxed text-white/95 mb-8 font-semibold'>
                  From the farms of Sri Lanka to your home handcrafted ayurvedic
                  skincare, haircare and wellness products made with the finest
                  natural herbs and plant-based oils.
                  <br />
                  Zero chemicals. Just pure nature.
                </p>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button
                    asChild
                    size='lg'
                    className='gap-2 bg-white text-black hover:bg-white/90 px-8 py-6 text-lg'
                  >
                    <Link to='/products'>
                      Shop Now <ArrowRight className='w-5 h-5' />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BrandIconsCarousel />

      {/* What We Offer Section */}
      <section className='py-20 px-4 bg-gradient-to-b from-background to-muted/30'>
        <div className='container mx-auto'>
          <div className='text-center mb-14'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-white text-sm font-medium mb-5'>
              <Sparkles className='w-4 h-4' />
              Premium Herbal Care
            </div>

            <h2 className='text-3xl md:text-5xl font-bold text-white mb-5'>
              What We Offer
            </h2>

            <p className='text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed'>
              Discover a premium collection of natural herbal products crafted
              with care to support healthy skin, hair, and wellness using
              trusted plant-based ingredients.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Card 1 */}
            <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-4'>
                  Herbal Products
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Natural soaps, shampoos, creams, oils, and wellness products
                  made from carefully selected herbal ingredients.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
              <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6'>
                  <ShieldCheck className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-4'>
                  Safe Ingredients
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Free from harsh chemicals and crafted with gentle formulations
                  suitable for everyday use and healthy skincare routines.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6'>
                  <FlaskConical className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-4'>
                  Quality Production
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Every product is developed with attention to quality,
                  consistency, and customer satisfaction from start to finish.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
              <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6'>
                  <HeartHandshake className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-4'>
                  Customer Care
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  We are committed to delivering trusted herbal solutions with
                  excellent service and long-term customer satisfaction.
                </p>
              </div>
            </div>
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

      {/* Why Choose Us Section */}
      <section className='py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
        <div className='container mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left Content */}
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-white text-sm font-medium mb-6'>
                <BadgeCheck className='w-4 h-4' />
                Trusted Herbal Brand
              </div>

              <h2 className='text-3xl md:text-5xl font-bold text-white leading-tight mb-6'>
                Why Choose Us
              </h2>

              <p className='text-gray-300 text-lg leading-relaxed mb-8'>
                We combine natural herbal ingredients, quality manufacturing,
                and customer-focused service to deliver premium wellness and
                personal care products you can trust every day.
              </p>

              <div className='space-y-5'>
                <div className='flex items-start gap-4'>
                  <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0'>
                    <CheckCircle2 className='w-5 h-5 text-white' />
                  </div>

                  <div>
                    <h4 className='text-white font-semibold text-lg mb-1'>
                      100% Herbal Ingredients
                    </h4>

                    <p className='text-gray-400'>
                      Carefully selected natural ingredients for safe and
                      effective daily care.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0'>
                    <Award className='w-5 h-5 text-white' />
                  </div>

                  <div>
                    <h4 className='text-white font-semibold text-lg mb-1'>
                      Premium Quality Products
                    </h4>

                    <p className='text-gray-400'>
                      Every product is created with strict quality standards and
                      customer satisfaction in mind.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0'>
                    <Truck className='w-5 h-5 text-white' />
                  </div>

                  <div>
                    <h4 className='text-white font-semibold text-lg mb-1'>
                      Reliable Delivery
                    </h4>

                    <p className='text-gray-400'>
                      Fast and secure delivery to ensure your products arrive
                      safely and on time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
                <div className='w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-3'>
                  Natural Care
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Plant-based formulas designed to support healthy skin and hair
                  naturally.
                </p>
              </div>

              <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-2 mt-0 sm:mt-10'>
                <div className='w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6'>
                  <ShieldCheck className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-3'>
                  Safe Formula
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Gentle formulations without harsh chemicals for everyday use.
                </p>
              </div>

              <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2'>
                <div className='w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6'>
                  <HeartHandshake className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-3'>
                  Trusted Support
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  Dedicated customer support focused on long-term satisfaction.
                </p>
              </div>

              <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-2 mt-0 sm:mt-10'>
                <div className='w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6'>
                  <Zap className='w-8 h-8 text-white' />
                </div>

                <h3 className='text-2xl font-bold text-white mb-3'>
                  Fast Results
                </h3>

                <p className='text-gray-300 leading-relaxed'>
                  High-quality herbal solutions designed for visible and
                  effective results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
      <section className='py-16 px-6 bg-gradient-to-br from-muted/50 to-background'>
        <div className='max-w-[1800px] mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              What Our Customers Say
            </h2>

            <p className='text-gray-300 text-lg'>
              Real reviews from satisfied customers
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedCards.includes(index);

              return (
                <div
                  key={index}
                  className='bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-black flex flex-col transition-all duration-300'
                  style={{
                    minHeight: isExpanded ? 'auto' : '320px',
                  }}
                >
                  {/* Header */}
                  <div className='flex items-center gap-4 mb-5'>
                    <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0'>
                      <span className='text-primary font-bold text-xl'>
                        {testimonial.avatar}
                      </span>
                    </div>

                    <div>
                      <h4 className='font-semibold text-black text-xl'>
                        {testimonial.name}
                      </h4>

                      <p className='text-sm text-gray-600 mt-1'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className='flex gap-1 mb-5'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className='text-yellow-500 text-lg'>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className='flex-grow'>
                    <p
                      className={`text-gray-700 leading-7 text-[16px] transition-all duration-300 ${
                        !isExpanded ? 'line-clamp-6' : ''
                      }`}
                    >
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Read More Button */}
                  {testimonial.text.length > 180 && (
                    <button
                      onClick={() => toggleReadMore(index)}
                      className='mt-5 text-primary font-semibold hover:underline text-sm self-start transition'
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
              );
            })}
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
