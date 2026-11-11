'use client';

import React, { useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, Scissors, Star, Truck, ShieldCheck } from 'lucide-react';
import {
  HERO_FLAVOURS,
  LAYER_HEIGHTS,
  CAKE_ITEMS,
  R,
  RIM,
  HALF,
  SPRINKLES,
  bodyPath,
  diff,
  pt,
  sector,
  toColour,
} from '@/lib/heroCakeData';

type Spark = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  spin: number;
  dur: number;
  fill: string;
};

let sparkId = 0;

function CakePiece({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="var(--ink)" stroke="var(--ink)" strokeWidth={2 * RIM + 4} strokeLinejoin="round" />
      <path
        d={d}
        fill="var(--frost)"
        stroke="var(--sponge)"
        strokeWidth={2 * RIM}
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </>
  );
}

function CakeDecor({ cut, origin }: { cut: number | null; origin: number | null }) {
  return (
    <>
      {CAKE_ITEMS.map((it, i) => {
        if (cut !== null && (origin === null) === Math.abs(diff(it.a, cut)) <= HALF) return null;
        const [x, y] = pt(it.r, origin === null ? it.a : it.a - origin);
        return it.t === 'dot' ? (
          <circle key={i} cx={x} cy={y} r={it.s} fill={it.fill} stroke="var(--ink)" strokeWidth={2} />
        ) : (
          <rect
            key={i}
            x={-8}
            y={-3}
            width={16}
            height={6}
            rx={3}
            fill={it.fill}
            stroke="var(--ink)"
            strokeWidth={1.5}
            transform={`translate(${x} ${y}) rotate(${it.rot})`}
          />
        );
      })}
    </>
  );
}

