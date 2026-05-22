import React from 'react';
import { Link } from 'react-router-dom';

const brands = [
  {
    name: 'DermaTreat',
    subtitle: 'Glycerin Soap',
    image: '/assets/otherbrands-img1.png',
  },
  {
    name: 'Lavish',
    subtitle: 'Glycerin Soap for George Stuart Health',
    image: '/assets/otherbrands-img2.png',
  },
  {
    name: 'Ayura Naturals',
    subtitle: 'Glycerin Soap & Shampoo for Wichy Coconut',
    image: '/assets/otherbrands-img3.png',
  },
  {
    name: 'LakSALA',
    subtitle: 'Souvenir boutique products',
    image: '/assets/otherbrands-img4.png',
  },
  {
    name: 'CIC Vetcare',
    subtitle: 'Herbal products',
    image: '/assets/otherbrands-img5.png',
  },
];

const OtherBrands = () => {
  return (
    <div className='min-h-screen py-20 px-6'>
      <div className='container mx-auto max-w-7xl'>
        {/* Heading */}
        <div className='text-center mb-14'>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            The Brands We Manufacture For Other Companies
          </h1>

          <p className='text-gray-300 mt-4 text-lg max-w-2xl mx-auto'>
            Trusted by leading wellness, beauty, healthcare, and retail brands
            across Sri Lanka.
          </p>
        </div>

        {/* Cards */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {brands.map((brand, idx) => (
            <Link
              to='#'
              key={idx}
              className='group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
            >
              {/* Image Section */}
              <div className='relative h-[240px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6'>
                <img
                  src={brand.image}
                  alt={brand.name}
                  className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110'
                />

                {/* Badge */}
                <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded-full shadow-sm'>
                  Partner Brand
                </div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <h2 className='text-2xl font-bold text-black mb-3 group-hover:text-black transition'>
                  {brand.name}
                </h2>

                <p className='text-gray-600 leading-relaxed text-sm'>
                  {brand.subtitle}
                </p>

                {/* Bottom Hover Line */}
                <div className='mt-5 h-[3px] w-0 group-hover:w-full bg-black rounded-full transition-all duration-500'></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherBrands;
