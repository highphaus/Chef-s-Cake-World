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
    id: 'chocolate',
    name: 'Royal Belgian Truffle',
    shortName: 'Belgian Truffle',
    slug: 'royal-belgian-chocolate-truffle-cake',
    priceNum: 699,
    price: '₹699',
    tag: '70% Callebaut Single-Origin',
    image: '/Cakes/cake.jpg',
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
    id: 'velvet',
    name: 'Signature Red Velvet',
    shortName: 'Red Velvet',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    priceNum: 749,
    price: '₹749',
    tag: '100% Certified Eggless',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
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
    id: 'hazelnut',
    name: 'Dark Truffle Hazelnut',
    shortName: 'Hazelnut Truffle',
    slug: 'decadent-dark-truffle-roasted-hazelnut',
    priceNum: 749,
    price: '₹749',
    tag: 'Piedmont Roasted Praline',
    image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg',
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
    id: 'biscoff',
    name: 'Lotus Biscoff Dream',
    shortName: 'Lotus Biscoff',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    priceNum: 799,
    price: '₹799',
    tag: 'Belgian Speculoos Crunch',
    image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg',
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
    id: 'mango',
    name: 'Alphonso Mango Ambrosia',
    shortName: 'Alphonso Mango',
    slug: 'exotic-fresh-seasonal-fruit-ambrosia',
    priceNum: 699,
    price: '₹699',
    tag: 'Ratnagiri Mango Compote',
    image: '/Cakes/e8b9a0c87a7d23ac176188e63655a4d1.jpg',
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
];

export const toColour = (c: string) => (c.startsWith('#') ? c : `var(--${c})`);

export const R = 212;
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

export type CakeDecorItem =
  | { t: 'dot'; a: number; r: number; s: number; fill: string }
  | { t: 'spr'; a: number; r: number; rot: number; fill: string };

function buildDecorItems(): CakeDecorItem[] {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const items: CakeDecorItem[] = [];
  for (let a = 0; a < 360; a += 6) {
    items.push({ t: 'dot', a, r: R - 14, s: 6, fill: a % 12 ? '#FFFFFF' : 'var(--accent)' });
  }
  for (let a = 15; a < 360; a += 30) {
    items.push({ t: 'dot', a, r: R - 62, s: 15, fill: 'var(--fill)' });
  }
  for (let i = 0; i < 70; i++) {
    items.push({
      t: 'spr',
      a: Number((rnd() * 360).toFixed(2)),
      r: Number((98 + rnd() * (R - 98 - 40)).toFixed(2)),
      rot: Number((rnd() * 180).toFixed(2)),
      fill: SPRINKLES[i % 5],
    });
  }
  return items;
}

export const CAKE_ITEMS = buildDecorItems();

