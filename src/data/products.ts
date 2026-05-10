export interface Product {
  id: string;
  name: string;
  price: number;
  category:
    | 'HAIR CARE'
    | 'FACECREAMS'
    | 'SOAPS'
    | 'BODY CARE'
    | 'PET CARE'
    | 'MASSAGE OILS'
    | 'GIFT PACKS'
    | 'FOOD SUPPLEMENTS';
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // HAIR CARE
  {
    id: 'e1',
    name: 'cinnamon castile soap',
    price: 390,
    category: 'HAIR CARE',
    image: '/assets/cinnamon castile soap.png',
    description:
      'Medicinal Healthy Bar — Anti-bacterial, anti-fungal. Reduces acne, eczema, anti-septic',
    featured: true,
  },
  {
    id: 'e2',
    name: 'cinnamon hair conditioner',
    price: 890,
    category: 'HAIR CARE',
    image: '/assets/cinnamon hair conditioner.png',
    description:
      '250ml — Cinnamon extract, Hydrolyzed keratin, Rosemary oil. Repairs and conditions.',
    featured: true,
  },
  {
    id: 'e3',
    name: 'cinnamon shampoo',
    price: 890,
    category: 'HAIR CARE',
    image: '/assets/cinnamon shampoo.png',
    description:
      '250ml — Aloe vera gel, Cinnamon extract, Vitamin E, Tea Tree Oil. Nourishes & strengthens hair. ',
  },
  {
    id: 'e4',
    name: 'Dog natral shampoo',
    price: 650,
    category: 'HAIR CARE',
    image: '/assets/Doggy shampoo with magosa.JPG',
    description: 'Supports skin, coat, and overall health',
  },
  {
    id: 'e5',
    name: 'Doggy soap',
    price: 650,
    category: 'HAIR CARE',
    image: '/assets/Doggy soap.JPG',
    description:
      '100g — 90% plant oils. Keeps dogs healthy, cleansed, nourished. Fleas away. Great aroma. ',
  },
  {
    id: 'e6',
    name: 'Lemon hair conditioner',
    price: 890,
    category: 'HAIR CARE',
    image: '/assets/Lemon hair conditioner.png',
    description:
      '250ml — Lemongrass essential oil, Rosemary oil.Controls oil, conditions deeply.',
  },

  // FACECREAMS
  {
    id: 'c1',
    name: 'lemongrass castile soap',
    price: 360,
    category: 'FACECREAMS',
    image: '/assets/lemongrass castile soap.png',
    description:
      'Wellness Bar — Anti-inflammatory. Reduces redness,itching. Soft, toned, glowing skin',
    featured: true,
  },
  {
    id: 'c2',
    name: 'lemongrass shampoo',
    price: 890,
    category: 'FACECREAMS',
    image: '/assets/lemongrass shampoo.png',
    description:
      '250ml — Lemongrass extract, Vitamin E, Tea Tree Oil.Refreshes scalp, promotes hair growth.',
    featured: true,
  },
  {
    id: 'c3',
    name: 'Moringa Night Cream ',
    price: 1450,
    category: 'FACECREAMS',
    image: '/assets/Morin Night Cream .jpeg',
    description:
      '50g — Moringa seed oil. Lightly scented. Anti-aging.Reduces wrinkles while you sleep.',
  },
  {
    id: 'c4',
    name: 'Moringa Day cream ',
    price: 1380,
    category: 'FACECREAMS',
    image: '/assets/Moringa Day cream .jpg',
    description:
      '50g — Moringa seed oil, Rose hip oil. Restores skin moisture, firmness and elasticity',
  },

  {
    id: 'c6',
    name: 'moringa hair conditioner',
    price: 950,
    category: 'FACECREAMS',
    image: '/assets/moringa hair conditioner.png',
    description:
      '250ml — Moringa leaf extract, Rosemary, Xanthan gum,Hydrolyzed keratin. ',
  },
  {
    id: 'c7',
    name: 'moringa liquid soap',
    price: 380,
    category: 'FACECREAMS',
    image: '/assets/moringa liquid soap.png',
    description:
      'Nourishing Bar — Controls acne, increases skin complexion and smoothness, removes patches.',
  },
  {
    id: 'c8',
    name: 'moringa shampoo',
    price: 950,
    category: 'FACECREAMS',
    image: '/assets/moringa shampoo.png',
    description:
      '250ml — Moringa leaf extract, Lavender, Tea tree oil.Deep nourishment and shine.',
  },
  {
    id: 'c9',
    name: 'Neem',
    price: 370,
    category: 'FACECREAMS',
    image: '/assets/Neem.png',
    description:
      'Antiseptic Bar — Natural remedy for infection-free healthy skin. Gentle and purifying. ',
  },
  {
    id: 'c10',
    name: 'Saffran hair conditioner',
    price: 950,
    category: 'FACECREAMS',
    image: '/assets/Saffran hair conditioner.png',
    description:
      '250ml — Saffron, Rosemary & Helichrysum oil. Strengthens and adds shine. ',
  },
  {
    id: 'c11',
    name: 'Saffran shampoo',
    price: 950,
    category: 'FACECREAMS',
    image: '/assets/Saffran shampoo.png',
    description:
      '250ml — Turmeric extract, Saffron oil, Cherry blossom oil. Brightening hair care. ',
  },

  // SOAPS
  {
    id: 's1',
    name: 'Neem Soap',
    price: 350,
    category: 'SOAPS',
    image: '/assets/Neem.png',
    description: '100% natural herbal soap with essential oils',
    featured: true,
  },
  {
    id: 's2',
    name: 'Moringa Soap',
    price: 380,
    category: 'SOAPS',
    image: '/assets/moringa.png',
    description: 'Soothing aloe vera soap for sensitive skin',
  },
  {
    id: 's3',
    name: 'Lemongrass Soap',
    price: 370,
    category: 'SOAPS',
    image: '/assets/lemongrass.png',
    description: 'Antiseptic neem soap for acne-prone skin',
  },
  {
    id: 's4',
    name: 'Aloevera Soap',
    price: 390,
    category: 'SOAPS',
    image: '/assets/aloevera.png',
    description: 'Brightening turmeric soap for glowing skin',
  },
  {
    id: 's5',
    name: 'Cassia Alata Soap',
    price: 390,
    category: 'SOAPS',
    image: '/assets/cassia alata.png',
    description: 'Brightening turmeric soap for glowing skin',
  },
  {
    id: 's6',
    name: 'Goat Milk Soap',
    price: 390,
    category: 'SOAPS',
    image: '/assets/Goat milk.png',
    description: 'Brightening turmeric soap for glowing skin',
  },
  {
    id: 's7',
    name: 'Cinnamon Soap',
    price: 390,
    category: 'SOAPS',
    image: '/assets/Cinnamon.png',
    description: 'Brightening turmeric soap for glowing skin',
  },
  {
    id: 's8',
    name: 'Activated Charcoal Soap',
    price: 390,
    category: 'SOAPS',
    image: '/assets/activated charcoal.png',
    description: 'Brightening turmeric soap for glowing skin',
  },

  // BODY CARE
  {
    id: 'b1',
    name: 'Body Lotion',
    price: 450,
    category: 'BODY CARE',
    image: '/assets/body-lotion.png',
    description: 'Moisturizing body lotion with natural ingredients',
    featured: true,
  },
  {
    id: 'b2',
    name: 'Body Wash',
    price: 420,
    category: 'BODY CARE',
    image: '/assets/body-wash.png',
    description: 'Gentle body wash for all skin types',
  },
  {
    id: 'b3',
    name: 'Body Scrub',
    price: 480,
    category: 'BODY CARE',
    image: '/assets/body-scrub.png',
    description: 'Exfoliating body scrub with natural extracts',
  },
  {
    id: 'b4',
    name: 'Hand Cream',
    price: 320,
    category: 'BODY CARE',
    image: '/assets/hand-cream.png',
    description: 'Nourishing hand cream with vitamin E',
  },

  // PET CARE
  {
    id: 'p1',
    name: 'Pet Shampoo',
    price: 650,
    category: 'PET CARE',
    image: '/assets/pet-shampoo.png',
    description: 'Gentle shampoo for pets with natural ingredients',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Pet Conditioner',
    price: 720,
    category: 'PET CARE',
    image: '/assets/pet-conditioner.png',
    description: 'Moisturizing conditioner for pet coats',
  },
  {
    id: 'p3',
    name: 'Pet Wipes',
    price: 180,
    category: 'PET CARE',
    image: '/assets/pet-wipes.png',
    description: 'Convenient wipes for pet cleaning',
  },
  {
    id: 'p4',
    name: 'Pet Toothpaste',
    price: 250,
    category: 'PET CARE',
    image: '/assets/pet-toothpaste.png',
    description: 'Natural toothpaste for pet dental care',
  },

  // MASSAGE OILS
  {
    id: 'm1',
    name: 'Massage Oil',
    price: 850,
    category: 'MASSAGE OILS',
    image: '/assets/massage-oil.png',
    description: 'Relaxing massage oil with essential oils',
    featured: true,
  },
  {
    id: 'm2',
    name: 'Aromatherapy Oil',
    price: 950,
    category: 'MASSAGE OILS',
    image: '/assets/aromatherapy-oil.png',
    description: 'Therapeutic aromatherapy massage oil',
  },
  {
    id: 'm3',
    name: 'Herbal Massage Oil',
    price: 780,
    category: 'MASSAGE OILS',
    image: '/assets/herbal-massage-oil.png',
    description: 'Traditional herbal massage oil',
  },
  {
    id: 'm4',
    name: 'Cooling Massage Oil',
    price: 820,
    category: 'MASSAGE OILS',
    image: '/assets/cooling-massage-oil.png',
    description: 'Cooling massage oil for muscle relief',
  },

  // GIFT PACKS
  {
    id: 'g1',
    name: 'Gift Pack 1',
    price: 1200,
    category: 'GIFT PACKS',
    image: '/assets/gift-pack-1.png',
    description: 'Premium gift pack with assorted herbal products',
    featured: true,
  },
  {
    id: 'g2',
    name: 'Gift Pack 2',
    price: 1500,
    category: 'GIFT PACKS',
    image: '/assets/gift-pack-2.png',
    description: 'Deluxe gift pack with premium items',
  },
  {
    id: 'g3',
    name: 'Gift Pack 3',
    price: 900,
    category: 'GIFT PACKS',
    image: '/assets/gift-pack-3.png',
    description: 'Budget-friendly gift pack',
  },
  {
    id: 'g4',
    name: 'Gift Pack 4',
    price: 1800,
    category: 'GIFT PACKS',
    image: '/assets/gift-pack-4.png',
    description: 'Luxury gift pack with exclusive products',
  },

  // FOOD SUPPLEMENTS
  {
    id: 'f1',
    name: 'Herbal Supplement',
    price: 650,
    category: 'FOOD SUPPLEMENTS',
    image: '/assets/herbal-supplement.png',
    description: 'Natural herbal supplement for wellness',
    featured: true,
  },
  {
    id: 'f2',
    name: 'Vitamin C',
    price: 450,
    category: 'FOOD SUPPLEMENTS',
    image: '/assets/vitamin-c.png',
    description: 'High-quality vitamin C supplement',
  },
  {
    id: 'f3',
    name: 'Multivitamin',
    price: 550,
    category: 'FOOD SUPPLEMENTS',
    image: '/assets/multivitamin.png',
    description: 'Complete multivitamin supplement',
  },
  {
    id: 'f4',
    name: 'Probiotics',
    price: 720,
    category: 'FOOD SUPPLEMENTS',
    image: '/assets/probiotics.png',
    description: 'Natural probiotics for digestive health',
  },
  // {
  //   id: 'c12',
  //   name: 'Beef XP',
  //   price: 26900,
  //   category: 'gym',
  //   image: '/assets/beef-xp.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c13',
  //   name: 'CC CLA',
  //   price: 8600,
  //   category: 'gym',
  //   image: '/assets/CC-CLA.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c14',
  //   name: 'CC Joint Support',
  //   price: 6900,
  //   category: 'gym',
  //   image: '/assets/cc-jointsupport.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c15',
  //   name: 'Applied Vitamin D3',
  //   price: 6900,
  //   category: 'gym',
  //   image: '/assets/appliedvitamin-d3.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c16',
  //   name: 'Dexter L Carnitine',
  //   price: 9000,
  //   category: 'gym',
  //   image: '/assets/dexter-l-carnitine.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c17',
  //   name: 'Gold Creatine',
  //   price: 8000,
  //   category: 'gym',
  //   image: '/assets/gold-creatine.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
  // {
  //   id: 'c18',
  //   name: 'Applied Flvaoured Creatine',
  //   price: 8800,
  //   category: 'gym',
  //   image: '/assets/applied-flavoured-creatine.jpg',
  //   description: 'Relaxation and wellness with natural oils',
  // },
];
