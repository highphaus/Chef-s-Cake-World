'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_CAKES, type CategoryCake } from './flavours';
import './CakeShowcase.css';

const R = 212;

const rel = (i: number, step: number) => (i === step ? 'on' : i < step ? 'past' : 'next');
const getCakePos = (index: number, currentStep: number) => {
  const diff = index - currentStep;
  if (diff === 0) return 'center';
  if (diff === -1) return 'left';
  if (diff === 1) return 'right';
  if (diff < -1) return 'far-left';
  return 'far-right';
};
const vars = (c: CategoryCake) =>
  ({
    '--bg': c.bg,
    '--frost': c.frost,
    '--sponge': c.sponge,
    '--fill': c.fill,
    '--accent': c.accent,
  }) as CSSProperties;

function CakeTop({ cake }: { cake: CategoryCake }) {
  return (
    <div className="cs-cake-card">
      <img
        src={cake.image}
        alt={cake.name}
        className="cs-cake-img"
        loading="eager"
        draggable={false}
      />
      <div className="cs-cake-overlay" />
    </div>
  );
}

type Props = {
  categories?: CategoryCake[];
  flavours?: CategoryCake[];
  orderHref?: string;
  label?: string;
  title?: string;
  badge?: string;
};

export default function CakeShowcase({
  categories = CATEGORY_CAKES,
  flavours,
  orderHref,
  label = 'Explore by Category',
  title = 'Explore by Category',
  badge = 'Curated Ateliers',
}: Props) {
  const items = flavours || categories;
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const totalCount = items.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // DIRECT STEP NAVIGATOR & INSTANT SCROLL POSITION SYNC
  const goToStep = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(totalCount - 1, targetIdx));
    setStep(clamped);
    lastWheelTimeRef.current = Date.now();

    // Instantly sync window scroll position so the browser scrollbar stays aligned without causing animation lag
    if (sectionRef.current && stickyRef.current) {
      const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top - 74;
      const totalScrollable = sectionRef.current.offsetHeight - stickyRef.current.offsetHeight;
      if (totalScrollable > 0) {
        const targetOffset = (clamped / (totalCount - 1)) * totalScrollable;
        window.scrollTo({
          top: sectionTop + targetOffset,
          behavior: 'auto',
        });
      }
    }
  };

  // 1. INSTANT MOUSE WHEEL INTERACTION (ZERO INPUT LAG):
  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 14) return;

      // Allow natural page scroll if at outer bounds
      if (step === 0 && delta < 0) return;
      if (step === totalCount - 1 && delta > 0) return;

      e.preventDefault();

      const now = Date.now();
      // Debounce slightly (200ms) so one wheel notch triggers exactly one step
      if (now - lastWheelTimeRef.current < 200) return;
      lastWheelTimeRef.current = now;

      const nextStep = delta > 0 ? Math.min(totalCount - 1, step + 1) : Math.max(0, step - 1);
      if (nextStep !== step) {
        setStep(nextStep);
        if (sectionRef.current && stickyRef.current) {
          const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top - 74;
          const totalScrollable = sectionRef.current.offsetHeight - stickyRef.current.offsetHeight;
          if (totalScrollable > 0) {
            const targetOffset = (nextStep / (totalCount - 1)) * totalScrollable;
            window.scrollTo({
              top: sectionTop + targetOffset,
              behavior: 'auto',
            });
          }
        }
      }
    };

    stickyEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stickyEl.removeEventListener('wheel', handleWheel);
  }, [step, totalCount]);

  // 2. PASSIVE WINDOW SCROLL POSITION SYNC (RAF DRIVEN - 60/120 FPS):
  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events during wheel or click transitions to avoid feedback loops
      if (Date.now() - lastWheelTimeRef.current < 260) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !stickyRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const stickyH = stickyRef.current.offsetHeight;
        const totalScrollable = rect.height - stickyH;

        if (totalScrollable > 0) {
          if (rect.top <= 76 && rect.top >= 74 - totalScrollable) {
            const progress = Math.min(Math.max((74 - rect.top) / totalScrollable, 0), 1);
            const newStep = Math.min(Math.round(progress * (totalCount - 1)), totalCount - 1);
            setStep((prev) => (prev === newStep ? prev : newStep));
          } else if (rect.top > 76) {
            setStep((prev) => (prev === 0 ? prev : 0));
          } else {
            setStep((prev) => (prev === totalCount - 1 ? prev : totalCount - 1));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
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

    // Detect horizontal or vertical swipe
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && step < totalCount - 1) {
        goToStep(step + 1);
      } else if (diffX < 0 && step > 0) {
        goToStep(step - 1);
      }
    } else if (Math.abs(diffY) > 45) {
      if (diffY > 0 && step < totalCount - 1) {
        goToStep(step + 1);
      } else if (diffY < 0 && step > 0) {
        goToStep(step - 1);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="cs"
      style={
        {
          '--bg': '#FAF8F5',
          height: `calc(350px + ${totalCount * 85}px)`,
        } as CSSProperties
      }
      aria-label={label}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={stickyRef} className="cs-sticky">
        {/* CENTER STAGE: 3D CAROUSEL (BIGGER IN CENTER, PREVIEWS ON LEFT & RIGHT) */}
        <div className="cs-stage">
          {/* SECTION HEADER: "Explore by Category" */}
          <div className="cs-header">
            {badge && <span className="cs-header-badge">{badge}</span>}
            <h2 className="cs-header-title">{title}</h2>
          </div>

          {/* 1. CAROUSEL CAKE DISPLAY */}
          <div className="cs-cakes-wrapper">
            <div className="cs-cakes">
              {items.map((c, i) => {
                const categoryHref = c.slug || orderHref || '/cakes';
                const pos = getCakePos(i, step);
                const isCenter = i === step;
                return (
                  <Link
                    key={c.name}
                    href={categoryHref}
                    onClick={(e) => {
                      if (!isCenter) {
                        e.preventDefault();
                        goToStep(i);
                      }
                    }}
                    className={`cs-cake ${pos}`}
                    style={vars(c)}
                    tabIndex={isCenter ? 0 : -1}
                    aria-label={isCenter ? `Explore ${c.name}` : `View ${c.name} in center`}
                  >
                    <CakeTop cake={c} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 2. CATEGORY NAME, PRICE & EXPLORE BUTTON DIRECTLY UNDER THE CAKE */}
          <div className="cs-category-info" aria-live="polite">
            {items.map((c, i) => {
              const categoryHref = c.slug || orderHref || '/cakes';
              return (
                <div key={c.name} className={`cs-title-wrap ${rel(i, step)}`}>
                  <h2 className="cs-cat-name">
                    {c.name}
                  </h2>

                  <div className="cs-cat-action">
                    <span className="cs-cat-price">From {c.price}</span>
                    <Link
                      href={categoryHref}
                      className="cs-cat-btn"
                      tabIndex={i === step ? 0 : -1}
                    >
                      <span>Explore</span>
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
