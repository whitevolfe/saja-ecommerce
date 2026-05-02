import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-card border-t border-border mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='text-center md:text-left'>
            <h3 className='text-xl font-bold text-primary mb-2'>
              SAJ Associates (Pvt) Ltd Herlbal Products Shopping
            </h3>
            <p className='text-sm text-muted-foreground'>
              Your destination for premium HAIR CARE & Face creams. Quality,
              care, and beauty in every product.
            </p>
          </div>

          <div className='flex gap-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full hover:bg-primary/10 transition-colors'
              aria-label='Facebook'
            >
              <Facebook className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors' />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full hover:bg-primary/10 transition-colors'
              aria-label='Instagram'
            >
              <Instagram className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors' />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full hover:bg-primary/10 transition-colors'
              aria-label='Twitter'
            >
              <Twitter className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors' />
            </a>
            <a
              href='mailto:arambe.lk@gmail.com '
              className='p-2 rounded-full hover:bg-primary/10 transition-colors'
              aria-label='Email'
            >
              <Mail className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors' />
            </a>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground'>
          © {currentYear} 2025 SAJ Associates (Pvt) Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
