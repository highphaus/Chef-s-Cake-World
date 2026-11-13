'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import './ScrollCake.css';

export type ScrollCakeFlavor = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  accent: string;
  innerSliceImage: string;
  slug: string;
  textures: {
    baseSponge: string;
    cream: string;
    filling: string;
    topSponge: string;
    frosting: string;
  };
  layers: {
    title: string;
    role: string;
    description: string;
    ingredients: string;
    thickness: number; // height for SVG slice
  }[];
};

const FLAVOUR_OPTIONS: ScrollCakeFlavor[] = [
  {
    id: 'belgian-truffle',
    name: 'Royal Belgian Chocolate Truffle',
    tagline: '70% Callebaut Ganache & Dutch Cocoa Sponge',
    price: '₹699',
    accent: '#D4B46A',
    innerSliceImage: '/hero%20section/Cut%20inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    slug: 'royal-belgian-chocolate-truffle-cake',
    textures: {
      baseSponge: '/scroll-cake/choc-sponge-base.jpg',
      cream: '/scroll-cake/choc-cream.jpg',
      filling: '/scroll-cake/choc-filling.jpg',
      topSponge: '/scroll-cake/choc-sponge-top.jpg',
      frosting: '/scroll-cake/choc-frosting.jpg',
    },
    layers: [
      {
        title: 'Dutch Cocoa Base Sponge',
        role: 'Layer 1 of 5 • Foundation',
        description:
          'Dense, moisture-rich cocoa sponge baked fresh at 5:00 AM using imported Dutch-processed cocoa and slow-churned butter.',
        ingredients: 'Dutch Cocoa • Farm Butter • Madagascar Vanilla',
        thickness: 26,
      },
      {
        title: 'Whipped Truffle Dairy Cream',
        role: 'Layer 2 of 5 • Light Mousse',
        description:
          'Silk-whipped dairy cream aerated gently with melted milk chocolate ganache for an airy, melt-in-the-mouth texture.',
        ingredients: '100% Dairy Cream • Milk Chocolate Ganache',
        thickness: 18,
      },
      {
        title: '70% Callebaut Chocolate Truffle Filling',
        role: 'Layer 3 of 5 • Decadent Core',
        description:
          'Thick molten core of Belgian Callebaut single-origin dark chocolate, slow-melted and spread edge-to-edge.',
        ingredients: '70% Callebaut Couverture • Fresh Heavy Cream',
        thickness: 14,
      },
      {
        title: 'Second Cocoa Sponge Tier',
        role: 'Layer 4 of 5 • Structural Balance',
        description:
          'A second tier of light chocolate sponge soaked in rich vanilla simple syrup, pressed down gently to lock in humidity.',
        ingredients: 'Dark Cocoa Sponge • Vanilla Bean Reduction',
        thickness: 24,
      },
      {
        title: 'Mirror Ganache & Chocolate Shavings',
        role: 'Layer 5 of 5 • Crowning Finish',
        description:
          'Enrobed in glossy Belgian mirror glaze, crowned with hand-carved dark chocolate curls and 24K edible gold dusting.',
        ingredients: 'Mirror Glaze • Couverture Curls • 24K Edible Gold',
        thickness: 20,
      },
    ],
  },
  {
    id: 'vanilla-berry',
    name: 'Madagascar Vanilla & Berry Royale',
    tagline: 'Farm-Fresh Mascarpone & Wild Berry Coulis',
    price: '₹649',
    accent: '#BE123C',
    innerSliceImage: '/hero%20section/Cut%20inner/4f1706623960289a6c81ea446e9baef1.jpg',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    textures: {
      baseSponge: '/scroll-cake/berry-sponge-base.jpg',
      cream: '/scroll-cake/berry-cream.jpg',
      filling: '/scroll-cake/berry-filling.jpg',
      topSponge: '/scroll-cake/berry-sponge-top.jpg',
      frosting: '/scroll-cake/berry-frosting.jpg',
    },
    layers: [
      {
        title: 'Golden Madagascar Vanilla Sponge',
        role: 'Layer 1 of 5 • Foundation',
        description:
          'Buttery, feather-light sponge infused with whole Madagascar bourbon vanilla pods, baked to a golden crumb.',
        ingredients: 'Madagascar Vanilla Pods • Free-Range Flour • Sweet Butter',
        thickness: 26,
      },
      {
        title: 'Whipped Mascarpone Cream',
        role: 'Layer 2 of 5 • Light Mousse',
        description:
          'Velvety mascarpone folded into fresh whipping cream, offering a subtle tang that balances the sweetness.',
        ingredients: 'Italian Mascarpone • Sweet Whipped Dairy',
        thickness: 18,
      },
      {
        title: 'Wild Berry & Strawberry Coulis',
        role: 'Layer 3 of 5 • Tart Berry Core',
        description:
          'Hand-simmered whole strawberry and Morello cherry reduction, packed with real fruit jewels and natural pectin.',
        ingredients: 'Whole Strawberries • Morello Cherries • Citrus Zest',
        thickness: 14,
      },
      {
        title: 'Second Vanilla Bean Sponge',
        role: 'Layer 4 of 5 • Structural Balance',
        description:
          'A soft second sponge tier drizzled with citrus blossom syrup to harmonize the fruit and rich cream notes.',
        ingredients: 'Vanilla Sponge • Citrus Blossom Mist',
        thickness: 24,
      },
      {
        title: 'Swiss Meringue Buttercream & Fresh Berries',
        role: 'Layer 5 of 5 • Crowning Finish',
        description:
          'Hand-piped Swiss meringue rosettes, crowned with glistening ripe berries, edible petals, and silver pearls.',
        ingredients: 'Swiss Meringue • Farm Strawberries • Silver Pearls',
        thickness: 20,
      },
    ],
  },
];

