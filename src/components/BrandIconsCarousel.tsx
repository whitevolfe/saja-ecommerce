import { useEffect, useRef } from 'react';

const BrandIconsCarousel = () => {
  const brandIcons = [
    '/assets/brand-icons1-removebg.png',
    '/assets/Ayuvedic_handmade_logo.png',
    '/assets/brand-icon5-removebg.png',
    '/assets/brand-icons1-removebg.png',
    '/assets/Ayuvedic_handmade_logo.png',
    '/assets/brand-icon5-removebg.png',
    // '/assets/brand-icon2-removebg.png',
    // '/assets/brand-icon6-removebg.png',
    // '/assets/brand-icon7-removebg.png',
  ];

  // Duplicate icons for seamless loop
  const allIcons = [...brandIcons, ...brandIcons];

  return (
    <section className='py-7 px-4 bg-white overflow-hidden'>
      <div className='container mx-auto'>
        <div className='relative'>
          <div
            className='flex gap-12 animate-scroll'
            style={{
              animation: 'scroll 20s linear infinite',
            }}
          >
            {allIcons.map((icon, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center'
              >
                <img
                  src={icon}
                  alt={`Brand Icon ${index + 1}`}
                  className='max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default BrandIconsCarousel;