const getAngleFromPointer = (e: PointerEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  return (Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI;
};

export default function InteractiveCakeHero() {
  const [idx, setIdx] = useState(0);
  const [cut, setCut] = useState<number | null>(null);
  const [cutCount, setCutCount] = useState(0);
  const [hover, setHover] = useState(-38);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<'0.5kg' | '1kg' | '2kg'>('0.5kg');

  const f = HERO_FLAVOURS[idx];

  const getPriceForWeight = (basePrice: number, weight: '0.5kg' | '1kg' | '2kg') => {
    if (weight === '1kg') return Math.round(basePrice * 1.85);
    if (weight === '2kg') return Math.round(basePrice * 3.5);
    return basePrice;
  };

  const doCut = (angle: number) => {
    setCut(angle);
    setCutCount((n) => n + 1);

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const batch: Spark[] = Array.from({ length: 26 }, (_, i) => {
      const [x, y] = pt(R * 0.75, angle + (Math.random() - 0.5) * 30);
      const [dx, dy] = pt(120 + Math.random() * 180, angle + (Math.random() - 0.5) * 140);
      return {
        id: ++sparkId,
        x,
        y,
        dx,
        dy,
        spin: (Math.random() - 0.5) * 720,
        dur: 900 + Math.random() * 500,
        fill: SPRINKLES[i % 5],
      };
    });

    setSparks((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((p) => !batch.includes(p)));
    }, 1500);
  };

  const handleKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setHover((h) => h - 12);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setHover((h) => h + 12);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      doCut(hover);
    }
  };

  const themeVars = {
    '--bg': f.bg,
    '--frost': f.frost,
    '--sponge': f.sponge,
    '--fill': f.fill,
    '--accent': f.accent,
    '--ink': '#301612',
    '--paper': '#FFFBF4',
    '--plate': '#FFFFFF',
  } as CSSProperties;

  return (
    <section
      style={themeVars}
      className="relative w-full overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20 border-b-2 border-[#301612]/15 transition-colors duration-700 select-none"
    >
      {/* Warm Subtle Gingham + Flavour Tinted Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: `color-mix(in srgb, ${f.bg} 10%, #FAF5EE)`,
          backgroundImage:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.45) 50%, transparent 50%), linear-gradient(rgba(255, 255, 255, 0.45) 50%, transparent 50%)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Top Chocolate Melt Drip Hanging from Header */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 w-full h-14 sm:h-20 md:h-24 lg:h-28 z-20 pointer-events-none select-none overflow-hidden"
      >
        <div className="w-full h-full bg-[url('/chocolate-drip-wide.png')] bg-repeat-x bg-contain bg-top drop-shadow-md opacity-95" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Hero Editorial Title Bar */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFBF4] border-2 border-[#301612] shadow-[3px_3px_0_#301612] text-xs font-bold text-[#301612]">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: f.bg }} />
            <span>Interactive Atelier Experience &bull; {f.tag}</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] text-[#301612] leading-[1.08] tracking-tight">
            A Slice of Pure{' '}
            <span className="relative inline-block">
              Happiness.
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 w-full h-[6px] sm:h-[8px] rounded-full -z-10 transition-colors duration-500"
                style={{ backgroundColor: `color-mix(in srgb, ${f.accent} 45%, transparent)` }}
              />
            </span>
          </h1>

          <p className="font-body text-sm sm:text-base text-[#5C3D34] max-w-2xl mx-auto leading-relaxed">
            Baked fresh to order across Kerala. Choose your signature creation below, aim over the cake, and tap to cut your first slice.
          </p>
        </div>

        {/* 3-Column Interactive Cake Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT COLUMN: Choose a Flavour Card */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4">
            <div className="bg-[#FFFBF4] border-2 border-[#301612] rounded-3xl p-5 shadow-[6px_6px_0_#301612]">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="font-heading text-lg font-extrabold text-[#301612]">Choose Flavour</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF1E4] border border-[#301612]/20 text-[#301612]">
                  {HERO_FLAVOURS.length} Ateliers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2" role="group" aria-label="Choose cake flavour">
                {HERO_FLAVOURS.map((item, i) => {
                  const isSelected = i === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setIdx(i)}
                      className={`w-full flex items-center justify-between gap-2.5 p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#301612] shadow-[3px_3px_0_#301612] font-bold -translate-y-0.5'
                          : 'border-transparent hover:border-[#301612]/30 hover:bg-[#FAF1E4]/60'
                      }`}
                      style={
                        isSelected
                          ? { backgroundColor: `color-mix(in srgb, ${item.bg} 18%, #FFFFFF)` }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-6 h-6 rounded-full border-2 border-[#301612] shrink-0 shadow-xs"
                          style={{ backgroundColor: item.bg }}
                        />
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-[13px] text-[#301612] truncate font-semibold">
                            {item.shortName}
                          </span>
                          <span className="block text-[10px] text-[#5C3D34]/80 truncate">
                            {item.price} / 0.5kg
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Controls under Flavours */}
              <div className="mt-4 pt-3.5 border-t border-[#301612]/10 flex items-center justify-between gap-2">
                {cut !== null ? (
                  <button
                    type="button"
                    onClick={() => setCut(null)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#FAF1E4] border-2 border-[#301612] text-xs font-bold text-[#301612] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0_#301612] active:translate-y-0.5 active:shadow-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Cake</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => doCut(hover)}
                    className="w-full py-2 px-3 rounded-xl bg-[#D49B42] hover:bg-[#c28b35] border-2 border-[#301612] text-xs font-bold text-[#301612] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0_#301612] active:translate-y-0.5 active:shadow-none"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Cut Sample Slice</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Interactive SVG Cake Stage */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[580px] aspect-square mx-auto">
              <svg
                className="w-full h-full block cursor-pointer touch-manipulation overflow-visible select-none focus:outline-none"
                viewBox="-310 -310 620 620"
                role="button"
                tabIndex={0}
                aria-label="Interactive Cake. Move mouse or use arrow keys to aim knife, click or press Enter to cut a slice."
                onPointerMove={(e) => setHover(getAngleFromPointer(e))}
                onClick={(e) => doCut(getAngleFromPointer(e))}
                onKeyDown={handleKeyDown}
              >
                {/* Porcelain Cake Plate */}
                <circle r={288} fill="rgba(48, 22, 18, 0.08)" cx={6} cy={8} />
                <circle r={285} fill="var(--plate)" stroke="var(--ink)" strokeWidth={3.5} />
                <circle
                  r={262}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={10}
                  strokeDasharray="2 16"
                  strokeLinecap="round"
                />

                {/* Rotating Edge Typography Ring */}
                <g className="animate-cake-spin">
                  <path id="heroRingPath" d="M-240 0 a240 240 0 1 1 480 0 a240 240 0 1 1 -480 0" fill="none" />
                  <text
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontWeight: 700,
                      fontSize: '18.5px',
                      fill: 'var(--ink)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <textPath href="#heroRingPath" textLength={1495} lengthAdjust="spacing">
                      CHEF&apos;S CAKE WORLD &bull; BAKED TO ORDER IN KERALA &bull; 100% BELGIAN COUVERTURE &bull; FRESH DAILY &bull;{' '}
                    </textPath>
                  </text>
                </g>

                {/* Cake Body & Sprinkles */}
                <g>
                  <CakePiece d={bodyPath(cut)} />
                  <CakeDecor cut={cut} origin={null} />
                </g>

                {/* Animated Cut Wedge */}
                {cut !== null && (
                  <g key={cutCount} className="cake-wedge" style={{ '--a': `${cut}deg` } as CSSProperties}>
                    <CakePiece d={sector(R, HALF)} />
                    <CakeDecor cut={cut} origin={cut} />
                  </g>
                )}

                {/* Hover Knife Aim Guide */}
                <path
                  d={sector(R + RIM, HALF)}
                  transform={`rotate(${hover})`}
                  fill="rgba(255, 255, 255, 0.35)"
                  stroke="var(--ink)"
                  strokeWidth={2.5}
                  strokeDasharray="7 6"
                  pointerEvents="none"
                />

                {/* Flying Sprinkle Sparks on Cut */}
                <g pointerEvents="none">
                  {sparks.map((p) => (
                    <rect
                      key={p.id}
                      className="cake-spark"
                      x={-7}
                      y={-3}
                      width={14}
                      height={6}
                      rx={3}
                      fill={p.fill}
                      stroke="var(--ink)"
                      strokeWidth={1.5}
                      style={
                        {
                          '--x': `${p.x}px`,
                          '--y': `${p.y}px`,
                          '--dx': `${p.x + p.dx}px`,
                          '--dy': `${p.y + p.dy}px`,
                          '--s': `${p.spin}deg`,
                          animationDuration: `${p.dur}ms`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </g>
              </svg>

              {/* Center Interactive Cake Seal Plaque */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-12 text-center">
                <div className="bg-[#FFFBF4]/92 backdrop-blur-sm border-2 border-[#301612] rounded-full px-6 py-5 sm:px-8 sm:py-6 shadow-[4px_4px_0_#301612] max-w-[210px] sm:max-w-[245px] transition-transform duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C5835] block mb-1">
                    {cut === null ? 'Interactive Knife' : 'Masterpiece Sliced'}
                  </span>
                  <h2 className="font-heading text-lg sm:text-2xl font-extrabold text-[#301612] leading-tight">
                    {cut === null ? 'Cut the first slice.' : 'Inside the layers.'}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#5C3D34] mt-1 leading-snug">
                    {cut === null ? 'Aim over cake & tap to cut' : 'Click again to cut another'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Slice Blueprint & Order Panel */}
          <aside className="lg:col-span-3 order-3" aria-live="polite">
            <div
              className={`bg-[#FFFBF4] border-2 border-[#301612] rounded-3xl p-5 shadow-[6px_6px_0_#301612] transition-all duration-500 ${
                cut !== null ? 'ring-4 ring-[#D49B42]/40 scale-[1.01]' : ''
              }`}
            >
              {/* Status Badge & Flavour Heading */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border mb-1.5 ${
                      cut !== null
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                        : 'bg-[#FAF1E4] text-[#8C5835] border-[#301612]/20'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{cut !== null ? 'Slice Inspected' : 'Inside Blueprint'}</span>
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#301612] leading-tight">
                    {f.name}
                  </h3>
                </div>

                {/* Real Cake Mini Preview Photo */}
                <div className="w-14 h-14 rounded-2xl border-2 border-[#301612] overflow-hidden shrink-0 bg-white shadow-xs">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* 5-Layer Isometric Cross-Section Diagram */}
              <div className="bg-white/80 rounded-2xl border border-[#301612]/15 p-2 mb-3">
                <svg viewBox="0 0 240 112" className="w-full h-auto" aria-hidden="true">
                  <g transform="translate(30 6) skewX(-14)" stroke="#301612" strokeWidth={2.5} strokeLinejoin="round">
                    {f.layers.map((layer, n) => (
                      <rect
                        key={n}
                        x={14}
                        y={LAYER_HEIGHTS.slice(0, n).reduce((a, b) => a + b, 0)}
                        width={170}
                        height={LAYER_HEIGHTS[n]}
                        rx={n === 4 ? 4 : 0}
                        fill={toColour(layer.fill)}
                      />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Layer Ingredients Legend */}
              <ul className="space-y-1.5 mb-4 text-xs text-[#301612] font-medium">
                {f.layers.map((layer, n) => (
                  <li key={n} className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-sm border-2 border-[#301612] shrink-0"
                      style={{ backgroundColor: toColour(layer.fill) }}
                    />
                    <span className="truncate">{layer.name}</span>
                  </li>
                ))}
              </ul>

              {/* Weight & Live Pricing Selector */}
              <div className="mb-4 pt-3 border-t border-[#301612]/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#5C3D34]">Select Weight</span>
                  <span className="font-extrabold text-base text-[#301612]">
                    ₹{getPriceForWeight(f.priceNum, selectedWeight).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['0.5kg', '1kg', '2kg'] as const).map((w) => {
                    const active = selectedWeight === w;
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setSelectedWeight(w)}
                        className={`py-1.5 rounded-xl text-[11px] font-bold border-2 transition-all cursor-pointer ${
                          active
                            ? 'bg-[#301612] text-white border-[#301612]'
                            : 'bg-white text-[#301612] border-[#301612]/20 hover:border-[#301612]'
                        }`}
                      >
                        {w.replace('kg', ' kg')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary CTA Button */}
              <Link
                href={`/cakes/${f.slug}`}
                className="w-full py-3 px-5 rounded-full bg-[#301612] hover:bg-[#46211A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border-2 border-[#301612] shadow-[3px_3px_0_#D49B42] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#D49B42] transition-all"
              >
                <span>Order This Cake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[11px] text-[#5C3D34]/80 text-center mt-2.5 font-medium">
                Fresh 2-Hr Kerala Delivery &bull; 4.98 &#9733; Rated
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Trust Highlights Strip */}
        <div className="mt-10 pt-5 border-t border-[#301612]/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-[#301612]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#8C5835]" />
            <span>2-Hour Express Kerala Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C5835]" />
            <span>100% Pure Belgian Couverture</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>4.98 / 5.0 (1,420+ Verified Orders)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
