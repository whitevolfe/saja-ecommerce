import { Quote } from 'lucide-react';
import founderimg from '../../public/assets/JBA .jpg';

const About = () => {
  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-5xl'>
        {/* HERO Section */}
        <div className='text-center mb-16'>
          <p className='text-sm font-semibold text-muted uppercase tracking-wider mb-2'>
            Our Story
          </p>
          <h1 className='text-5xl font-bold text-muted mb-4'>
            From Sri Lanka's Farms to Your Skin
          </h1>
          <p className='text-lg text-muted max-w-2xl mx-auto'>
            A decade of crafting herbal excellence — 100% natural, 100% Sri
            Lankan, 100% honest.
          </p>
        </div>

        {/* COMPANY STORY */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-muted mb-6'>Company Story</h2>
          <div className='space-y-4 text-muted'>
            <p>
              SAJ Associates (Pvt) Ltd was incorporated on 2nd September 2015.
              The main objective of the formation of the company was to add
              value to natural organic and flavour products which were gaining
              momentum worldwide. We identified Moringa, Cinnamon, Lemongrass,
              Aloevera and many other Sri Lankan herbs as the latest global
              wellness trend — and built a company around them.
            </p>
            <p>
              We process, produce and export some of the freshest flavours from
              fruits and leaves that can be found on earth. Our dynamic team
              helps in creating and innovating together to produce
              internationally recognized, high-quality natural flavours and
              products.
            </p>
            <p>
              Our flavours have given new life to old recognized tastes. We add
              value to your health as our products are healthy, natural, herbal
              and handmade. With customers' wellbeing always in mind, all our
              products are chemical-free. We only use plant-based natural oils
              and powders.
            </p>
          </div>
        </div>

        {/* FOUNDER */}
        <div className='mb-16 bg-[#F5F1E8]/50 rounded-xl p-8'>
          <h2 className='text-3xl font-bold text-[#1F3D2B] mb-6'>Founder</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-xl font-semibold text-[#1F3D2B] mb-2'>
                Mr. Jayampathy Arambepola
                <img
                  src={founderimg}
                  alt='Mr. Jayampathy Arambepola'
                  className='w-72 h-72 rounded-3xl m-10 mr-2'
                />
              </h3>
              <p className='text-primary font-medium mb-4'>
                Founder & Managing Director
              </p>

              <div className='mb-4'>
                <h4 className='font-semibold text-[#1F3D2B] mb-2'>
                  Qualifications:
                </h4>
                <ul className='list-disc list-inside text-[#5A5A5A] space-y-1'>
                  <li>
                    MBA from The Post Graduate Institute of Management,
                    University of Sri Jayewardenepura, Colombo, Sri Lanka
                  </li>
                  <li>
                    Chartered Marketer and Member, Chartered Institute of
                    Marketing, United Kingdom
                  </li>
                </ul>
              </div>

              <div className='mb-4'>
                <h4 className='font-semibold text-[#1F3D2B] mb-2'>
                  Experience:
                </h4>
                <ul className='list-disc list-inside text-[#5A5A5A] space-y-1'>
                  <li>Decades of excellent experience at BAT</li>
                  <li>New Zealand Milk</li>
                  <li>MBD India</li>
                  <li>
                    Other top companies in Sales, Marketing, Export and General
                    Management
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <Quote className='w-8 h-8 text-[#1F3D2B]/30 mb-4' />
              <blockquote className='text-lg italic text-[#5A5A5A] mb-4'>
                "Lifestyles worldwide are changing to natural, herbal, ayurvedic
                and healthy products. Our products are handcrafted and we use
                ingredients from plant base — the best nutrition for your skin.
                After all, your skin deserves the very best attention."
              </blockquote>
              <p className='text-sm text-[#5A5A5A]'>
                — Jayampathy Arambepola, Founder
              </p>
            </div>
          </div>
        </div>

        {/* OUR VALUES */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-muted mb-6'>Our Values</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                title: '100% Natural & Herbal',
                description:
                  'We only use plant-based natural oils and powders. Zero synthetic chemicals. Zero compromise.',
              },
              {
                title: 'Handmade with Care',
                description:
                  'Every bar of soap and every bottle of shampoo is handcrafted with love and precision.',
              },
              {
                title: 'Farmer-First',
                description:
                  "We support over 750 farmers in Sri Lanka's dry zone who grow our herbal ingredients. Buying SAJ products directly Improves their livelihoods.",
              },
              {
                title: 'Internationally Certified',
                description:
                  'We hold ISO 22716:2007, Ayurveda Department, and Veterinary Drug Control certifications — because you deserve verified quality.',
              },
              {
                title: 'Sustainably Sri Lankan',
                description:
                  'Our ingredients are locally sourced, our products are made here, and our profits stay in Sri Lanka.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className='bg-white border border-[#E6D3B3] rounded-xl p-6'
              >
                <h3 className='text-lg font-semibold text-[#1F3D2B] mb-2'>
                  {value.title}
                </h3>
                <p className='text-[#5A5A5A]'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EXPORT MARKETS */}
        <div className='bg-[#1F3D2B] text-white rounded-xl p-8'>
          <h2 className='text-3xl font-bold mb-4'>
            Taking Sri Lanka to the World
          </h2>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <p className='text-lg mb-4'>
                <strong>Current Market:</strong> Australia (Active)
              </p>
              <p className='text-lg mb-4'>
                <strong>Expanding to:</strong> Canada, USA, Sweden
              </p>
            </div>
            <div className='bg-white/10 rounded-lg p-6'>
              <Quote className='w-6 h-6 text-white/50 mb-3' />
              <blockquote className='italic mb-3'>
                "It is an extremely exciting time. We are shipping handmade
                soaps with only plant-based oils and powders to Australia. Our
                customers in Sri Lanka know what high quality standards we
                maintain — and now we are bringing that quality to the world."
              </blockquote>
              <p className='text-sm text-white/80'>
                — Jayampathy Arambepola, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
