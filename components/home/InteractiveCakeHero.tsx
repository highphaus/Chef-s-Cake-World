'use client';

import React, { useState, useRef, useCallback, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, Scissors, Star, Truck, ShieldCheck } from 'lucide-react';
import {
  HERO_FLAVOURS,
  R,
  HALF,
  SPRINKLES,
  bodyPath,
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

const getPointerState = (e: PointerEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const scale = 620 / rect.width;
  const svgDist = Math.hypot(dx, dy) * scale;
  const angle = Number(((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(2));
  return { isOverCake: svgDist <= R, angle };
};

export default function InteractiveCakeHero() {
  const [idx, setIdx] = useState(0);
  const [cut, setCut] = useState<number | null>(null);
  const [cutCount, setCutCount] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<'0.5kg' | '1kg' | '2kg'>('0.5kg');

  // Direct DOM refs for 120fps silky knife hover tracking with zero React re-renders
  const hoverAngleRef = useRef(-38);
  const hoverGuideRef = useRef<SVGGElement>(null);

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

    const batch: Spark[] = Array.from({ length: 22 }, (_, i) => {
      const [x, y] = pt(R * 0.72, angle + (Math.random() - 0.5) * 28);
      const [dx, dy] = pt(100 + Math.random() * 150, angle + (Math.random() - 0.5) * 130);
      return {
        id: ++sparkId,
        x,
        y,
        dx,
        dy,
        spin: Number(((Math.random() - 0.5) * 540).toFixed(1)),
        dur: Math.round(800 + Math.random() * 450),
        fill: SPRINKLES[i % SPRINKLES.length],
      };
    });

    setSparks((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((p) => !batch.includes(p)));
    }, 1350);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      const { isOverCake, angle } = getPointerState(e);
      if (isOverCake) {
        updateHoverGuide(angle);
        if (hoverGuideRef.current) hoverGuideRef.current.style.opacity = '1';
        e.currentTarget.style.cursor = 'pointer';
      } else {
        if (hoverGuideRef.current) hoverGuideRef.current.style.opacity = '0';
        e.currentTarget.style.cursor = 'default';
      }
    },
    [updateHoverGuide]
  );

  const handlePointerLeave = useCallback((e: PointerEvent<SVGSVGElement>) => {
    if (hoverGuideRef.current) hoverGuideRef.current.style.opacity = '0';
    e.currentTarget.style.cursor = 'default';
  }, []);

  const handleSvgClick = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      const { isOverCake, angle } = getPointerState(e);
      if (!isOverCake) return;
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
    '--paper': '#FFFFFF',
    '--plate': '#FFFFFF',
  } as CSSProperties;

  const bodyClipId = `cakeBodyClip-${cutCount}`;

  return (
    <section
      style={themeVars}
      className="relative w-full flex flex-col justify-start overflow-x-clip bg-white pt-12 sm:pt-14 lg:pt-12 pb-8 sm:pb-10 border-b border-brand-chocolate/10"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* 3-Column Photorealistic Interactive Cake Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-start">
          {/* LEFT COLUMN: Choose Flavour Card */}
          <div className="lg:col-span-3 order-2 lg:order-1 lg:self-start lg:mt-10">
            <div className="bg-white border border-brand-chocolate/12 rounded-3xl p-4 sm:p-5 shadow-[0_14px_40px_-12px_rgba(48,22,18,0.1)]">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-caramel block">
                    Haute Pâtisserie
                  </span>
                  <h2 className="font-heading text-lg font-bold text-[#301612]">Select Creation</h2>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-cream text-brand-chocolate border border-brand-chocolate/10">
                  {HERO_FLAVOURS.length} Cakes
                </span>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[196px] overflow-y-auto pr-1.5 cake-list-scroll"
                role="group"
                aria-label="Choose cake creation"
              >
                {HERO_FLAVOURS.map((item, i) => {
                  const isSelected = i === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        if (i !== idx) {
                          setIdx(i);
                          setCut(null);
                          setSparks([]);
                        }
                      }}
                      className={`w-full flex items-center justify-between gap-2.5 p-2 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-cream/70 border-brand-chocolate shadow-xs font-bold'
                          : 'bg-white border-brand-chocolate/10 hover:border-brand-chocolate/35 hover:bg-brand-cream/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-brand-chocolate/15 shrink-0 bg-brand-cream">
                          <img
                            src={item.image}
                            alt={item.shortName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-[13px] text-[#301612] truncate font-semibold">
                            {item.shortName}
                          </span>
                          <span className="block text-[11px] text-[#5C3D34]/75 truncate">
                            From {item.price}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-brand-caramel shrink-0 mr-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Controls under Flavours */}
              <div className="mt-4 pt-3.5 border-t border-brand-chocolate/10 flex items-center justify-between gap-2">
                {cut !== null ? (
                  <button
                    type="button"
                    onClick={() => setCut(null)}
                    className="w-full py-2.5 px-3 rounded-xl bg-brand-cream hover:bg-brand-peach/60 border border-brand-chocolate/20 text-xs font-bold text-[#301612] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Whole Cake</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => doCut(hoverAngleRef.current)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#301612] hover:bg-[#46211A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    <Scissors className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Cut a Slice</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Photorealistic Sliceable Real Cake Stage */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex flex-col items-center justify-center lg:-mt-6">
            <div className="relative w-full max-w-[480px] sm:max-w-[580px] lg:max-w-[620px] aspect-square mx-auto">
              <svg
                className="relative z-10 w-full h-full block cursor-default touch-manipulation overflow-visible select-none focus:outline-none"
                viewBox="-310 -310 620 620"
                role="button"
                tabIndex={0}
                aria-label="Interactive Real Cake. Move pointer over cake to aim knife blade, click or press Enter to cut a slice."
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={handleSvgClick}
                onKeyDown={handleKeyDown}
              >
                <defs>
                  {/* Dynamic Clip Path for Main Cake Body */}
                  <clipPath id={bodyClipId}>
                    <path d={bodyPath(cut)} />
                  </clipPath>

                  {/* Fixed Clip Path for Wedge Slice */}
                  <clipPath id="cakeWedgeClip">
                    <path d={sector(R, HALF)} />
                  </clipPath>

                  {/* Realistic Whole Cake Elevation Shadow */}
                  <filter id="cakeBodyShadow" x="-15%" y="-15%" width="130%" height="135%">
                    <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#301612" floodOpacity="0.22" />
                  </filter>

                  {/* Realistic Separated Wedge Slice Shadow */}
                  <filter id="sliceWedgeShadow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="5" dy="12" stdDeviation="10" floodColor="#301612" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Main Cake Body (Photorealistic Clipped Real Image) */}
                <g filter="url(#cakeBodyShadow)">
                  <image
                    href={f.image}
                    x={-R}
                    y={-R}
                    width={2 * R}
                    height={2 * R}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${bodyClipId})`}
                  />
                  {/* Exposed Cream/Cocoa Rim Bevel along Body & Cut Edges */}
                  <path
                    d={bodyPath(cut)}
                    fill="none"
                    stroke={cut !== null ? 'rgba(48, 22, 18, 0.35)' : 'rgba(212, 180, 106, 0.45)'}
                    strokeWidth={cut !== null ? 3 : 2}
                    strokeLinejoin="round"
                  />
                </g>

                {/* Animated Cut Wedge (Real Image Pixels Counter-Rotated to Stay Perfectly Aligned) */}
                {cut !== null && (
                  <g
                    key={cutCount}
                    className="cake-wedge"
                    style={{ '--a': `${cut}deg` } as CSSProperties}
                    filter="url(#sliceWedgeShadow)"
                  >
                    <g clipPath="url(#cakeWedgeClip)">
                      <image
                        href={f.image}
                        x={-R}
                        y={-R}
                        width={2 * R}
                        height={2 * R}
                        preserveAspectRatio="xMidYMid slice"
                        transform={`rotate(${-cut})`}
                      />
                    </g>
                    {/* Crisp Subtle Inner Cut Bevel Highlight */}
                    <path
                      d={sector(R, HALF)}
                      fill="none"
                      stroke="rgba(255, 248, 236, 0.85)"
                      strokeWidth={2}
                      strokeLinejoin="round"
                    />
                  </g>
                )}

                {/* Knife Aim Preview Guide (Direct DOM Transform for 120fps Smoothness) */}
                <g
                  ref={hoverGuideRef}
                  transform="rotate(-38)"
                  pointerEvents="none"
                  style={{ opacity: 0, transition: 'opacity 150ms ease' }}
                >
                  <path
                    d={sector(R + 4, HALF)}
                    fill="rgba(255, 255, 255, 0.14)"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeDasharray="6 5"
                  />
                  {/* Subtle Dark Contrast Dashed Outline Underneath */}
                  <path
                    d={sector(R + 4, HALF)}
                    fill="none"
                    stroke="rgba(48, 22, 18, 0.45)"
                    strokeWidth={1}
                    strokeDasharray="6 5"
                  />
                </g>

                {/* Flying 24K Gold Leaf & Cocoa Shaving Sparks on Cut */}
                <g pointerEvents="none">
                  {sparks.map((p) => (
                    <rect
                      key={p.id}
                      className="cake-spark"
                      x={-6}
                      y={-2.5}
                      width={12}
                      height={5}
                      rx={2}
                      fill={p.fill}
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
            </div>

            {/* Clean Unobtrusive Guidance Pill Below Platter */}
            <div className="-mt-4 relative z-20 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-cream/90 border border-brand-chocolate/12 shadow-xs text-xs font-medium text-[#301612]">
              <Scissors className="w-3.5 h-3.5 text-brand-caramel shrink-0" />
              {cut === null ? (
                <span>
                  <strong className="font-bold">Move over the cake</strong> to aim blade &bull;{' '}
                  <strong className="font-bold">Tap anywhere</strong> to cut a slice
                </span>
              ) : (
                <span>
                  <strong className="font-bold">Slice cut cleanly!</strong> Explore layers or tap cake to slice elsewhere
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Revealed Only When Cake Is Cut */}
          <aside
            aria-live="polite"
            aria-hidden={cut === null}
            className={`lg:col-span-3 order-3 lg:self-start lg:mt-4 transition-all duration-500 ease-out ${
              cut !== null
                ? 'block opacity-100 translate-x-0 pointer-events-auto'
                : 'hidden lg:block lg:opacity-0 lg:translate-x-4 lg:pointer-events-none'
            }`}
          >
            <div className="bg-white border border-brand-gold rounded-3xl p-3.5 sm:p-4 shadow-[0_14px_35px_-10px_rgba(212,180,106,0.3)] ring-1 ring-brand-gold/25">
              {/* Status Badge & Flavour Heading */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border mb-1 bg-emerald-50 text-emerald-800 border-emerald-200">
                    <Sparkles className="w-3 h-3" />
                    <span>Slice Cut &amp; Inspected</span>
                  </span>
                  <h1 className="font-heading text-base sm:text-lg font-bold text-[#301612] leading-tight">
                    {f.name}
                  </h1>
                </div>
              </div>

              {/* Real Inner Slice Photograph (Shown Only When Cake Is Cut) */}
              {cut !== null && (
                <div className="mb-2.5">
                  <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden border border-brand-chocolate/15 shadow-sm bg-brand-cream/30 animate-in fade-in zoom-in-95 duration-300">
                    <img
                      src={f.innerImage}
                      alt={`${f.name} inner slice layers`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-brand-chocolate/10 text-[10px] font-bold text-[#301612] shadow-xs">
                      Freshly Sliced &bull; Inside View
                    </div>
                  </div>
                </div>
              )}

              {/* Layer Ingredients Legend */}
              <ul className="space-y-1 mb-3 text-[11px] text-[#301612] font-medium">
                {f.layers.map((layer, n) => (
                  <li key={n} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm border border-[#301612]/25 shrink-0"
                      style={{ backgroundColor: toColour(layer.fill) }}
                    />
                    <span className="truncate">{layer.name}</span>
                  </li>
                ))}
              </ul>

              {/* Weight & Live Pricing Selector */}
              <div className="mb-3 pt-2.5 border-t border-brand-chocolate/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#5C3D34]">Celebration Size</span>
                  <span className="font-bold text-base text-[#301612]">
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
                        className={`py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#301612] text-white border-[#301612] shadow-xs'
                            : 'bg-brand-cream/40 text-[#301612] border-brand-chocolate/15 hover:border-brand-chocolate/40'
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
                className="w-full py-2.5 px-4 rounded-full bg-[#301612] hover:bg-brand-caramel text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Order This Cake</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="text-[10px] text-[#5C3D34]/75 text-center mt-2 font-medium">
                Baked Fresh Daily &bull; 2-Hr Kerala Delivery
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Trust Highlights Strip */}
        <div className="mt-10 pt-5 border-t border-brand-chocolate/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-[#5C3D34]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-caramel" />
            <span>2-Hour Express Kerala Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-caramel" />
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