const SCALE = 2.4;
const BASE_Y = 320;
const SLICE_X = 55;
const SLICE_W = 290;

export default function ScrollCake() {
  const [selectedFlavorIdx, setSelectedFlavorIdx] = useState(0);
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  const flavor = FLAVOUR_OPTIONS[selectedFlavorIdx];
  const lastIndex = flavor.layers.length - 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const index = Number((e.target as HTMLElement).dataset.i);
            if (!isNaN(index)) setStep(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [selectedFlavorIdx]);

  // Compute heights from bottom to top
  const layerHeights = flavor.layers.map((l) => l.thickness);
  let currentY = BASE_Y;
  const layersWithY = flavor.layers.map((layer, i) => {
    const h = layerHeights[i] * SCALE;
    currentY -= h;
    return {
      ...layer,
      y: currentY,
      h,
      index: i,
    };
  });

  const topY = currentY;

  return (
    <section className="sc" aria-labelledby="scroll-cake-heading">
      {/* SECTION HEADER */}
      <div className="sc-head flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-caramel block mb-2">
            The Anatomy of Taste • Handcrafted Layer by Layer
          </span>
          <h2
            id="scroll-cake-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-chocolate tracking-tight"
          >
            How Your Cake Comes Together
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-chocolate/70 max-w-xl mt-2">
            Scroll down to watch our bakers build your centerpiece tier by tier, from 5:00 AM oven bake to final hand-piped garnishes.
          </p>
        </div>

        {/* FLAVOUR SWITCHER PILLS */}
        <div className="flex items-center gap-2 p-1.5 bg-brand-cream/80 border border-brand-chocolate/10 rounded-full shadow-2xs self-start md:self-auto">
          {FLAVOUR_OPTIONS.map((opt, idx) => {
            const isActive = selectedFlavorIdx === idx;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setSelectedFlavorIdx(idx);
                  setStep(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-chocolate text-white shadow-xs'
                    : 'text-brand-chocolate/70 hover:text-brand-chocolate hover:bg-white/60'
                }`}
              >
                {opt.name.split(' ')[1] || opt.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sc-grid">
        {/* STICKY STAGE (LEFT SIDE ON DESKTOP) */}
        <div className="sc-stage">
          {/* Main Visual SVG Container */}
          <div className="relative w-full max-w-[440px] aspect-[400/360] flex items-center justify-center">
            <svg viewBox="0 0 400 370" aria-hidden="true" className="w-full h-full">
              <defs>
                {/* Patterns for Real Layer Textures */}
                <pattern id={`pat-base-${flavor.id}`} patternUnits="userSpaceOnUse" width={SLICE_W} height="70">
                  <image
                    href={flavor.textures.baseSponge}
                    x="0"
                    y="0"
                    width={SLICE_W}
                    height="70"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                <pattern id={`pat-cream-${flavor.id}`} patternUnits="userSpaceOnUse" width={SLICE_W} height="50">
                  <image
                    href={flavor.textures.cream}
                    x="0"
                    y="0"
                    width={SLICE_W}
                    height="50"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                <pattern id={`pat-filling-${flavor.id}`} patternUnits="userSpaceOnUse" width={SLICE_W} height="40">
                  <image
                    href={flavor.textures.filling}
                    x="0"
                    y="0"
                    width={SLICE_W}
                    height="40"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                <pattern id={`pat-top-${flavor.id}`} patternUnits="userSpaceOnUse" width={SLICE_W} height="65">
                  <image
                    href={flavor.textures.topSponge}
                    x="0"
                    y="0"
                    width={SLICE_W}
                    height="65"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                <pattern id={`pat-frost-${flavor.id}`} patternUnits="userSpaceOnUse" width={SLICE_W} height="60">
                  <image
                    href={flavor.textures.frosting}
                    x="0"
                    y="0"
                    width={SLICE_W}
                    height="60"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>

                {/* Drop shadow for layers */}
                <filter id="layer-shadow" x="-5%" y="-5%" width="110%" height="130%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#301612" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Platter Base */}
              <ellipse cx="200" cy="336" rx="190" ry="24" fill="#FFFFFF" stroke="#4A241A" strokeWidth="2.5" />
              <ellipse
                cx="200"
                cy="336"
                rx="168"
                ry="18"
                fill="none"
                stroke={flavor.accent}
                strokeWidth="3"
                strokeDasharray="3 10"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* ASSEMBLED LAYERS */}
              {layersWithY.map((l, i) => {
                const patterns = [
                  `url(#pat-base-${flavor.id})`,
                  `url(#pat-cream-${flavor.id})`,
                  `url(#pat-filling-${flavor.id})`,
                  `url(#pat-top-${flavor.id})`,
                  `url(#pat-frost-${flavor.id})`,
                ];
                const patternFill = patterns[i] || '#D4B46A';
                const isCurrent = step === i;

                return (
                  <g
                    key={i}
                    className={`sc-lay${step >= i ? ' on' : ''}`}
                    filter={step >= i ? 'url(#layer-shadow)' : undefined}
                  >
                    {/* Real Texture Cake Slices */}
                    <rect
                      x={SLICE_X}
                      y={l.y}
                      width={SLICE_W}
                      height={l.h}
                      rx={i === lastIndex ? 12 : 6}
                      fill={patternFill}
                      stroke={isCurrent ? flavor.accent : '#4A241A'}
                      strokeWidth={isCurrent ? 3 : 2}
                    />

                    {/* Gloss / 3D Bevel highlight on top of active layer */}
                    <rect
                      x={SLICE_X + 2}
                      y={l.y + 1}
                      width={SLICE_W - 4}
                      height={Math.max(3, l.h * 0.18)}
                      rx={3}
                      fill="#FFFFFF"
                      opacity={isCurrent ? 0.35 : 0.15}
                      pointerEvents="none"
                    />

                    {/* Step indicator tag on the slice */}
                    {step >= i && (
                      <g transform={`translate(${SLICE_X + 10}, ${l.y + l.h / 2 + 4})`}>
                        <rect x="-4" y="-10" width="22" height="15" rx="3" fill="#301612" opacity="0.85" />
                        <text x="7" y="1" textAnchor="middle" fill="#FAF5EE" fontSize="9" fontWeight="bold">
                          L{i + 1}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* CROWNING FINISH: Real Handcrafted Garnishes */}
              <g className={`sc-top${step >= lastIndex ? ' on' : ''}`}>
                {/* Hand-piped rosettes */}
                {[90, 135, 180, 225, 270, 310].map((x, idx) => (
                  <circle
                    key={idx}
                    cx={x}
                    cy={topY + 3}
                    r="9"
                    fill="#FFFDF7"
                    stroke="#4A241A"
                    strokeWidth="2"
                    filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))"
                  />
                ))}

                {/* Fresh Cherries / Berries with stems */}
                {[110, 200, 290].map((cx, idx) => (
                  <g key={idx}>
                    {/* Stem */}
                    <path
                      d={`M ${cx} ${topY - 14} Q ${cx + 10} ${topY - 28} ${cx + 18} ${topY - 32}`}
                      fill="none"
                      stroke="#2E4A1E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Berry */}
                    <circle
                      cx={cx}
                      cy={topY - 12}
                      r="13"
                      fill={flavor.id === 'belgian-truffle' ? '#6B0F1A' : '#BE123C'}
                      stroke="#4A241A"
                      strokeWidth="2"
                    />
                    {/* Specular Glaze */}
                    <circle cx={cx - 4} cy={topY - 16} r="3" fill="#FFFFFF" opacity="0.75" />
                  </g>
                ))}

                {/* 24K Gold leaf / chocolate curl flakes */}
                {[
                  [145, 14, 25],
                  [175, 24, -30],
                  [235, 16, 40],
                  [265, 26, 12],
                  [125, 26, -18],
                ].map(([x, dy, rot], idx) => (
                  <rect
                    key={idx}
                    x="-8"
                    y="-4"
                    width="16"
                    height="7"
                    rx="3"
                    fill={flavor.accent}
                    stroke="#4A241A"
                    strokeWidth="1.5"
                    transform={`translate(${x} ${topY + dy}) rotate(${rot})`}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* REAL CAKE CROSS-SECTION PREVIEW BADGE */}
          <div className="mt-3 w-full max-w-[440px] bg-white/90 backdrop-blur-md rounded-xl p-3 border border-brand-chocolate/10 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-brand-chocolate/15 shadow-2xs flex-shrink-0">
                <Image
                  src={flavor.innerSliceImage}
                  alt={flavor.name}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-caramel">
                    Real Kitchen Cross-Section
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </div>
                <p className="text-xs font-bold text-brand-chocolate truncate">{flavor.name}</p>
                <p className="text-[11px] text-brand-chocolate/60 truncate">
                  Layer {step + 1} active • {flavor.layers[step]?.title || 'Finished'}
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-xs font-extrabold text-brand-chocolate block">{flavor.price}</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                Fresh Today
              </span>
            </div>
          </div>
        </div>

        {/* SCROLLING STEPS (RIGHT SIDE ON DESKTOP) */}
        <ol className="sc-steps">
          {flavor.layers.map((l, i) => {
            const isLast = i === lastIndex;
            return (
              <li
                key={i}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={step === i ? 'on' : ''}
                aria-current={step === i ? 'step' : undefined}
              >
                <div className="sc-card">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="sc-n">{l.role}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-peach/60 text-brand-chocolate border border-brand-chocolate/10">
                      Step {i + 1}
                    </span>
                  </div>

                  <h3>{l.title}</h3>
                  <p>{l.description}</p>

                  <div className="mt-3 pt-3 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
                    <div className="text-brand-chocolate/70">
                      <span className="font-semibold text-brand-chocolate">Key Elements: </span>
                      {l.ingredients}
                    </div>
                  </div>

                  {/* FINAL STEP CTA */}
                  {isLast && (
                    <div className="mt-5 pt-4 border-t border-brand-chocolate/10 space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Link
                          href={`/cakes/${flavor.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-chocolate text-white text-xs font-bold hover:bg-brand-caramel transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <span>Order {flavor.name.split(' ')[0]} Now ({flavor.price})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href="/custom-cakes"
                          className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-brand-chocolate/20 text-brand-chocolate text-xs font-bold hover:bg-brand-cream transition-all duration-200 cursor-pointer"
                        >
                          Custom Tiers
                        </Link>
                      </div>

                      <p className="text-[11px] text-brand-chocolate/60 text-center sm:text-left">
                        Baked on the morning of dispatch. Delivered with cold-chain packaging across Attingal & Kazhakootam.
                      </p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* BRAND STORY REAL PHOTO SHOWCASE: "SLICE THE BEST, JUST BITE INTO IT" */}
      <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-brand-chocolate/10">
        <div className="bg-white rounded-2xl border border-brand-chocolate/15 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg border border-brand-chocolate/20 flex-shrink-0 group">
            <Image
              src="/story/ccstory23.jpg"
              alt="Chef's Cake World - Slice the best, just bite into it"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold tracking-wide drop-shadow-md">
                Official Chef&apos;s Cake World Poster
              </span>
            </div>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-caramel/10 border border-brand-caramel/20 text-brand-caramel text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Masterpiece</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-chocolate leading-tight">
              &ldquo;Slice the Best, Just Bite Into It.&rdquo;
            </h3>

            <p className="font-body text-sm sm:text-base text-brand-chocolate/75 leading-relaxed">
              Every creation leaving Chef&apos;s Cake World is built with uncompromising standards: genuine Callebaut Belgian chocolate, dairy cream whipped fresh daily, and soft, airy sponge layers that hold their tall, photogenic crumb from oven to your celebration table.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-brand-cream/60 rounded-xl border border-brand-chocolate/10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-caramel block">
                  Zero Preservatives
                </span>
                <span className="text-xs font-bold text-brand-chocolate">100% Real Ingredients</span>
              </div>
              <div className="p-3 bg-brand-cream/60 rounded-xl border border-brand-chocolate/10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-caramel block">
                  Same-Day Fresh
                </span>
                <span className="text-xs font-bold text-brand-chocolate">Bespoke Preparation</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/cakes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-chocolate text-white text-xs font-bold hover:bg-brand-caramel transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Explore All Celebration Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
