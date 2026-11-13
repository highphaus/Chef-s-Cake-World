'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FLAVOURS, toColour, type Flavour } from './flavours';
import './CakeShowcase.css';

const R = 212;
const RIM = 8;
const INK = '#2B1030';
const SPRINKLES = ['#FFFFFF', 'var(--accent)', 'var(--fill)', INK, '#4FD1D9'];
const rd = (n: number) => Math.round(n * 100) / 100;
const pt = (r: number, a: number): [number, number] => [
  rd(r * Math.cos((a * Math.PI) / 180)),
  rd(r * Math.sin((a * Math.PI) / 180)),
];

type Item = { dot: boolean; x: number; y: number; s: number; rot: number; fill: string };
const ITEMS: Item[] = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const out: Item[] = [];
  for (let a = 0; a < 360; a += 6)
    out.push({
      dot: true,
      ...xy(R - 14, a),
      s: 6,
      rot: 0,
      fill: a % 12 ? '#FFFFFF' : 'var(--accent)',
    });
  for (let a = 15; a < 360; a += 30)
    out.push({ dot: true, ...xy(R - 62, a), s: 15, rot: 0, fill: 'var(--fill)' });
  for (let i = 0; i < 70; i++)
    out.push({
      dot: false,
      ...xy(98 + rnd() * (R - 98 - 40), rnd() * 360),
      s: 0,
      rot: rd(rnd() * 180),
      fill: SPRINKLES[i % 5],
    });
  return out;
  function xy(r: number, a: number) {
    const [x, y] = pt(r, a);
    return { x, y };
  }
})();

const rel = (i: number, step: number) => (i === step ? 'on' : i < step ? 'past' : 'next');
const vars = (f: Flavour) =>
  ({
    '--bg': f.bg,
    '--frost': f.frost,
    '--sponge': f.sponge,
    '--fill': f.fill,
    '--accent': f.accent,
  }) as CSSProperties;

function CakeTop({ flavour }: { flavour: Flavour }) {
  const clipId = `cake-photo-clip-${flavour.name.replace(/[^a-zA-Z0-9]/g, '-')}`;

  if (flavour.image) {
    return (
      <svg viewBox="-310 -310 620 620" aria-hidden="true" className="w-full h-full drop-shadow-2xl">
        <defs>
          <clipPath id={clipId}>
            <circle cx="0" cy="0" r={R} />
          </clipPath>
          <filter id={`platter-glow-${clipId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Elegant Bakery Platter */}
        <circle r={285} fill="#FFFFFF" stroke={INK} strokeWidth={3} filter={`url(#platter-glow-${clipId})`} />
        <circle
          r={262}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={8}
          strokeDasharray="4 16"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Photorealistic Real Cake Image Clipped into Circular Base */}
        <g clipPath={`url(#${clipId})`}>
          <image
            href={flavour.image}
            x={-R}
            y={-R}
            width={2 * R}
            height={2 * R}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        {/* Outer Crust Bevel Ring */}
        <circle r={R} fill="none" stroke={INK} strokeWidth={3.5} />
      </svg>
    );
  }

  // Fallback illustrated top
  return (
    <svg viewBox="-310 -310 620 620" aria-hidden="true">
      <circle r={285} fill="#fff" stroke={INK} strokeWidth={3} />
      <circle
        r={262}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={10}
        strokeDasharray="2 16"
        strokeLinecap="round"
      />
      <circle r={R} fill={INK} stroke={INK} strokeWidth={2 * RIM + 4} />
      <circle r={R} fill="var(--frost)" stroke="var(--sponge)" strokeWidth={2 * RIM} paintOrder="stroke" />
      {ITEMS.map((it, i) =>
        it.dot ? (
          <circle key={i} cx={it.x} cy={it.y} r={it.s} fill={it.fill} stroke={INK} strokeWidth={2} />
        ) : (
          <rect
            key={i}
            x={-8}
            y={-3}
            width={16}
            height={6}
            rx={3}
            fill={it.fill}
            stroke={INK}
            strokeWidth={1.5}
            transform={`translate(${it.x} ${it.y}) rotate(${it.rot})`}
          />
        )
      )}
    </svg>
  );
}

type Props = {
  flavours?: Flavour[];
  orderHref?: string;
  label?: string;
};

export default function CakeShowcase({
  flavours = FLAVOURS,
  orderHref = '/cakes',
  label = 'Signature Flavour Showcase',
}: Props) {
  const [step, setStep] = useState(0);
  const marks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.i))
        ),
      { rootMargin: '-50% 0px -50% 0px' }
    );
    marks.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, [flavours.length]);

  const go = (i: number) => {
    marks.current[i]?.scrollIntoView({
      behavior:
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      className="cs"
      style={{ '--bg': flavours[step]?.bg } as CSSProperties}
      aria-label={label}
    >
      <div className="cs-sticky">
        <span className="cs-tag">
          <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-brand-caramel" />
          {label}
        </span>

        <div className="cs-grid">
          {/* LEFT: ROTATING REAL CAKE PLATES */}
          <div className="cs-cakes">
            {flavours.map((f, i) => (
              <div key={f.name} className={`cs-cake ${rel(i, step)}`} style={vars(f)}>
                <CakeTop flavour={f} />
              </div>
            ))}
          </div>

          {/* RIGHT: SLIDING STORY CARDS */}
          <div className="cs-cards" aria-live="polite">
            {flavours.map((f, i) => {
              const cakeHref = f.slug ? `/cakes/${f.slug}` : orderHref;
              return (
                <article key={f.name} className={`cs-card ${rel(i, step)}`} style={vars(f)}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="cs-n">Flavour {i + 1} of {flavours.length}</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-peach/80 text-brand-chocolate">
                      Real Artisan Bake
                    </span>
                  </div>

                  <h3>{f.name}</h3>
                  <p>{f.blurb}</p>

                  <ul>
                    {f.layers.map((l, n) => (
                      <li key={n}>
                        <i style={{ background: toColour(l.fill) }} />
                        <span>{l.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="cs-row pt-2 border-t border-brand-chocolate/15">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-chocolate/60 block">
                        Fresh Daily
                      </span>
                      <strong className="text-sm sm:text-base font-extrabold text-brand-chocolate">
                        From {f.price} per kg
                      </strong>
                    </div>

                    <Link
                      className="cs-btn inline-flex items-center gap-1.5 cursor-pointer"
                      href={cakeHref}
                      tabIndex={i === step ? 0 : -1}
                    >
                      <span>Order This Cake</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* SIDE DOT NAVIGATION */}
        <nav className="cs-dots" aria-label="Flavours">
          {flavours.map((f, i) => (
            <button
              key={f.name}
              type="button"
              aria-label={`Show ${f.name}`}
              aria-current={i === step ? 'true' : undefined}
              onClick={() => go(i)}
              style={{ background: f.bg }}
              className="cursor-pointer"
            />
          ))}
        </nav>
      </div>

      {/* SCROLL TRIGGER MARKS */}
      <div className="cs-marks" aria-hidden="true">
        {flavours.map((f, i) => (
          <div
            key={f.name}
            data-i={i}
            ref={(el) => {
              marks.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
