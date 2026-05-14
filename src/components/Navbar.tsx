import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Publicity', path: '/publicity' },
    { name: 'Cart', path: '/cart' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-[#F5F1E8]/95 backdrop-blur-sm border-b border-[#E6D3B3] shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center'>
            <img
              src='/assets/Ayuvedic_handmade_logo.png'
              alt='Ayuvedic_handmade saja Logo'
              className='h-14 w-20'
            />
            <h2 className='text-1xl font-bold text-[#1F3D2B]'>
              SAJ Associates | Herbal · Natural · 100% Sri Lankan
            </h2>
            <h2 className='text-1xl ml-10 font-bold text-[#1F3D2B]'>
              <a
                href='tel:0714550555'
                target='_blank'
                rel='noopener noreferrer'
              >
                +94 777 383 471
              </a>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#4F7D4A] ${
                  isActive(link.path) ? 'text-[#1F3D2B]' : 'text-[#5A5A5A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to='/cart'
              className='relative p-2 hover:bg-[#E6D3B3] rounded-lg transition-colors'
            >
              <ShoppingCart className='w-5 h-5 text-[#1F3D2B]' />
              {getCartCount() > 0 && (
                <span className='absolute -top-1 -right-1 bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 hover:bg-[#E6D3B3] rounded-lg transition-colors'
          >
            {isOpen ? (
              <X className='w-6 h-6 text-[#1F3D2B]' />
            ) : (
              <Menu className='w-6 h-6 text-[#1F3D2B]' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden py-4 border-t border-[#E6D3B3]'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#1F3D2B]/10 text-[#1F3D2B] font-medium'
                    : 'text-[#5A5A5A] hover:bg-[#E6D3B3]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
