import { Award } from 'lucide-react';

import founderImage from '../../public/assets/JBA .jpg';
import newsArticleImage from '../../public/assets/news-article.jpeg';
import newsArticleImage2 from '../../public/assets/news-article2.png';
import cicvetcareImage from '../../public/assets/cic-vetcare.png';

const Achivement = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-muted/20 to-background'>
      {/* Hero Section */}
      <section className='py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10'>
        <div className='container mx-auto text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center'>
              <Award className='w-10 h-10 text-primary' />
            </div>
          </div>

          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
            Farmer Incomes to Rise with Laksala and SAJ Tie-Up
          </h1>

          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            SAJ Associates Ltd. partners with Laksala to promote natural,
            herbal, Ayurvedic personal care products while supporting local
            farmers and expanding opportunities in local and international
            markets.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className='pb-16 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <div className='bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-8 text-center shadow-lg'>
            <img
              src={founderImage}
              alt='SAJ Associates Founder Jayampathy Arambepola'
              className='w-64 h-64 object-cover rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-lg'
            />

            <h2 className='text-2xl md:text-3xl font-bold text-black'>
              SAJ Associates Founder Jayampathy Arambepola
            </h2>
          </div>
        </div>
      </section>

      {/* Article Section */}
      {/* <section className='py-16 px-4'>
        <div className='container mx-auto max-w-5xl'>
          <div className='bg-white border border-border rounded-3xl p-6 md:p-10 shadow-lg space-y-8'>
            <p className='text-lg text-black leading-relaxed'>
              SAJ Associates Ltd., a SME specialising in Glycerin based,
              natural, herbal, Ayurvedic handmade personal beauty care segment
              for almost five years, has tied up with Laksala to promote its
              products via the country’s largest and the best-known
              Government-owned gift and souvenir shop.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              SAJ Founder Jayampathy Arambepola, said the company’s products are
              unique because they are all Glycerin based and have the least or
              virtually no chemicals and are manufactured mostly with plant base
              oils and powders.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              “We are using cinnamon, moringa, lemongrass, aloe vera, sesame
              with turmeric and other SL grown ingredients. These ingredients
              are mostly grown by over 500 farmers in the dry zone. With the
              backward integration with the North Central Province farmers, we
              will add value to these homemade valuable ingredients and we will
              also turn them into products to the highest international
              standards with the superior best quality,” said Arambepola.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              According to him, the whole world is becoming health conscious.
              Wherever in Sri Lanka or worldwide, one could see men, women,
              young and old walking and exercising to keep fitter and healthy.
              More and more gyms are opening daily to keep yourself healthy,
              which is an excellent situation.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              “With pollution, the environmental conditions are worsening. With
              the extreme heat, cold and frequent floods and droughts, the
              consumers are having health issues with the skin which is a big
              health concern leading to cancers etc. Hence the consumers are
              becoming more and more skin conscious too. They are giving the
              highest attention to keeping their skin well cared for. Hence the
              need for natural, herbal, Ayurvedic products with the least
              chemicals, are becoming the trend of the day,” he said.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              SAJ has introduced a range of very high quality, glycerin-based
              soaps, shampoos, conditioners, liquid soaps, face creams and
              massage oils. These are all glycerin based natural products with
              the least chemicals.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              Arambepola said SAJ’s association with Laksala has been a huge
              opportunity. “The availability of our range of products in their
              gift boutiques countrywide has helped us to cater to the Sri Lanka
              health-and skin conscious consumer with our product availability.
              Also to help the farmers who grow these ingredients in their
              homes.”
            </p>

            <p className='text-lg text-black leading-relaxed'>
              “Laksala, the largest gift and souvenir boutique in the country
              catering to the rapidly growing tourist numbers and the Sri Lanka
              diaspora, which are all important markets. Hence with this move,
              joining hands with Laksala, we will have the second or another
              opportunity to cater to the foreigners with some of our high-end
              product range with certification from Ayurveda and National
              Medicine Regulatory Authority (NMRA),” Arambepola added.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              As a professional team, he said SAJ is delighted with the forward
              linked association with Laksala. “We hope to work with Laksala in
              the long term as we will not only talk to the Sri Lankan consumers
              but also to the global consumers with the Laksala links worldwide.
              Opening new markets for our products and our backward integrated
              farmers who will certainly have a better quality of life with
              higher and rising incomes with our new link,” he said.
            </p>

            <p className='text-lg text-black leading-relaxed'>
              “I will take the opportunity to thank Laksala Managing Director
              Jayawardene most sincerely for all the excellent support and the
              leadership extended to our new association. I am extremely
              confident that this new link will be a ‘win-win’ for all parties
              including to the state with new export orders through Laksala and
              to the NCP farmers who grow the ingredients will certainly have a
              huge economic advantage,” Arambepola added.
            </p>
          </div>
        </div>
      </section> */}

      {/* News Article Image Section */}
      <section className='pb-20 px-4'>
        <div className='container mx-auto max-w-5xl'>
          <div className='bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-lg'>
            <img
              src={newsArticleImage}
              alt='News Article'
              className='w-full rounded-2xl object-cover'
            />
          </div>
        </div>
        <div className='container mt-20 mx-auto max-w-5xl'>
          <div className='bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-lg'>
            <img
              src={cicvetcareImage}
              alt='CIC VETCARE'
              className='w-full rounded-2xl object-cover'
            />
          </div>
        </div>
        <div className='container mt-20 mx-auto max-w-5xl'>
          <div className='bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-lg'>
            <img
              src={newsArticleImage2}
              alt='CIC VETCARE'
              className='w-full rounded-2xl object-cover'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achivement;
