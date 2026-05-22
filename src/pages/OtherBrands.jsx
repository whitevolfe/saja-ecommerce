import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Sparkles,
  Flower2,
  ShoppingBag,
  Stethoscope,
} from 'lucide-react';

const brands = [
  {
    name: 'DermaTreat',
    subtitle: 'Glycerin Soap',
    icon: Leaf,
  },
  {
    name: 'Lavish',
    subtitle: 'Glycerin Soap for George Stuart Health',
    icon: Sparkles,
  },
  {
    name: 'Ayura Naturals',
    subtitle: 'Glycerin Soap & Shampoo for Wichy Coconut',
    icon: Flower2,
  },
  {
    name: 'LakSALA',
    subtitle: 'Souvenir boutique products',
    icon: ShoppingBag,
  },
  {
    name: 'CIC Vetcare',
    subtitle: 'Herbal products',
    icon: Stethoscope,
  },
];

const OtherBrands = () => {
  return (
    <div className='min-h-screen py-16 px-6'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-white'>
            Brands We Manufacture For
          </h1>
          <p className='text-gray-300 mt-3'>
            Trusted partnerships with premium product brands
          </p>
        </div>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {brands.map((brand, idx) => {
            const Icon = brand.icon;

            return (
              <Link
                to='#'
                key={idx}
                className='group bg-white text-black rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
              >
                {/* Top Row */}
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-11 h-11 flex items-center justify-center rounded-lg bg-gray-100'>
                    <Icon className='w-5 h-5 text-gray-700' />
                  </div>

                  <span className='text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full'>
                    Partner Brand
                  </span>
                </div>

                {/* Content */}
                <h2 className='text-xl font-semibold mb-2'>{brand.name}</h2>
                <p className='text-gray-600 text-sm'>{brand.subtitle}</p>

                {/* Hover line */}
                <div className='mt-4 h-[2px] w-0 group-hover:w-full bg-black transition-all duration-300'></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OtherBrands;
