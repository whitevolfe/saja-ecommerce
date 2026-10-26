export interface Product {
  id: string;
  name: string;
  price: number;
  category:
    | 'CONDITIONER'
    | 'FACECREAMS'
    | 'SOAP'
    | 'LIQUID SOAP'
    | 'SHAMPOO'
    | 'DOGGY PRODUCTS'
    | 'MASSAGE OILS';
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // HAIR CARE
  {
    id: 'e1',
    name: 'cinnamon castile soap',
    price: 1750,
    category: 'LIQUID SOAP',
    image: '/assets/cinnamon castile soap.png',
    description:
      'Medicinal Healthy Bar — Anti-bacterial, anti-fungal. Reduces acne, eczema, anti-septic',
    featured: true,
  },
  {
    id: 'e2',
    name: 'cinnamon hair conditioner',
    price: 1850,
    category: 'CONDITIONER',
    image: '/assets/cinnamon hair conditioner.png',
    description:
      '185ml — Cinnamon extract, Hydrolyzed keratin, Rosemary oil. Repairs and conditions.',
    featured: true,
  },
  {
    id: 'e3',
    name: 'cinnamon shampoo',
    price: 1950,
    category: 'SHAMPOO',
    image: '/assets/cinnamon shampoo.png',
    description:
      '185ml — Aloe vera gel, Cinnamon extract, Vitamin E, Tea Tree Oil. Nourishes & strengthens hair. ',
  },
  {
    id: 'e5',
    name: 'Doggy soap',
    price: 1000,
    category: 'DOGGY PRODUCTS',
    image: '/assets/Doggy soap.JPG',
    description:
      '100g — 90% plant oils. Keeps dogs healthy, cleansed, nourished. Fleas away. Great aroma. ',
  },
  {
    id: 'e4',
    name: 'Dog natral shampoo',
    price: 1850,
    category: 'DOGGY PRODUCTS',
    image: '/assets/Doggy shampoo with magosa.JPG',
    description: 'Supports skin, coat, and overall health',
  },

  {
    id: 'e6',
    name: 'Lemon hair conditioner',
    price: 1850,
    category: 'CONDITIONER',
    image: '/assets/Lemon hair conditioner.png',
    description:
      '185ml — Lemongrass essential oil, Rosemary oil.Controls oil, conditions deeply.',
  },

  // FACECREAMS
  {
    id: 'c1',
    name: 'lemongrass castile soap',
    price: 1750,
    category: 'LIQUID SOAP',
    image: '/assets/lemongrass castile soap.png',
    description:
      'Wellness Bar — Anti-inflammatory. Reduces redness,itching. Soft, toned, glowing skin',
    featured: true,
  },
  {
    id: 'c2',
    name: 'lemongrass shampoo',
    price: 1950,
    category: 'SHAMPOO',
    image: '/assets/lemongrass shampoo.png',
    description:
      '185ml — Lemongrass extract, Vitamin E, Tea Tree Oil.Refreshes scalp, promotes hair growth.',
    featured: true,
  },
  {
    id: 'c3',
    name: 'Moringa Night Cream ',
    price: 2750,
    category: 'FACECREAMS',
    image: '/assets/Morin Night Cream .jpeg',
    description:
      '50g — Moringa seed oil. Lightly scented. Anti-aging.Reduces wrinkles while you sleep.',
  },
  {
    id: 'c4',
    name: 'Moringa Day cream ',
    price: 2750,
    category: 'FACECREAMS',
    image: '/assets/Moringa Day cream .jpg',
    description:
      '50g — Moringa seed oil, Rose hip oil. Restores skin moisture, firmness and elasticity',
  },

  {
    id: 'c6',
    name: 'moringa hair conditioner',
    price: 1850,
    category: 'CONDITIONER',
    image: '/assets/moringa hair conditioner.png',
    description:
      '185ml — Moringa leaf extract, Rosemary, Xanthan gum,Hydrolyzed keratin. ',
  },
  {
    id: 'c7',
    name: 'moringa liquid soap',
    price: 1750,
    category: 'LIQUID SOAP',
    image: '/assets/moringa liquid soap.png',
    description:
      'Nourishing Bar — Controls acne, increases skin complexion and smoothness, removes patches.',
  },
  {
    id: 'c8',
    name: 'moringa shampoo',
    price: 1950,
    category: 'SHAMPOO',
    image: '/assets/moringa shampoo.png',
    description:
      '185ml — Moringa leaf extract, Lavender, Tea tree oil.Deep nourishment and shine.',
  },
  {
    id: 'c9',
    name: 'Neem',
    price: 1000,
    category: 'SOAP',
    image: '/assets/Neem.png',

    description:
      'Discover refreshing botanical cleansing with the Neem Antiseptic Bar. Enriched with neem, also known as Kohomba, and essential oils, this handmade soap helps remove everyday dirt and excess oil from the skin. Suitable for a regular cleansing routine, it leaves your skin feeling clean and refreshed while bringing the traditional appeal of neem-based skincare to your daily bath.',
  },
  {
    id: 'c10',
    name: 'Saffran hair conditioner',
    price: 1850,
    category: 'CONDITIONER',
    image: '/assets/Saffran hair conditioner.png',
    description:
      '185ml — Saffron, Rosemary & Helichrysum oil. Strengthens and adds shine. ',
  },
  {
    id: 'c11',
    name: 'Saffran shampoo',
    price: 1950,
    category: 'SHAMPOO',
    image: '/assets/Saffran shampoo.png',
    description:
      '185ml — Turmeric extract, Saffron oil, Cherry blossom oil. Brightening hair care. ',
  },

  // SOAPS
  // {
  //   id: 's1',
  //   name: 'Neem Soap',
  //   price: 1750,
  //   category: 'SOAPS',
  //   image: '/assets/Neem.png',
  //   description: '100% natural herbal soap with essential oils',
  //   featured: true,
  // },
  {
    id: 's2',
    name: 'Moringa Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/moringa.png',

    description:
      'Nourish your daily skincare routine with the Moringa Nourishing Bar. Enriched with moringa leaf extract, moringa leaf powder, and lavender essential oil, this glycerine soap gently cleanses the skin while helping maintain moisture. Enjoy a refreshing wash that leaves your skin feeling soft, smooth, and revitalized, complemented by the calming aroma of lavender.',
  },
  {
    id: 's3',
    name: 'Lemongrass Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/lemongrass.png',

    description:
      'Revitalize your bathing routine with the Lemongrass Wellness Bar, scented with refreshing lemongrass essential oil. This handmade cleansing soap helps remove everyday impurities while leaving the skin feeling clean and refreshed. Its fresh citrus aroma creates an uplifting bathing experience, making it an excellent choice for anyone who enjoys botanical-inspired skincare products.',
  },
  {
    id: 's4',
    name: 'Aloevera Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/aloevera.png',

    description:
      'Keep your skin feeling soft and refreshed with the Aloe Vera Moisturizing Bar. Enriched with aloe vera, also known as Komarika, and essential oils, this cleansing bar helps remove everyday impurities while maintaining skin moisture. Its gentle formula makes it a suitable choice for daily cleansing, leaving your skin feeling clean, smooth, and hydrated.',
  },
  {
    id: 's5',
    name: 'Cassia Alata Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/cassia alata.png',

    description:
      'Discover botanical-inspired cleansing with the Cassia Alata (Aththora) Antifungal Bar. Enriched with cassia alata, clove, ginger, and essential oils, this handmade soap is designed to cleanse the skin and remove everyday dirt and impurities. Its refreshing formula helps leave your skin feeling clean and comfortable, making it a distinctive addition to your regular skincare routine.',
  },
  {
    id: 's6',
    name: 'Goat Milk Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/Goat milk.png',

    description:
      'Treat your skin to gentle cleansing with the Goat Milk Beauty Bar. Enriched with goat milk and essential oils, this cleansing bar helps remove dirt and everyday impurities while maintaining skin moisture. Its skin-softening formula is ideal for those looking for a nourishing addition to their daily bathing routine, leaving the skin feeling smooth, clean, and refreshed.',
  },
  {
    id: 's7',
    name: 'Cinnamon Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/Cinnamon.png',

    description:
      'Add a touch of warmth to your daily skincare routine with the Cinnamon Medicinal Healthy Bar. Infused with cinnamon bark oil and glycerine, this handmade soap gently cleanses the skin while providing a refreshing cinnamon fragrance. Its cleansing formula helps remove everyday dirt and impurities, leaving your skin feeling clean, soft, and refreshed.',
  },
  {
    id: 's8',
    name: 'Activated Charcoal Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/activated charcoal.png',

    description:
      'Experience a refreshing cleanse with the Activated Charcoal and Tea Tree Oil Detox Bar. Formulated with activated charcoal and tea tree oil, this handmade cleansing bar helps remove dirt, impurities, and excess oil from the skin. Its cleansing formula leaves your skin feeling fresh, clean, and smooth, making it a great addition to your daily skincare routine.',
  },
  {
    id: 's9',
    name: 'Activated Charcoal sulfate free Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/activated charcoal salfatefree.png',
    description: 'Brightening turmeric soap for glowing skin',
  },
  {
    id: 's10',
    name: 'Shea glow Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/shea glow.png',

    description:
      'Give your skin a touch of everyday luxury with the Shea Glow Beauty Bar. Enriched with shea butter and skin-loving natural oils, this cleansing bar helps moisturize and soften the skin while gently removing everyday impurities. Its creamy lather leaves your skin feeling smooth, nourished, and refreshed, making it a wonderful addition to your daily skincare routine.',
  },
  {
    id: 's11',
    name: 'aloevera hibiscus Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/aloevera hibiscus.png',

    description:
      'Enjoy gentle cleansing and everyday moisture with the Aloe Vera and Hibiscus Moisturizing Bar. This sulfate-free soap combines aloe vera and hibiscus to help cleanse the skin without stripping away its natural oils. Ideal for those seeking a refreshing skincare routine, it leaves the skin feeling soft, smooth, and moisturized after every wash.',
  },
  {
    id: 's12',
    name: 'moringa & lavender Soap',
    price: 1000,
    category: 'SOAP',
    image: '/assets/moringa & lavender.png',

    description:
      'Experience a refreshing and nourishing cleanse with the Moringa and Lavender Nourishing Bar. This sulfate-free soap combines moringa with the soothing fragrance of lavender to create a pleasant daily bathing experience. Its cleansing formula helps remove impurities while maintaining skin moisture, leaving your skin feeling soft, smooth, and refreshed with a delicate floral aroma.',
  },

  {
    id: 'm1',
    name: 'cinnamon body massage oil',
    price: 2950,
    category: 'MASSAGE OILS',
    image: '/assets/cinnamon body massage oil.png',
    description: 'Cooling massage oil for muscle relief',
    featured: true,
  },
  {
    id: 'm2',
    name: 'relaxa body massage oil',
    price: 2950,
    category: 'MASSAGE OILS',
    image: '/assets/relaxa body massage oil.png',
    description: 'Relaxing massage oil for stress relief',
  },
];
