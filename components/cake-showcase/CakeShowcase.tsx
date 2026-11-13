'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_CAKES, type CategoryCake } from './flavours';
import './CakeShowcase.css';

const R = 212;

const rel = (i: number, step: number) => (i === step ? 'on' : i < step ? 'past' : 'next');
const vars = (c: CategoryCake) =>
  ({
    '--bg': c.bg,
    '--frost': c.frost,
    '--sponge': c.sponge,
    '--fill': c.fill,
    '--accent': c.accent,
  }) as CSSProperties;

function CakeTop({ cake }: { cake: CategoryCake }) {
  const clipId = `showcase-clip-${cake.name.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <svg
      viewBox="-225 -225 450 450"
      aria-hidden="true"
      className="w-full h-full drop-shadow-[0_28px_45px_rgba(0,0,0,0.48)]"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="0" cy="0" r={R} />
        </clipPath>
      </defs>

      {/* Photorealistic Category Cake Image Clipped into Circular Base */}
      {cake.image ? (
        <g clipPath={`url(#${clipId})`}>
          <image
            href={cake.image}
            x={-R}
            y={-R}
            width={2 * R}
            height={2 * R}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      ) : (
        <circle r={R} fill="var(--frost)" stroke="var(--sponge)" strokeWidth={8} paintOrder="stroke" />
      )}
    </svg>
  );
}

type Props = {
  categories?: CategoryCake[];
  flavours?: CategoryCake[];
  orderHref?: string;
  label?: string;
};

export default function CakeShowcase({
  categories = CATEGORY_CAKES,
  flavours,
  orderHref,
  label = 'Artisan Cake Categories',
}: Props) {
  const items = flavours || categories;
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const isTransitioningRef = useRef(false);
  const totalCount = items.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. DIRECT MOUSE WHEEL INTERACTION:
  // Rolling the wheel inside the sticky showcase advances/rewinds cake categories
  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      // Allow natural page scroll if at bounds
      if (step === 0 && delta < 0) return;
      if (step === totalCount - 1 && delta > 0) return;

      // Intercept wheel to step through categories smoothly
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
  // When scrolling via scrollbar or page scroll, sync the active category step
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

  return (
    <section
      ref={sectionRef}
      className="cs"
      style={
        {
          '--bg': items[step]?.bg,
          height: `${totalCount * 100}vh`,
        } as CSSProperties
      }
      aria-label={label}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={stickyRef} className="cs-sticky">
        {/* TOP BAR: QUICK CATEGORY SELECTOR PILLS */}
        <div className="cs-top-bar">
          <div className="cs-flavour-pills">
            {items.map((c, i) => {
              const isActive = i === step;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`cs-pill ${isActive ? 'active' : ''}`}
                >
                  {c.shortName || c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER STAGE: BIGGER CAKE + CATEGORY NAME DIRECTLY UNDER (NO BIG BOX) */}
        <div className="cs-stage">
          {/* 1. LARGER ROTATING CATEGORY CAKE IN CENTER */}
          <div className="cs-cakes-wrapper">
            <div className="cs-cakes">
              {items.map((c, i) => (
                <div key={c.name} className={`cs-cake ${rel(i, step)}`} style={vars(c)}>
                  <CakeTop cake={c} />
                </div>
              ))}
            </div>
          </div>

          {/* 2. CATEGORY NAME & ACTION DIRECTLY UNDER THE CAKE */}
          <div className="cs-category-info" aria-live="polite">
            {items.map((c, i) => {
              const categoryHref = c.slug || orderHref || '/cakes';
              return (
                <div key={c.name} className={`cs-title-wrap ${rel(i, step)}`}>
                  <span className="cs-cat-tag">Category {i + 1} of {totalCount}</span>
                  <h2 className="cs-cat-name">
                    {c.name}
                  </h2>
                  <p className="cs-cat-blurb">
                    {c.blurb}
                  </p>

                  <div className="cs-cat-action">
                    <span className="cs-cat-price">From {c.price}</span>
                    <Link
                      href={categoryHref}
                      className="cs-cat-btn"
                      tabIndex={i === step ? 0 : -1}
                    >
                      <span>Explore {c.shortName || 'Category'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
