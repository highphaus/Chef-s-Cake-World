export type Layer = {
  name: string;
  fill: 'frost' | 'sponge' | 'fill' | string;
};

export type Flavour = {
  name: string;
  blurb: string;
  price: string;
  image?: string;
  slug?: string;
  bg: string;
  frost: string;
  sponge: string;
  fill: string;
  accent: string;
  layers: Layer[];
};

export const FLAVOURS: Flavour[] = [
  {
    name: 'Royal Belgian Chocolate Truffle',
    blurb:
      'Pure single-origin 70% Callebaut dark chocolate mirror ganache over moisture-rich Dutch cocoa sponge tiers.',
    price: '₹699',
    image: '/hero-cakes/black-forest.jpg',
    slug: 'royal-belgian-chocolate-truffle-cake',
    bg: '#3B1C15',
    frost: '#52261C',
    sponge: '#2E120B',
    fill: '#D49B42',
    accent: '#F4C95D',
    layers: [
      { name: '70% Callebaut Mirror Ganache', fill: '#52261C' },
      { name: 'Dutch Cocoa Base Sponge', fill: '#2E120B' },
      { name: 'Single-Origin Chocolate Truffle', fill: '#D49B42' },
      { name: 'Whipped Dairy Cream', fill: '#FFFFFF' },
      { name: 'Dutch Cocoa Sponge Tier', fill: '#2E120B' },
    ],
  },
  {
    name: 'Blush Cherry & Strawberry Swirl',
    blurb:
      'Cloud-soft Madagascar bourbon vanilla sponge folded with wild cherry coulis and fresh strawberry mascarpone cream.',
    price: '₹699',
    image: '/hero-cakes/cherry-blush.jpg',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    bg: '#831843',
    frost: '#FDE2E4',
    sponge: '#FFF1E6',
    fill: '#E11D48',
    accent: '#FB7185',
    layers: [
      { name: 'Blush Strawberry Buttercream', fill: '#FDE2E4' },
      { name: 'Madagascar Vanilla Sponge', fill: '#FFF1E6' },
      { name: 'Wild Cherry Coulis', fill: '#E11D48' },
      { name: 'Whipped Mascarpone Cream', fill: '#FFFFFF' },
      { name: 'Madagascar Vanilla Sponge', fill: '#FFF1E6' },
    ],
  },
  {
    name: 'Golden Meyer Lemon & Citrus Curd',
    blurb:
      'Zesty Meyer lemon sponge, hand-whipped tart citrus curd and sweet European cream, finished with edible 24K pearls.',
    price: '₹699',
    image: '/hero-cakes/golden-lemon.jpg',
    slug: 'exotic-fresh-seasonal-fruit-ambrosia',
    bg: '#78350F',
    frost: '#FEF08A',
    sponge: '#FFFBEB',
    fill: '#F59E0B',
    accent: '#FBBF24',
    layers: [
      { name: 'Lemon Buttercream & Pearls', fill: '#FEF08A' },
      { name: 'Meyer Lemon Sponge', fill: '#FFFBEB' },
      { name: 'Velvety Citrus Curd', fill: '#F59E0B' },
      { name: 'Whipped European Cream', fill: '#FFFFFF' },
      { name: 'Meyer Lemon Sponge', fill: '#FFFBEB' },
    ],
  },
  {
    name: 'Madagascar Vanilla Bean Velvet',
    blurb:
      'Feather-light golden sponge infused with whole bourbon vanilla caviar, Swiss meringue buttercream and white chocolate.',
    price: '₹649',
    image: '/hero-cakes/vanilla-buttercream.jpg',
    slug: 'grand-tiered-golden-wedding-masterpiece',
    bg: '#582F0E',
    frost: '#FFFDF7',
    sponge: '#FAF0CA',
    fill: '#D4B46A',
    accent: '#D49B42',
    layers: [
      { name: 'Swiss Meringue Buttercream', fill: '#FFFDF7' },
      { name: 'Bourbon Vanilla Bean Sponge', fill: '#FAF0CA' },
      { name: 'White Chocolate Truffle', fill: '#D4B46A' },
      { name: 'Whipped Dairy Crème', fill: '#FFFFFF' },
      { name: 'Bourbon Vanilla Sponge', fill: '#FAF0CA' },
    ],
  },
  {
    name: 'Pure Eggless Red Velvet Luxe',
    blurb:
      '100% certified vegetarian crimson cocoa sponge with velvety Philadelphia cream cheese frosting and bourbon reduction.',
    price: '₹749',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    bg: '#881337',
    frost: '#FFF1F2',
    sponge: '#BE123C',
    fill: '#F43F5E',
    accent: '#10B981',
    layers: [
      { name: 'Cream Cheese Frosting', fill: '#FFF1F2' },
      { name: 'Crimson Cocoa Sponge (Eggless)', fill: '#BE123C' },
      { name: 'Madagascar Bourbon Coulis', fill: '#F43F5E' },
      { name: 'Sweet Velvet Whipped Cream', fill: '#FFFFFF' },
      { name: 'Crimson Cocoa Sponge (Eggless)', fill: '#BE123C' },
    ],
  },
];

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);
