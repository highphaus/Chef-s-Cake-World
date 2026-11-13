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
  innerImage: string;
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
    innerImage: '/hero%20section/Cut%20inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
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
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
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
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    bg: '#B45309',
    frost: '#FEF08A',
    sponge: '#FFFBEB',
    fill: '#F59E0B',
    accent: '#E8B984',
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
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    bg: '#8C5835',
    frost: '#FFFDF7',
    sponge: '#FAF0CA',
    fill: '#E8B984',
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
  {
    id: 'belgian-truffle',
    name: 'Royal Belgian Chocolate Truffle',
    shortName: 'Belgian Truffle',
    slug: 'royal-belgian-chocolate-truffle-cake',
    priceNum: 699,
    price: '₹699',
    tag: '70% Callebaut Single-Origin Ganache',
    image: '/Cakes/cake.jpg',
    innerImage: '/hero%20section/Cut%20inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    bg: '#3B1C15',
    frost: '#52261C',
    sponge: '#2E120B',
    fill: '#D49B42',
    accent: '#F4C95D',
    centerText: '#FAF5EE',
    layers: [
      { name: '70% Callebaut Mirror Ganache', fill: 'frost' },
      { name: 'Moist Dutch Cocoa Sponge', fill: 'sponge' },
      { name: 'Single-Origin Chocolate Truffle', fill: 'fill' },
      { name: 'Whipped European Dairy Cream', fill: '#FFFFFF' },
      { name: 'Moist Dutch Cocoa Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'red-velvet',
    name: 'Pure Eggless Red Velvet Luxe',
    shortName: 'Red Velvet',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    priceNum: 749,
    price: '₹749',
    tag: '100% Certified Eggless & Cream Cheese',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    bg: '#A4133C',
    frost: '#FFF1F2',
    sponge: '#BE123C',
    fill: '#F43F5E',
    accent: '#10B981',
    centerText: '#301612',
    layers: [
      { name: 'Philadelphia Cream Cheese Frosting', fill: 'frost' },
      { name: 'Cloud-Soft Crimson Cocoa Sponge', fill: 'sponge' },
      { name: 'Madagascar Bourbon Coulis', fill: 'fill' },
      { name: 'Whipped Sweet Velvet Cream', fill: '#FFFFFF' },
      { name: 'Cloud-Soft Crimson Cocoa Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'hazelnut-truffle',
    name: 'Dark Truffle & Roasted Hazelnut',
    shortName: 'Hazelnut Truffle',
    slug: 'decadent-dark-truffle-roasted-hazelnut',
    priceNum: 749,
    price: '₹749',
    tag: 'Piedmont Roasted Praline Crunch',
    image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg',
    innerImage: '/hero%20section/Cut%20inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    bg: '#6B3714',
    frost: '#7C441D',
    sponge: '#3B1E08',
    fill: '#D97706',
    accent: '#FBBF24',
    centerText: '#FAF5EE',
    layers: [
      { name: 'Roasted Hazelnut Cocoa Glaze', fill: 'frost' },
      { name: 'Bittersweet Dark Chocolate Mousse', fill: 'sponge' },
      { name: 'Piedmont Hazelnut Praline Crunch', fill: 'fill' },
      { name: 'French Feuilletine Cream', fill: '#FFFFFF' },
      { name: 'Hazelnut Cocoa Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'lotus-biscoff',
    name: 'Lotus Biscoff Speculoos Dream',
    shortName: 'Lotus Biscoff',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    priceNum: 799,
    price: '₹799',
    tag: 'Belgian Speculoos & Caramel Crunch',
    image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg',
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    bg: '#C2410C',
    frost: '#FDE68A',
    sponge: '#D97706',
    fill: '#B45309',
    accent: '#EA580C',
    centerText: '#301612',
    layers: [
      { name: 'Belgian Speculoos Buttercream', fill: 'frost' },
      { name: 'Caramelized Cinnamon Sponge', fill: 'sponge' },
      { name: 'Salted Butter Caramel Drizzle', fill: 'fill' },
      { name: 'Whipped Biscoff Cookie Mousse', fill: '#FFFFFF' },
      { name: 'Caramelized Cinnamon Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'alphonso-mango',
    name: 'Alphonso Mango Ambrosia',
    shortName: 'Alphonso Mango',
    slug: 'exotic-fresh-seasonal-fruit-ambrosia',
    priceNum: 699,
    price: '₹699',
    tag: 'Ratnagiri Alphonso Fruit Compote',
    image: '/Cakes/e8b9a0c87a7d23ac176188e63655a4d1.jpg',
    innerImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    bg: '#D97706',
    frost: '#FEF08A',
    sponge: '#FFFBEB',
    fill: '#EA580C',
    accent: '#16A34A',
    centerText: '#301612',
    layers: [
      { name: 'Fresh Alphonso Glaze Frosting', fill: 'frost' },
      { name: 'Bourbon Vanilla Bean Sponge', fill: 'sponge' },
      { name: 'Ratnagiri Alphonso Mango Pulp', fill: 'fill' },
      { name: 'Light Dairy Mascarpone Cream', fill: '#FFFFFF' },
      { name: 'Bourbon Vanilla Bean Sponge', fill: 'sponge' },
    ],
  },
  {
    id: 'ferrero-praline',
    name: 'Ferrero Rocher Hazelnut Luxe',
    shortName: 'Ferrero Praline',
    slug: 'ferrero-rocher-hazelnut-praline-luxe',
    priceNum: 899,
    price: '₹899',
    tag: 'Nutella Mousse & Roasted Hazelnuts',
    image: '/Cakes/49d646997a3a90a8d9104f47746cf1b5.jpg',
    innerImage: '/hero%20section/Cut%20inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    bg: '#4A2511',
    frost: '#5E3019',
    sponge: '#2E1409',
    fill: '#C68B59',
    accent: '#E8B984',
    centerText: '#FAF5EE',
    layers: [
      { name: 'Dark Ganache & Ferrero Crown', fill: 'frost' },
      { name: 'Moist Hazelnut Cocoa Sponge', fill: 'sponge' },
      { name: 'Silky Nutella Praline Mousse', fill: 'fill' },
      { name: 'Crisp Wafer & Dairy Cream', fill: '#FFFFFF' },
      { name: 'Moist Hazelnut Cocoa Sponge', fill: 'sponge' },
    ],
  },
];

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);

export const R = 250;
export const RIM = 8;
export const HALF = 17;
export const SPRINKLES = ['#E8B984', '#301612', '#E8B984', '#D48C46', '#FDF6EE'];

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
