export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'HAIR CARE' | 'FACECREAMS';
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
