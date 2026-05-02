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
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center'>
            <img
              src='/assets/Ayuvedic_handmade_logo.png'
              alt='Ayuvedic_handmade saja Logo'
              className='h-14 w-20'
            />
            <h2 className='text-1xl font-bold text-primary'>
              SAJ | Associates | Herbal · Natural · 100% Sri Lankan
            </h2>
            <h2 className='text-1xl ml-10 font-bold text-primary'>
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
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to='/cart'
              className='relative p-2 hover:bg-muted rounded-lg transition-colors'
            >
              <ShoppingCart className='w-5 h-5' />
              {getCartCount() > 0 && (
                <span className='absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 hover:bg-muted rounded-lg transition-colors'
          >
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted'
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
