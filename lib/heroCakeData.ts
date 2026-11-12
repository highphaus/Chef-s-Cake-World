export type HeroCakeLayer = {
  name: string;
  fill: 'frost' | 'sponge' | 'fill' | string;
};

export type HeroCakeFlavour = {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  priceNum: number;
  price: string;
  tag: string;
  image: string;
  bg: string;
  frost: string;
  sponge: string;
  fill: string;
  accent: string;
  centerText: string;
  layers: HeroCakeLayer[];
};

export const LAYER_HEIGHTS = [18, 26, 9, 18, 26];

export const HERO_FLAVOURS: HeroCakeFlavour[] = [
  {
    id: 'black-forest',
    name: 'German Black Forest Gateau',
    shortName: 'Black Forest',
    slug: 'classic-black-forest-cherry-royale',
    priceNum: 599,
    price: '₹599',
    tag: 'Dark Chocolate Shavings & Morello Cherries',
    image: '/hero-cakes/black-forest.jpg',
    bg: '#3B1C15',
    frost: '#52261C',
    sponge: '#2E120B',
    fill: '#991B1B',
    accent: '#15803D',
    centerText: '#FAF5EE',
    layers: [
      { name: 'Shaved Belgian Dark Chocolate', fill: 'frost' },
      { name: 'Moist Dark Cocoa Sponge', fill: 'sponge' },
      { name: 'Tart Morello Cherry Compote', fill: 'fill' },
      { name: 'Whipped Fresh Dairy Cream', fill: '#FFFFFF' },
      { name: 'Moist Dark Cocoa Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'cherry-blush',
    name: 'Blush Cherry & Strawberry Swirl',
    shortName: 'Cherry Swirl',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    priceNum: 699,
    price: '₹699',
    tag: 'Whipped Berry Cream & Glitter Cherries',
    image: '/hero-cakes/cherry-blush.jpg',
    bg: '#BE123C',
    frost: '#FDE2E4',
    sponge: '#FFF1E6',
    fill: '#E11D48',
    accent: '#FB7185',
    centerText: '#301612',
    layers: [
      { name: 'Blush Strawberry Buttercream', fill: 'frost' },
      { name: 'Madagascar Vanilla Sponge', fill: 'sponge' },
      { name: 'Wild Cherry & Berry Coulis', fill: 'fill' },
      { name: 'Whipped Mascarpone Cream', fill: '#FFFFFF' },
      { name: 'Madagascar Vanilla Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'golden-lemon',
    name: 'Golden Lemon & 24K Pearl',
    shortName: 'Golden Lemon',
    slug: 'exotic-fresh-seasonal-fruit-ambrosia',
    priceNum: 699,
    price: '₹699',
    tag: 'Zesty Lemon Curd & Edible Gold Pearls',
    image: '/hero-cakes/golden-lemon.jpg',
    bg: '#B45309',
    frost: '#FEF08A',
    sponge: '#FFFBEB',
    fill: '#F59E0B',
    accent: '#D4B46A',
    centerText: '#301612',
    layers: [
      { name: 'Lemon Cream & 24K Gold Pearls', fill: 'frost' },
      { name: 'Zesty Meyer Lemon Sponge', fill: 'sponge' },
      { name: 'Velvety Citrus Curd Filling', fill: 'fill' },
      { name: 'Whipped European Cream', fill: '#FFFFFF' },
      { name: 'Zesty Meyer Lemon Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'vanilla-bean',
    name: 'Madagascar Vanilla Bean Velvet',
    shortName: 'Vanilla Velvet',
    slug: 'grand-tiered-golden-wedding-masterpiece',
    priceNum: 649,
    price: '₹649',
    tag: 'Hand-Piped Swiss Meringue Buttercream',
    image: '/hero-cakes/vanilla-buttercream.jpg',
    bg: '#8C5835',
    frost: '#FFFDF7',
    sponge: '#FAF0CA',
    fill: '#D4B46A',
    accent: '#B25E00',
    centerText: '#301612',
    layers: [
      { name: 'Swiss Meringue Buttercream', fill: 'frost' },
      { name: 'Madagascar Vanilla Bean Sponge', fill: 'sponge' },
      { name: 'White Chocolate Truffle Ganache', fill: 'fill' },
      { name: 'Whipped Dairy Crème', fill: '#FFFFFF' },
      { name: 'Madagascar Vanilla Bean Sponge', fill: 'sponge' },
    ],
  },
];

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);

export const R = 250;
export const RIM = 8;
export const HALF = 17;
export const SPRINKLES = ['#D4B46A', '#301612', '#E5B56A', '#B25E00', '#F5E6D3'];

const rad = (d: number) => (d * Math.PI) / 180;
export const pt = (r: number, a: number): [number, number] => [
  Number((r * Math.cos(rad(a))).toFixed(2)),
  Number((r * Math.sin(rad(a))).toFixed(2)),
];
export const diff = (a: number, b: number) => ((a - b + 540) % 360) - 180;

export function sector(r: number, half: number) {
  const [x1, y1] = pt(r, -half);
  const [x2, y2] = pt(r, half);
  return `M0 0 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}Z`;
}

export function bodyPath(cut: number | null) {
  if (cut === null) return `M${R} 0A${R} ${R} 0 1 1 ${-R} 0A${R} ${R} 0 1 1 ${R} 0Z`;
  const [x1, y1] = pt(R, cut + HALF);
  const [x2, y2] = pt(R, cut - HALF);
  return `M0 0 L${x1} ${y1} A${R} ${R} 0 1 1 ${x2} ${y2}Z`;
}
