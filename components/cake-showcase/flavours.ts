export type Layer = {
  name: string;
  fill: 'frost' | 'sponge' | 'fill' | string;
};

export type CategoryCake = {
  name: string;
  shortName: string;
  blurb: string;
  price: string;
  image: string;
  slug: string;
  bg: string;
  frost: string;
  sponge: string;
  fill: string;
  accent: string;
  layers: Layer[];
};

// Backwards-compatible type alias
export type Flavour = CategoryCake;

export const CATEGORY_CAKES: CategoryCake[] = [
  {
    name: 'Birthday Favorites',
    shortName: 'Birthday Cakes',
    blurb: 'Artisanal birthday & milestone cakes baked fresh daily.',
    price: '₹599',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    slug: '/cakes?category=birthday-cakes',
    bg: '#FAF8F5',
    frost: '#52261C',
    sponge: '#2E120B',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: 'Single-Origin 70% Callebaut Dark Ganache', fill: '#52261C' },
      { name: 'Dutch Cocoa Rich Base Sponge', fill: '#2E120B' },
      { name: 'Whipped Madagascar Vanilla Cream', fill: '#FFFFFF' },
      { name: 'Handcrafted Chocolate Art Shavings', fill: '#E8B984' },
      { name: 'Fresh Daily Bake Guarantee', fill: '#2E120B' },
    ],
  },
  {
    name: 'Belgian Couverture',
    shortName: 'Belgian Chocolate',
    blurb: 'Single-origin 70% Callebaut ganache with dark cocoa sponge.',
    price: '₹649',
    image: '/Cakes/cake.jpg',
    slug: '/cakes?category=chocolate-cakes',
    bg: '#FAF8F5',
    frost: '#3B1C15',
    sponge: '#2B1030',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: '70% Callebaut Dark Ganache', fill: '#3B1C15' },
      { name: 'Dutch Cocoa Rich Sponge', fill: '#2B1030' },
      { name: 'Silky Chocolate Truffle Cream', fill: '#52261C' },
      { name: 'Handcrafted Dark Shavings', fill: '#E8B984' },
      { name: 'Fresh Daily Bake Guarantee', fill: '#2B1030' },
    ],
  },
  {
    name: 'Artisan Pastries',
    shortName: 'Pastries',
    blurb: 'Belgian truffles, cheesecakes & handcrafted luxury slices.',
    price: '₹119',
    image: '/Cakes/38499c1ae99d95bfe134d660e4c5d6ea.jpg',
    slug: '/pastries',
    bg: '#FAF8F5',
    frost: '#FDE2E4',
    sponge: '#FFF1E6',
    fill: '#E11D48',
    accent: '#E8B984',
    layers: [
      { name: '70% Callebaut Belgian Chocolate Ganache', fill: '#52261C' },
      { name: 'Philadelphia Whipped Cream Cheese', fill: '#FDE2E4' },
      { name: 'French Wild Blueberry & Cherry Coulis', fill: '#E11D48' },
      { name: 'Caramelized Speculoos Cinnamon Crumb', fill: '#E8B984' },
      { name: 'Individual Luxe Protective Box', fill: '#FFFFFF' },
    ],
  },
  {
    name: 'Pure Eggless Cakes',
    shortName: 'Eggless Cakes',
    blurb: 'Certified pure vegetarian cakes from segregated ovens.',
    price: '₹649',
    image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg',
    slug: '/cakes?category=eggless-cakes',
    bg: '#FAF8F5',
    frost: '#FFF1F2',
    sponge: '#BE123C',
    fill: '#F43F5E',
    accent: '#E8B984',
    layers: [
      { name: 'Dedicated Segregated Pure Veg Oven', fill: '#10B981' },
      { name: 'Cloud-Soft Crimson Velvet Sponge', fill: '#BE123C' },
      { name: 'Madagascar Bourbon Vanilla Cream', fill: '#FFF1F2' },
      { name: 'Wild Cherry & Seasonal Fruit Coulis', fill: '#F43F5E' },
      { name: 'Certified Pure Vegetarian Seal', fill: '#10B981' },
    ],
  },
  {
    name: 'Wedding Atelier',
    shortName: 'Wedding Cakes',
    blurb: 'Bespoke architectural multi-tier centerpieces with 24K gold foil.',
    price: '₹1,800',
    image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg',
    slug: '/custom-cakes',
    bg: '#FAF8F5',
    frost: '#FFFDF7',
    sponge: '#FAF0CA',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: 'Architectural Multi-Tier Framework', fill: '#582F0E' },
      { name: 'Edible 24K Pure Gold Leafing', fill: '#E8B984' },
      { name: 'Handcrafted Sculpted Sugar Peonies', fill: '#FFFDF7' },
      { name: 'Custom Flavour Pairings per Tier', fill: '#FAF0CA' },
      { name: 'Chilled Temperature-Controlled Delivery', fill: '#E8B984' },
    ],
  },
  {
    name: 'Sweets & Desserts',
    shortName: 'Sweets & Desserts',
    blurb: 'Handcrafted dessert cups, Parisian macarons & rich brownies.',
    price: '₹139',
    image: '/Cakes/b3392f499749364b011f93c6634cf890.jpg',
    slug: '/cakes?category=sweets-desserts',
    bg: '#FAF8F5',
    frost: '#FEF08A',
    sponge: '#FFFBEB',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: 'Parisian Almond Meringue Shells', fill: '#FEF08A' },
      { name: 'Pure Saffron Rabdi & Cardamom Ganache', fill: '#E8B984' },
      { name: 'Valrhona Chocolate Fudge Brownie', fill: '#78350F' },
      { name: 'California Roasted Pistachio Slivers', fill: '#10B981' },
      { name: 'Luxe Gold Foil Gift Packaging', fill: '#E8B984' },
    ],
  },
  {
    name: 'Bespoke Custom Cakes',
    shortName: 'Custom Cakes',
    blurb: 'Hand-sculpted bespoke celebration cakes made to your theme.',
    price: '₹899',
    image: '/Cakes/3b109e1a28abe394a7b3a23ecf94450b.jpg',
    slug: '/custom-cakes',
    bg: '#FAF8F5',
    frost: '#FAF0CA',
    sponge: '#582F0E',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: 'Bespoke Architectural Structure', fill: '#582F0E' },
      { name: 'Handcrafted Fondant Artistry', fill: '#FAF0CA' },
      { name: 'Custom Layer Pairing Choices', fill: '#E8B984' },
      { name: 'Edible 24K Gold Detailing', fill: '#E8B984' },
      { name: 'White-Glove Delivery Hand-off', fill: '#582F0E' },
    ],
  },
  {
    name: 'Anniversary Luxe',
    shortName: 'Anniversary Cakes',
    blurb: 'Romantic heart-shaped & floral centerpieces for milestone celebrations.',
    price: '₹749',
    image: '/Cakes/2bb7cee4f7aea565457d0eec341cb3d7.jpg',
    slug: '/cakes?category=anniversary-cakes',
    bg: '#FAF8F5',
    frost: '#FFF1F2',
    sponge: '#BE123C',
    fill: '#E8B984',
    accent: '#E8B984',
    layers: [
      { name: 'Red Velvet Delicate Crumb', fill: '#BE123C' },
      { name: 'Philadelphia Cream Cheese Mousse', fill: '#FFF1F2' },
      { name: 'Wild Raspberry Coulis', fill: '#E11D48' },
      { name: 'Edible Gold Shimmer Dust', fill: '#E8B984' },
      { name: 'Velvet Soft Texture Guarantee', fill: '#BE123C' },
    ],
  },
];

// Backwards-compatible export
export const FLAVOURS = CATEGORY_CAKES;

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);
