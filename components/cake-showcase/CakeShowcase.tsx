'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { FLAVOURS, toColour, type Flavour } from './flavours';
import './CakeShowcase.css';

const R = 212;
const INK = '#2B1030';

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
  const clipId = `showcase-clip-${flavour.name.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <svg viewBox="-310 -310 620 620" aria-hidden="true" className="w-full h-full drop-shadow-2xl">
      <defs>
        <clipPath id={clipId}>
          <circle cx="0" cy="0" r={R} />
        </clipPath>
        <filter id={`platter-glow-${clipId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* Outer Platter Edge */}
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
      {flavour.image ? (
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
      ) : (
        <circle r={R} fill="var(--frost)" stroke="var(--sponge)" strokeWidth={16} paintOrder="stroke" />
      )}

      {/* Outer Crust Bevel Ring */}
      <circle r={R} fill="none" stroke={INK} strokeWidth={3.5} />
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const isTransitioningRef = useRef(false);
  const totalCount = flavours.length;

  // 1. DIRECT MOUSE WHEEL INTERACTION:
  // Rolling the wheel inside the sticky showcase immediately advances/rewinds cakes!
  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      // Allow natural page scroll if at bounds
      if (step === 0 && delta < 0) return;
      if (step === totalCount - 1 && delta > 0) return;

      // Intercept wheel to step through cakes smoothly
      e.preventDefault();
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      if (delta > 0) {
        setStep((prev) => Math.min(totalCount - 1, prev + 1));
      } else {
        setStep((prev) => Math.max(0, prev - 1));
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    };

    stickyEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stickyEl.removeEventListener('wheel', handleWheel);
  }, [step, totalCount]);

  // 2. WINDOW SCROLL POSITION SYNC:
  // When scrolling via scrollbar or page scroll, sync the active cake step
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable > 0 && rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 0.999);
        const newStep = Math.min(Math.floor(progress * totalCount), totalCount - 1);
        setStep(newStep);
      } else if (rect.top > 0) {
        setStep(0);
      } else if (rect.bottom < window.innerHeight) {
        setStep(totalCount - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalCount]);

  // 3. TOUCH SWIPE INTERACTION:
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Detect horizontal swipe or vertical swipe
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setStep((prev) => Math.min(totalCount - 1, prev + 1));
      } else {
        setStep((prev) => Math.max(0, prev - 1));
      }
    } else if (Math.abs(diffY) > 50) {
      if (diffY > 0 && step < totalCount - 1) {
        setStep((prev) => Math.min(totalCount - 1, prev + 1));
      } else if (diffY < 0 && step > 0) {
        setStep((prev) => Math.max(0, prev - 1));
      }
    }
  };

  // 4. DIRECT STEP SELECTOR:
  const goToStep = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(totalCount - 1, targetIdx));
    setStep(clamped);

    // Sync window scroll smoothly if applicable
    if (sectionRef.current) {
      const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top;
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const targetOffset = (clamped / totalCount) * totalScrollable;
        window.scrollTo({
          top: sectionTop + targetOffset + 15,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleNext = () => goToStep(step + 1);
  const handlePrev = () => goToStep(step - 1);

  return (
    <section
      ref={sectionRef}
      className="cs"
      style={
        {
          '--bg': flavours[step]?.bg,
          height: `${totalCount * 100}vh`,
        } as CSSProperties
      }
      aria-label={label}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={stickyRef} className="cs-sticky">
        {/* TOP BAR: LABEL & QUICK FLAVOUR SELECTOR PILLS */}
        <div className="cs-top-bar">
          <span className="cs-tag">
            <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
            <span>{label}</span>
          </span>

          <div className="cs-flavour-pills">
            {flavours.map((f, i) => {
              const isActive = i === step;
              return (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`cs-pill ${isActive ? 'active' : ''}`}
                >
                  {f.name.split(' ')[0]} {f.name.split(' ')[1] || ''}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cs-grid">
          {/* LEFT: ROTATING REAL CAKE PLATES WITH DIRECT ARROW CONTROLS */}
          <div className="cs-cakes-wrapper">
            <div className="cs-cakes">
              {flavours.map((f, i) => (
                <div key={f.name} className={`cs-cake ${rel(i, step)}`} style={vars(f)}>
                  <CakeTop flavour={f} />
                </div>
              ))}
            </div>

            {/* PREV / NEXT DIRECT CONTROLS */}
            <div className="cs-arrows">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0}
                className="cs-arrow-btn"
                title="Previous Cake"
                style={{
                  opacity: step === 0 ? 0.4 : 1,
                  cursor: step === 0 ? 'default' : 'pointer',
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="cs-arrow-indicator">
                Cake {step + 1} of {totalCount}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={step === totalCount - 1}
                className="cs-arrow-btn"
                title="Next Cake"
                style={{
                  opacity: step === totalCount - 1 ? 0.4 : 1,
                  cursor: step === totalCount - 1 ? 'default' : 'pointer',
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT: SLIDING STORY CARDS */}
          <div className="cs-cards" aria-live="polite">
            {flavours.map((f, i) => {
              const cakeHref = f.slug ? `/cakes/${f.slug}` : orderHref;
              return (
                <article key={f.name} className={`cs-card ${rel(i, step)}`} style={vars(f)}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="cs-n">Flavour {i + 1} of {totalCount}</span>
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

                  <div className="cs-row pt-3 border-t border-brand-chocolate/15">
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
      </div>
    </section>
  );
}
