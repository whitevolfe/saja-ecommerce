import { Leaf, Sparkles, Heart, Shield } from 'lucide-react';

const Ingredients = () => {
  const ingredients = [
    {
      name: 'Moringa',
      description:
        'Rich in vitamins A, C & E. Antioxidant. Boosts skin complexion, controls acne, removes patches and blisters.',
      benefits: [
        'Rich in vitamins A, C & E',
        'Antioxidant',
        'Boosts skin complexion',
        'Controls acne',
        'Removes patches and blisters',
      ],
      icon: Leaf,
      foundIn: [
        'Moringa Soap',
        'Moringa Shampoo',
        'Moringa Night Cream',
        'Moringa Day Cream',
      ],
    },
    {
      name: 'Cinnamon',
      description:
        'Anti-bacterial and anti-fungal. Reduces acne, eczema and other skin conditions. Anti-septic benefits.',
      benefits: [
        'Anti-bacterial',
        'Anti-fungal',
        'Reduces acne',
        'Reduces eczema',
        'Anti-septic',
      ],
      icon: Sparkles,
      foundIn: [
        'Cinnamon Soap',
        'Cinnamon Shampoo',
        'Cinnamon Conditioner',
        'Cinnamon Massage Oil',
      ],
    },
    {
      name: 'Lemongrass',
      description:
        'Anti-inflammatory. Reduces redness, inflammation, itching and swelling. Rich in antiseptic and astringent properties. Toned, glowing skin.',
      benefits: [
        'Anti-inflammatory',
        'Reduces redness',
        'Reduces inflammation',
        'Reduces itching',
        'Rich in antiseptic',
        'Astringent properties',
        'Toned glowing skin',
      ],
      icon: Heart,
      foundIn: [
        'Lemongrass Soap',
        'Lemongrass Shampoo',
        'Lemongrass Conditioner',
      ],
    },
    {
      name: 'Aloe Vera',
      description:
        'Deep moisturizing. Natural healing agent. Soothes irritated skin. Helps achieve infection-free healthy skin.',
      benefits: [
        'Deep moisturizing',
        'Natural healing agent',
        'Soothes irritated skin',
        'Infection-free healthy skin',
      ],
      icon: Shield,
      foundIn: [
        'Aloe Vera Soap',
        'Aloe Vera-Hibiscus Soap',
        'Multiple Shampoos',
      ],
    },
    {
      name: 'Neem (Kohomba)',
      description:
        'Antiseptic. Natural remedy for infections. Purifies skin and fights bacteria and fungi.',
      benefits: [
        'Antiseptic',
        'Natural remedy for infections',
        'Purifies skin',
        'Fights bacteria',
        'Fights fungi',
      ],
      icon: Leaf,
      foundIn: ['Neem Soap', 'Kohomba Soap', 'Puppy Shampoo'],
    },
    {
      name: 'Saffron (Crocus Sativus)',
      description:
        'Brightens skin, restores radiance. Rich in antioxidants. Anti-aging properties.',
      benefits: [
        'Brightens skin',
        'Restores radiance',
        'Rich in antioxidants',
        'Anti-aging',
      ],
      icon: Sparkles,
      foundIn: ['Saffron-Turmeric Shampoo', 'Saffron-Turmeric Day Cream'],
    },
    {
      name: 'Turmeric (Curcuma Longa)',
      description:
        'Anti-inflammatory. Brightening. Reduces dark spots and promotes even skin tone.',
      benefits: [
        'Anti-inflammatory',
        'Brightening',
        'Reduces dark spots',
        'Promotes even skin tone',
      ],
      icon: Heart,
      foundIn: ['Saffron-Turmeric Shampoo', 'Saffron-Turmeric Conditioner'],
    },
    {
      name: 'Gotukola',
      description:
        'Promotes collagen production. Speeds up wound healing. Reduces scarring.',
      benefits: [
        'Promotes collagen production',
        'Speeds up wound healing',
        'Reduces scarring',
      ],
      icon: Shield,
      foundIn: ['Selected formulations'],
    },
    {
      name: 'Cassia Alata (Atthora)',
      description:
        'Powerful antifungal. Traditional Ayurvedic herb for skin fungal conditions.',
      benefits: [
        'Powerful antifungal',
        'Traditional Ayurvedic herb',
        'Treats skin fungal conditions',
      ],
      icon: Leaf,
      foundIn: ['Cassia Alata Soap'],
    },
    {
      name: 'Soursop',
      description:
        'Rich in antioxidants and Vitamin C. Immune-boosting. Anti-aging skin benefits.',
      benefits: [
        'Rich in antioxidants',
        'Vitamin C',
        'Immune-boosting',
        'Anti-aging skin benefits',
      ],
      icon: Sparkles,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Avocado',
      description:
        'Deep nourishment from healthy fats. Restores skin elasticity and moisture.',
      benefits: ['Deep nourishment', 'Restores skin elasticity', 'Moisture'],
      icon: Heart,
      foundIn: ['Selected soaps'],
    },
    {
      name: 'Papaya',
      description:
        'Enzymatic exfoliation. Brightens skin. Removes dead skin cells naturally.',
      benefits: [
        'Enzymatic exfoliation',
        'Brightens skin',
        'Removes dead skin cells',
      ],
      icon: Shield,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Ginger',
      description:
        'Warming and circulation-boosting. Antiseptic. Traditional Ayurvedic healing herb.',
      benefits: [
        'Warming',
        'Circulation-boosting',
        'Antiseptic',
        'Traditional Ayurvedic healing',
      ],
      icon: Leaf,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Goraka',
      description:
        'Natural mild acid. Cleansing. Traditional Sri Lankan culinary and medicinal herb.',
      benefits: [
        'Mild acid',
        'Cleansing',
        'Traditional culinary herb',
        'Medicinal herb',
      ],
      icon: Sparkles,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Karawila (Bitter Melon)',
      description:
        'Blood purifying properties. Skin healing. Traditional Ayurvedic diabetes support.',
      benefits: [
        'Blood purifying',
        'Skin healing',
        'Ayurvedic diabetes support',
      ],
      icon: Heart,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Passion Fruit Leaf',
      description:
        'Rich in Vitamin C. Skin brightening. Calming and antioxidant-rich.',
      benefits: [
        'Rich in Vitamin C',
        'Skin brightening',
        'Calming',
        'Antioxidant-rich',
      ],
      icon: Shield,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Tulsi (Holy Basil)',
      description:
        'Adaptogenic. Stress relief. Anti bacterial. Purifies and refreshes skin.',
      benefits: [
        'Adaptogenic',
        'Stress relief',
        'Anti bacterial',
        'Purifies skin',
        'Refreshes skin',
      ],
      icon: Leaf,
      foundIn: ['Natural flavour range'],
    },
    {
      name: 'Shea Butter',
      description:
        'Ultra-deep hydration. Softens and smooths. Protects skin barrier. Rich in vitamins A & E.',
      benefits: [
        'Ultra-deep hydration',
        'Softens and smooths',
        'Protects skin barrier',
        'Rich in vitamins A & E',
      ],
      icon: Sparkles,
      foundIn: ['Shea Glow Soap'],
    },
    {
      name: 'Licorice Root',
      description:
        'Soothes inflammation. Brightens skin. Natural skin lightening agent.',
      benefits: [
        'Soothes inflammation',
        'Brightens skin',
        'Natural skin lightening',
      ],
      icon: Heart,
      foundIn: ['Licorice Soap', 'Licorice Night Cream'],
    },
    {
      name: 'Green Tea',
      description: 'Antioxidant-rich. Reduces redness. Anti-aging properties.',
      benefits: ['Antioxidant-rich', 'Reduces redness', 'Anti-aging'],
      icon: Shield,
      foundIn: ['Green Tea Shampoo', 'Green Tea Day Cream'],
    },
    {
      name: 'Sandalwood',
      description: 'Natural fragrance. Calming properties. Reduces acne.',
      benefits: ['Natural fragrance', 'Calming', 'Acne reduction'],
      icon: Leaf,
      foundIn: ['Sandalwood Soap', 'Sandalwood Shampoo'],
    },
    {
      name: 'Manjistha',
      description: 'Blood purifying. Treats skin conditions. Natural dye.',
      benefits: ['Blood purifying', 'Treats skin conditions', 'Natural dye'],
      icon: Shield,
      foundIn: ['Manjistha Soap', 'Manjistha Face Mask'],
    },
  ];

  return (
    <div className='min-h-screen py-12 px-4 bg-[#F5F1E8]/50'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-[#1F3D2B] mb-4'>
            Our Excellent Natural Flavour Range
          </h1>
          <p className='text-lg text-[#5A5A5A] max-w-2xl mx-auto'>
            We are a certified company with all international certifications. We
            source 18+ natural herbs and plants — all grown in Sri Lanka — to
            craft our products. Each ingredient is chosen for its proven health
            and skin benefits.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#E6D3B3]'
            >
              <div className='flex items-center mb-4'>
                <div className='p-3 bg-[#1F3D2B]/10 rounded-full mr-4'>
                  <ingredient.icon className='w-6 h-6 text-[#1F3D2B]' />
                </div>
                <h3 className='text-xl font-semibold text-[#1F3D2B]'>
                  {ingredient.name}
                </h3>
              </div>
              <p className='text-[#5A5A5A] mb-4'>{ingredient.description}</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {ingredient.benefits.map((benefit, idx) => (
                  <span
                    key={idx}
                    className='text-xs bg-[#E6D3B3] text-[#1F3D2B] px-3 py-1 rounded-full'
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <div className='text-sm text-[#5A5A5A]'>
                <strong>Found in:</strong> {ingredient.foundIn.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 bg-[#1F3D2B] text-white rounded-lg p-8 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Our Ingredient Philosophy</h2>
          <p className='text-lg max-w-3xl mx-auto'>
            Every ingredient in our products is sustainably sourced from local
            Sri Lankan farms. We never use synthetic chemicals, artificial
            preservatives, or harmful additives - only pure, natural ingredients
            that heal and nurture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
