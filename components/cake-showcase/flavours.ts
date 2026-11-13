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
    name: 'Birthday Cakes',
    shortName: 'Birthday Cakes',
    blurb: 'Artisanal birthday & milestone cakes baked fresh daily.',
    price: '₹599',
    image: '/hero-cakes/black-forest.jpg',
    slug: '/cakes?category=birthday-cakes',
    bg: '#E8B984',
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
    blurb: 'Belgian truffles, cheesecakes & handcrafted luxury slices.',
    price: '₹119',
    image: '/hero section/Cut inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    slug: '/pastries',
    bg: '#E8B984',
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
    shortName: 'Eggless Cakes',
    blurb: 'Certified pure vegetarian cakes from segregated ovens.',
    price: '₹649',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    slug: '/cakes?category=eggless-cakes',
    bg: '#E8B984',
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
    name: 'Wedding & Tiered Cakes',
    shortName: 'Wedding Cakes',
    blurb: 'Bespoke architectural multi-tier centerpieces with 24K gold foil.',
    price: '₹1,800',
    image: '/hero-cakes/vanilla-buttercream.jpg',
    slug: '/custom-cakes',
    bg: '#E8B984',
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
    blurb: 'Handcrafted dessert cups, Parisian macarons & rich brownies.',
    price: '₹139',
    image: '/hero-cakes/golden-lemon.jpg',
    slug: '/cakes?category=sweets-desserts',
    bg: '#E8B984',
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
    name: 'Red Velvet & Berry Cakes',
    shortName: 'Red Velvet Cakes',
    blurb: 'Crimson cocoa velvet sponge with Madagascar vanilla buttercream.',
    price: '₹679',
    image: '/hero-cakes/cherry-blush.jpg',
    slug: '/cakes?category=red-velvet',
    bg: '#E8B984',
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
  {
    name: 'Belgian Chocolate Truffle',
    shortName: 'Chocolate Truffle',
    blurb: 'Single-origin 70% Callebaut ganache with dark cocoa sponge.',
    price: '₹649',
    image: '/Cakes/cake.jpg',
    slug: '/cakes?category=chocolate-cakes',
    bg: '#E8B984',
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
    name: 'Custom Designer Cakes',
    shortName: 'Designer Cakes',
    blurb: 'Hand-sculpted bespoke celebration cakes made to your theme.',
    price: '₹899',
    image: '/Cakes/be4642911468d018066e50e8d9392619.jpg',
    slug: '/custom-cakes',
    bg: '#E8B984',
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
];

// Backwards-compatible export
export const FLAVOURS = CATEGORY_CAKES;

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);
