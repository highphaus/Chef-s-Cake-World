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
    name: 'Celebration Cakes',
    shortName: 'Celebration',
    blurb:
      'Multi-layered artisanal birthday, anniversary & milestone cakes baked fresh daily with single-origin Callebaut chocolate and fresh velvet cream.',
    price: '₹599',
    image: '/hero-cakes/black-forest.jpg',
    slug: '/cakes',
    bg: '#3B1C15',
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
    name: 'Artisan Pastries',
    shortName: 'Pastries',
    blurb:
      'Individual handcrafted luxury pastry slices and assorted gift boxes. Perfectly portioned Belgian truffles, cheesecakes, and Lotus Biscoff gateaux.',
    price: '₹119',
    image: '/hero section/Cut inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    slug: '/pastries',
    bg: '#831843',
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
    name: '100% Pure Eggless Cakes',
    shortName: '100% Eggless',
    blurb:
      'Certified pure vegetarian cake atelier with dedicated segregated ovens across Kerala hubs. Unrivalled cloud-like moisture and depth of flavour.',
    price: '₹649',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    slug: '/cakes?category=eggless-cakes',
    bg: '#881337',
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
    name: 'Wedding & Tiered Masterpieces',
    shortName: 'Wedding Masterpieces',
    blurb:
      'Bespoke multi-tier architectural centerpieces finished with edible 24K gold foil, handcrafted sugar florals, and private design consultation.',
    price: '₹1,800',
    image: '/hero-cakes/vanilla-buttercream.jpg',
    slug: '/custom-cakes',
    bg: '#582F0E',
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
    name: 'Gourmet Sweets & Desserts',
    shortName: 'Sweets & Desserts',
    blurb:
      'Handcrafted fusion dessert cups, Parisian macarons, rich chocolate brownies, and festive gift boxes prepared fresh with authentic ingredients.',
    price: '₹139',
    image: '/hero-cakes/golden-lemon.jpg',
    slug: '/cakes?category=sweets-desserts',
    bg: '#78350F',
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
];

// Backwards-compatible export
export const FLAVOURS = CATEGORY_CAKES;

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);
