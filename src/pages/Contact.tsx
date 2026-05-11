import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Message sent!',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='container mx-auto max-w-5xl'>
        <h1 className='text-4xl font-bold mb-2 text-white'>Contact Us</h1>

        <p className='text-gray-300 mb-12'>
          Have questions? We'd love to hear from you.
        </p>

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Contact Form */}
          <div className='bg-white border border-gray-200 rounded-xl p-6 text-black'>
            <h2 className='text-2xl font-semibold mb-6 text-black'>
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-black text-sm font-medium mb-2'
                >
                  Name
                </label>

                <Input
                  id='name'
                  type='text'
                  placeholder='Your name'
                  className='text-black bg-white border-gray-300'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-black text-sm font-medium mb-2'
                >
                  Email
                </label>

                <Input
                  id='email'
                  type='email'
                  placeholder='your.email@example.com'
                  className='text-black bg-white border-gray-300'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-black text-sm font-medium mb-2'
                >
                  Message
                </label>

                <Textarea
                  id='message'
                  placeholder='How can we help you?'
                  rows={5}
                  className='text-black bg-white border-gray-300'
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <Button type='submit' className='w-full text-white'>
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6 text-black'>
              <h2 className='text-2xl font-semibold mb-6 text-black'>
                Get in touch
              </h2>

              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <Phone className='w-5 h-5 text-primary mt-1' />

                  <div>
                    <p className='font-medium text-black'>Phone</p>
                    <p className='text-gray-700'>+94 777 383 471</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Mail className='w-5 h-5 text-primary mt-1' />

                  <div>
                    <p className='font-medium text-black'>Email</p>
                    <p className='text-gray-700'>arambe.lk@gmail.com</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-primary mt-1' />

                  <div>
                    <p className='font-medium text-black'>Address</p>
                    <p className='text-gray-700'>Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-xl p-6 text-black'>
              <h3 className='text-xl font-semibold mb-4 text-black'>
                Business Hours
              </h3>

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-700'>Monday - Friday</span>
                  <span className='font-medium text-black'>
                    9:00 AM - 6:00 PM
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-700'>Saturday</span>
                  <span className='font-medium text-black'>
                    10:00 AM - 4:00 PM
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-700'>Sunday</span>
                  <span className='font-medium text-black'>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;