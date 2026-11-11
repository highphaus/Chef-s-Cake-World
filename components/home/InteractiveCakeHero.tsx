'use client';

import React, { useState, useRef, useCallback, memo, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
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

const CakePiece = memo(function CakePiece({ d }: { d: string }) {
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
});

const CakeDecor = memo(function CakeDecor({ cut, origin }: { cut: number | null; origin: number | null }) {
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
});

const getAngleFromPointer = (e: PointerEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  return Number(
    ((Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI).toFixed(2)
  );
};

export default function InteractiveCakeHero() {
  const [idx, setIdx] = useState(0);
  const [cut, setCut] = useState<number | null>(null);
  const [cutCount, setCutCount] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<'0.5kg' | '1kg' | '2kg'>('0.5kg');

  // Direct DOM refs for 120fps silky hover tracking with zero React re-renders
  const hoverAngleRef = useRef(-38);
  const hoverGuideRef = useRef<SVGPathElement>(null);

  const f = HERO_FLAVOURS[idx];

  const getPriceForWeight = (basePrice: number, weight: '0.5kg' | '1kg' | '2kg') => {
    if (weight === '1kg') return Math.round(basePrice * 1.85);
    if (weight === '2kg') return Math.round(basePrice * 3.5);
    return basePrice;
  };

  const updateHoverGuide = useCallback((angle: number) => {
    hoverAngleRef.current = angle;
    if (hoverGuideRef.current) {
      hoverGuideRef.current.setAttribute('transform', `rotate(${angle})`);
    }
  }, []);

  const doCut = useCallback((angle: number) => {
    setCut(angle);
    setCutCount((n) => n + 1);

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const batch: Spark[] = Array.from({ length: 24 }, (_, i) => {
      const [x, y] = pt(R * 0.75, angle + (Math.random() - 0.5) * 30);
      const [dx, dy] = pt(120 + Math.random() * 170, angle + (Math.random() - 0.5) * 140);
      return {
        id: ++sparkId,
        x,
        y,
        dx,
        dy,
        spin: Number(((Math.random() - 0.5) * 720).toFixed(1)),
        dur: Math.round(850 + Math.random() * 450),
        fill: SPRINKLES[i % 5],
      };
    });

    setSparks((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((p) => !batch.includes(p)));
    }, 1400);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      updateHoverGuide(getAngleFromPointer(e));
    },
    [updateHoverGuide]
  );

  const handleSvgClick = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      const angle = getAngleFromPointer(e);
      updateHoverGuide(angle);
      doCut(angle);
    },
    [doCut, updateHoverGuide]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<SVGSVGElement>) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        updateHoverGuide(hoverAngleRef.current - 12);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        updateHoverGuide(hoverAngleRef.current + 12);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        doCut(hoverAngleRef.current);
      }
    },
    [doCut, updateHoverGuide]
  );

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
      className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-14 border-b-2 border-[#301612]/12 transition-colors duration-500"
    >
      {/* Subtle Gingham + Flavour Tinted Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          backgroundColor: `color-mix(in srgb, ${f.bg} 12%, #FAF5EE)`,
          backgroundImage:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.45) 50%, transparent 50%), linear-gradient(rgba(255, 255, 255, 0.45) 50%, transparent 50%)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* 3-Column Interactive Cake Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center">
          {/* LEFT COLUMN: Choose a Flavour Card */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-[#FFFBF4] border-2 border-[#301612] rounded-3xl p-4 sm:p-5 shadow-[5px_5px_0_#301612]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading text-lg font-extrabold text-[#301612]">Choose Flavour</h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF1E4] border border-[#301612]/20 text-[#301612]">
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
              <div className="mt-4 pt-3 border-t border-[#301612]/10 flex items-center justify-between gap-2">
                {cut !== null ? (
                  <button
                    type="button"
                    onClick={() => setCut(null)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF1E4] border-2 border-[#301612] text-xs font-bold text-[#301612] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0_#301612] active:translate-y-0.5 active:shadow-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Cake</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => doCut(hoverAngleRef.current)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#D49B42] hover:bg-[#c28b35] border-2 border-[#301612] text-xs font-bold text-[#301612] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0_#301612] active:translate-y-0.5 active:shadow-none"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Cut a Slice</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Interactive SVG Cake Stage */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[560px] aspect-square mx-auto">
              <svg
                className="relative z-10 w-full h-full block cursor-pointer touch-manipulation overflow-visible select-none focus:outline-none"
                viewBox="-310 -310 620 620"
                role="button"
                tabIndex={0}
                aria-label="Interactive Cake. Move pointer or use arrow keys to aim knife, click or press Enter to cut a slice."
                onPointerMove={handlePointerMove}
                onClick={handleSvgClick}
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
                <g className="animate-cake-spin" pointerEvents="none">
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

                {/* Hover Knife Aim Guide (Direct DOM Transform for 120fps smoothness) */}
                <path
                  ref={hoverGuideRef}
                  d={sector(R + RIM, HALF)}
                  transform="rotate(-38)"
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
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-12 text-center">
                <div className="bg-[#FFFBF4]/95 backdrop-blur-sm border-2 border-[#301612] rounded-full px-6 py-4 sm:px-8 sm:py-6 shadow-[4px_4px_0_#301612] max-w-[210px] sm:max-w-[245px]">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C5835] block mb-0.5">
                    {cut === null ? 'Tap Cake to Slice' : 'Slice Cut'}
                  </span>
                  <h1 className="font-heading text-lg sm:text-2xl font-extrabold text-[#301612] leading-tight">
                    {cut === null ? 'Cut the first slice.' : 'Pure Happiness.'}
                  </h1>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#5C3D34] mt-1 leading-snug">
                    {cut === null ? 'Move over cake to aim. Tap to cut.' : 'Tap again to cut another slice.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Slice Blueprint & Order Panel */}
          <aside className="lg:col-span-3 order-3" aria-live="polite">
            <div
              className={`bg-[#FFFBF4] border-2 border-[#301612] rounded-3xl p-4 sm:p-5 shadow-[5px_5px_0_#301612] transition-all duration-300 ${
                cut !== null ? 'ring-4 ring-[#D49B42]/45' : ''
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
                    <span>{cut !== null ? 'Slice Inspected' : 'Inside Layers'}</span>
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#301612] leading-tight">
                    {f.name}
                  </h3>
                </div>

                {/* Real Cake Mini Preview Photo */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border-2 border-[#301612] overflow-hidden shrink-0 bg-white shadow-xs">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* 5-Layer Isometric Cross-Section Diagram */}
              <div className="bg-white/85 rounded-2xl border border-[#301612]/15 p-2 mb-3">
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
              <ul className="space-y-1.5 mb-3.5 text-xs text-[#301612] font-medium">
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
              <div className="mb-3.5 pt-2.5 border-t border-[#301612]/10 space-y-2">
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

              <p className="text-[11px] text-[#5C3D34]/80 text-center mt-2 font-medium">
                Fresh 2-Hr Kerala Delivery &bull; 4.98 &#9733; Rated
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Trust Highlights Strip */}
        <div className="mt-8 pt-4 border-t border-[#301612]/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-[#301612]">
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
