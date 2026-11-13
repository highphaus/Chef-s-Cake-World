'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import './ScrollCake.css';

export type CakeFlavourModel = {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  price: string;
  badge: string;
  image: string;
  aspect: string;
  slug: string;
  tasteMetrics: {
    sweetness: string;
    richness: string;
    lightness: string;
  };
  layers: {
    number: number;
    title: string;
    role: string;
    summary: string;
    craftDetails: string;
    ingredients: string[];
    bakerSecret: string;
    // Normalized hotspot on the real image (percentage)
    highlightArea: {
      top: string;
      height: string;
      left: string;
      width: string;
    };
    pinPosition: {
      top: string;
      left: string;
    };
  }[];
};

const FLAVOURS: CakeFlavourModel[] = [
  {
    id: 'belgian-truffle',
    name: 'Royal Belgian Chocolate Truffle',
    shortName: 'Belgian Truffle',
    subtitle: 'Crafted with 70% Single-Origin Callebaut Couverture & Dutch Cocoa',
    price: '₹699',
    badge: 'Bestseller • 100% Belgian Cocoa',
    image: '/hero section/Cut inner/6d7a427cd0c48be5f486a4220aa6a805.jpg',
    aspect: 'aspect-[4/5]',
    slug: 'royal-belgian-chocolate-truffle-cake',
    tasteMetrics: {
      sweetness: 'Balanced 60%',
      richness: 'Deep 95%',
      lightness: 'Velvety 80%',
    },
    layers: [
      {
        number: 1,
        title: 'Dutch-Processed Base Sponge',
        role: 'Foundation Tier',
        summary: 'Deep, moisture-rich dark cocoa crumb baked fresh every morning at 5:00 AM.',
        craftDetails:
          'We use imported alkalized Dutch cocoa blended with slow-churned sweet cream butter. Baked low and slow to ensure zero crumbly dryness.',
        ingredients: ['Dutch Cocoa', 'Farm Butter', 'Madagascar Vanilla Pods'],
        bakerSecret: 'Soaked with warm Madagascar vanilla simple syrup while still cooling.',
        highlightArea: { top: '70%', height: '24%', left: '10%', width: '80%' },
        pinPosition: { top: '78%', left: '35%' },
      },
      {
        number: 2,
        title: 'Aerated Truffle Cream Mousse',
        role: 'Whipped Middle Band',
        summary: 'Cloud-soft European dairy cream folded with warm milk chocolate ganache.',
        craftDetails:
          'Whipping cream aerated to exactly 70% overrun, creating a silken, melt-on-the-tongue contrast to the rich sponge tiers.',
        ingredients: ['100% Dairy Cream', 'Milk Chocolate Ganache', 'Bourbon Vanilla'],
        bakerSecret: 'Chilled for precisely 4 hours before the second tier assembly.',
        highlightArea: { top: '56%', height: '14%', left: '8%', width: '82%' },
        pinPosition: { top: '62%', left: '48%' },
      },
      {
        number: 3,
        title: 'Second Moist Cocoa Sponge',
        role: 'Core Structural Tier',
        summary: 'Light yet sturdy dark cocoa sponge that maintains slice height and humidity.',
        craftDetails:
          'Pressed down by hand with delicate, calibrated pressure so each cake slice remains architectural on your plate.',
        ingredients: ['Dark Cocoa', 'Free-Range Flour', 'Brown Sugar Caramel'],
        bakerSecret: 'Contains micro-perforations to absorb the ganache from adjacent layers.',
        highlightArea: { top: '38%', height: '18%', left: '8%', width: '80%' },
        pinPosition: { top: '44%', left: '38%' },
      },
      {
        number: 4,
        title: 'Upper Ganache Frosting Band',
        role: 'Silken Cream Barrier',
        summary: 'A velvety dairy cream band locking in the internal humidity of the centerpiece.',
        craftDetails:
          'Blended fresh daily in small 5-kg batches using pasteurized European dairy to prevent graininess.',
        ingredients: ['Heavy Whipping Cream', 'Pure Cane Sugar', 'White Chocolate'],
        bakerSecret: 'Whipped at 4°C to achieve pristine piping stiffness without synthetic stabilizers.',
        highlightArea: { top: '24%', height: '14%', left: '8%', width: '80%' },
        pinPosition: { top: '28%', left: '52%' },
      },
      {
        number: 5,
        title: 'Hand-Piped Rosettes & Callebaut Drops',
        role: 'Crowning Finish',
        summary: 'Intricate Swiss cream rosettes showered with Belgian chocolate drops.',
        craftDetails:
          'Each slice is hand-piped by senior pâtissiers with bespoke star nozzles and scattered with tempered 70% Callebaut chips.',
        ingredients: ['Swiss Buttercream', 'Tempered Callebaut Drops', 'Edible Gold Dust'],
        bakerSecret: 'Garnished minutes before cold-chain packing for peak visual crispness.',
        highlightArea: { top: '4%', height: '20%', left: '12%', width: '76%' },
        pinPosition: { top: '12%', left: '50%' },
      },
    ],
  },
  {
    id: 'vanilla-royale',
    name: 'Madagascar Vanilla & White Blossom',
    shortName: 'Vanilla Blossom',
    subtitle: 'Golden Vanilla Sponge, Swiss Cream & White Chocolate Ribbons',
    price: '₹649',
    badge: 'Artisan Classic • Handcrafted',
    image: '/hero section/Cut inner/4f1706623960289a6c81ea446e9baef1.jpg',
    aspect: 'aspect-[3/2]',
    slug: 'grand-tiered-golden-wedding-masterpiece',
    tasteMetrics: {
      sweetness: 'Delicate 55%',
      richness: 'Buttery 75%',
      lightness: 'Cloud-Soft 95%',
    },
    layers: [
      {
        number: 1,
        title: 'Golden Bourbon Vanilla Sponge Base',
        role: 'Foundation Tier',
        summary: 'Sun-golden crumb speckled with genuine Madagascar bourbon vanilla bean caviar.',
        craftDetails:
          'Prepared using unbleached pastry flour, farm-fresh cultured butter, and pure bourbon vanilla bean extract.',
        ingredients: ['Madagascar Vanilla Caviar', 'Cultured Farm Butter', 'Pastry Flour'],
        bakerSecret: 'Double-sifted dry ingredients prevent dense spots, yielding a pillow-soft bite.',
        highlightArea: { top: '68%', height: '18%', left: '32%', width: '48%' },
        pinPosition: { top: '74%', left: '52%' },
      },
      {
        number: 2,
        title: 'Whipped Mascarpone Cream Band',
        role: 'Lower Cream Tier',
        summary: 'Lightly sweetened dairy cream with Italian mascarpone for subtle, clean richness.',
        craftDetails:
          'Whipped slowly to create dense micro-bubbles that hold their shape without gelatin or animal derivatives.',
        ingredients: ['Italian Mascarpone', 'European Cream', 'Pure Vanilla'],
        bakerSecret: 'Infused with cold-pressed orange blossom water for a subtle aroma.',
        highlightArea: { top: '56%', height: '12%', left: '32%', width: '48%' },
        pinPosition: { top: '61%', left: '55%' },
      },
      {
        number: 3,
        title: 'Middle Golden Sponge Tier',
        role: 'Core Balance',
        summary: 'Uniformly sliced sponge tier soaked in aromatic floral simple syrup.',
        craftDetails:
          'Precision wire-cut to ensure 100% horizontal alignment across all 5 celebratory layers.',
        ingredients: ['Golden Sponge', 'Blossom Syrup', 'Sweet Butter'],
        bakerSecret: 'Brushed with syrup within 30 seconds of cutting to lock in springiness.',
        highlightArea: { top: '44%', height: '12%', left: '32%', width: '48%' },
        pinPosition: { top: '48%', left: '50%' },
      },
      {
        number: 4,
        title: 'Silken Upper Whipped Crème',
        role: 'Upper Velvet Barrier',
        summary: 'Smooth white cream layer that seals the cake and provides a feather-light texture.',
        craftDetails:
          'Light and airy, creating the signature melt-in-the-mouth texture Chef’s Cake World is celebrated for.',
        ingredients: ['Fresh Dairy Crème', 'Confectioners Sugar', 'Vanilla'],
        bakerSecret: 'Aerated with zero vegetable shortenings or hydrogenated oils.',
        highlightArea: { top: '32%', height: '12%', left: '32%', width: '48%' },
        pinPosition: { top: '37%', left: '54%' },
      },
      {
        number: 5,
        title: 'Curled White Chocolate & Glazed Cherry',
        role: 'Crowning Finish',
        summary: 'Hand-planed Belgian white chocolate curls crowned with a glossy preserved cherry.',
        craftDetails:
          'Belgian white chocolate tempered and shaved with artisan paring tools, topped with a cocktail cherry.',
        ingredients: ['White Chocolate Ribbons', 'Glazed Cherry', 'Vanilla Buttercream'],
        bakerSecret: 'White chocolate curls are planed at exactly 22°C for delicate spirals.',
        highlightArea: { top: '10%', height: '22%', left: '36%', width: '44%' },
        pinPosition: { top: '18%', left: '56%' },
      },
    ],
  },
  {
    id: 'chef-signature',
    name: 'Chef’s Signature Black Forest & Truffle',
    shortName: 'Chef’s Atelier',
    subtitle: 'Our Flagship Masterpiece • "Slice the best, just bite into it"',
    price: '₹799',
    badge: 'Chef’s Signature • Real Poster Cut',
    image: '/story/ccstory23.jpg',
    aspect: 'aspect-[9/16]',
    slug: 'classic-black-forest-cherry-royale',
    tasteMetrics: {
      sweetness: 'Harmonious 65%',
      richness: 'Decadent 90%',
      lightness: 'Airy 85%',
    },
    layers: [
      {
        number: 1,
        title: 'Hand-Held Artisan Dark Cocoa Base',
        role: 'Foundation Tier',
        summary: 'Architectural cocoa crumb strong enough to hold tall multi-tiered elevation.',
        craftDetails:
          'Formulated specifically to ensure zero sagging or compression even during delivery across Attingal.',
        ingredients: ['Dark Cocoa', 'Single-Origin Butter', 'Bourbon Vanilla'],
        bakerSecret: 'Chilled in temperature-monitored display cases at 2°C.',
        highlightArea: { top: '65%', height: '18%', left: '26%', width: '46%' },
        pinPosition: { top: '72%', left: '45%' },
      },
      {
        number: 2,
        title: 'Crushed Oreo & Truffle Cream Band',
        role: 'Crunch & Cream Core',
        summary: 'Rich whipped cream swirled with crushed cookie crumbles and dark truffle.',
        craftDetails:
          'Combines textural crunch with velvety dairy cream for the ultimate celebration mouthfeel.',
        ingredients: ['Oreo Cookie Crunch', 'Whipped European Cream', 'Dark Truffle'],
        bakerSecret: 'Cookies are folded in at the final second to maintain distinct crispness.',
        highlightArea: { top: '52%', height: '13%', left: '26%', width: '46%' },
        pinPosition: { top: '58%', left: '46%' },
      },
      {
        number: 3,
        title: 'Dark Cocoa Middle Tier',
        role: 'Balance Sponge',
        summary: 'Deep Dutch-processed cocoa crumb providing contrast to sweet cream layers.',
        craftDetails:
          'Moist, tender crumb that melts alongside the rich chocolate fillings.',
        ingredients: ['Dutch Cocoa', 'Pastry Flour', 'Vanilla Bean Reduction'],
        bakerSecret: 'Infused with cherry reduction syrup.',
        highlightArea: { top: '40%', height: '12%', left: '26%', width: '46%' },
        pinPosition: { top: '45%', left: '45%' },
      },
      {
        number: 4,
        title: 'Upper Whipped Mousse Band',
        role: 'Top Cream Tier',
        summary: 'Silky, immaculate dairy cream band that complements the dark cocoa.',
        craftDetails:
          'Whipped to stiff, satiny peaks using 100% dairy fat.',
        ingredients: ['Dairy Cream', 'Pure Vanilla', 'Sweet Butter'],
        bakerSecret: 'Provides clean structural separation between crumb layers.',
        highlightArea: { top: '30%', height: '10%', left: '26%', width: '46%' },
        pinPosition: { top: '34%', left: '46%' },
      },
      {
        number: 5,
        title: 'Swiss Frosting Rosettes & Crown Cherry',
        role: 'Crowning Finish',
        summary: 'Piped Swiss meringue frosting with a glistening stemmed red cherry.',
        craftDetails:
          'The iconic crown of Chef’s Cake World: "Slice the best, just bite into it."',
        ingredients: ['Stemmed Morello Cherry', 'Piped Swiss Buttercream', 'Fluted Frosting'],
        bakerSecret: 'Crowned with hand-selected bright red cherries with intact natural stems.',
        highlightArea: { top: '14%', height: '16%', left: '20%', width: '45%' },
        pinPosition: { top: '20%', left: '40%' },
      },
    ],
  },
];

export default function ScrollCake() {
  const [flavorIdx, setFlavorIdx] = useState(0);
  const [activeLayerNum, setActiveLayerNum] = useState(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentFlavor = FLAVOURS[flavorIdx];
  const activeLayer =
    currentFlavor.layers.find((l) => l.number === activeLayerNum) || currentFlavor.layers[0];

  // Observe scrolling steps and activate corresponding layer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNum = Number((entry.target as HTMLElement).dataset.step);
            if (!isNaN(stepNum)) {
              setActiveLayerNum(stepNum);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px' }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [flavorIdx]);

  const handleLayerClick = (num: number) => {
    setActiveLayerNum(num);
    const targetEl = stepRefs.current[num - 1];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    const nextNum = activeLayerNum < 5 ? activeLayerNum + 1 : 1;
    handleLayerClick(nextNum);
  };

  const handlePrev = () => {
    const prevNum = activeLayerNum > 1 ? activeLayerNum - 1 : 5;
    handleLayerClick(prevNum);
  };

  return (
    <section className="sc-section" aria-labelledby="anatomy-heading">
      <div className="sc-container">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-caramel/10 border border-brand-caramel/25 text-brand-caramel text-xs font-bold uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Cake Anatomy</span>
          </div>

          <h2
            id="anatomy-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-chocolate tracking-tight"
          >
            How Your Cake Comes Together
          </h2>

          <p className="font-body text-sm sm:text-base text-brand-chocolate/75 mt-3 leading-relaxed">
            Click any layer or scroll down to explore the authentic interior of our artisan cakes.
            From 5:00 AM freshly-baked sponge to 70% Callebaut ganache and hand-piped rosettes.
          </p>

          {/* FLAVOUR SELECTOR TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-brand-cream/90 border border-brand-chocolate/10 rounded-2xl max-w-xl mx-auto shadow-2xs">
            {FLAVOURS.map((f, idx) => {
              const isSelected = flavorIdx === idx;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFlavorIdx(idx);
                    setActiveLayerNum(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-chocolate text-white shadow-sm'
                      : 'text-brand-chocolate/70 hover:text-brand-chocolate hover:bg-white/70'
                  }`}
                >
                  {f.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: STICKY REAL PHOTO INSPECTOR (5 COLS ON DESKTOP) */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-brand-chocolate/15 p-5 sm:p-6 shadow-xl relative overflow-hidden">
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-caramel block">
                    {currentFlavor.badge}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-chocolate leading-tight">
                    {currentFlavor.name}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-extrabold text-brand-chocolate block">
                    {currentFlavor.price}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    Freshly Sliced
                  </span>
                </div>
              </div>

              {/* REAL PHOTO STAGE WITH INTERACTIVE HOTSPOT HIGHLIGHT */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-brand-cream/60 border border-brand-chocolate/10 shadow-inner group">
                <div className={`relative w-full ${currentFlavor.aspect} max-h-[460px] mx-auto`}>
                  <Image
                    src={currentFlavor.image}
                    alt={currentFlavor.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority
                  />

                  {/* ACTIVE LAYER ILLUMINATED BOUNDING BOX */}
                  <div
                    className="absolute border-2 border-brand-caramel bg-brand-caramel/15 backdrop-brightness-110 rounded-xl transition-all duration-500 ease-out pointer-events-none shadow-[0_0_20px_rgba(212,180,106,0.45)]"
                    style={{
                      top: activeLayer.highlightArea.top,
                      height: activeLayer.highlightArea.height,
                      left: activeLayer.highlightArea.left,
                      width: activeLayer.highlightArea.width,
                    }}
                  />

                  {/* PULSING PIN ANNOTATION ON THE REAL PHOTO */}
                  <div
                    className="absolute z-20 transition-all duration-500 ease-out transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      top: activeLayer.pinPosition.top,
                      left: activeLayer.pinPosition.left,
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-7 h-7 rounded-full bg-brand-caramel/40 animate-ping" />
                      <div className="relative w-5 h-5 rounded-full bg-brand-caramel text-brand-chocolate font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-md">
                        {activeLayer.number}
                      </div>
                    </div>
                  </div>

                  {/* FLOATING ACTIVE LAYER TITLE PILL */}
                  <div className="absolute bottom-3 left-3 right-3 bg-brand-chocolate/90 backdrop-blur-md text-white rounded-xl py-2 px-3.5 flex items-center justify-between text-xs shadow-lg">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full bg-brand-caramel text-brand-chocolate font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {activeLayer.number}
                      </span>
                      <span className="font-semibold truncate">{activeLayer.title}</span>
                    </div>
                    <span className="text-[10px] text-brand-cream/80 uppercase font-bold tracking-wider flex-shrink-0">
                      Layer {activeLayer.number} of 5
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK JUMP LAYER SELECTOR PILLS */}
              <div className="mt-4 pt-4 border-t border-brand-chocolate/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-brand-chocolate/70">
                    Jump to Layer:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-1 rounded-lg border border-brand-chocolate/15 hover:bg-brand-cream text-brand-chocolate transition-colors cursor-pointer"
                      title="Previous Layer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1 rounded-lg border border-brand-chocolate/15 hover:bg-brand-cream text-brand-chocolate transition-colors cursor-pointer"
                      title="Next Layer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {currentFlavor.layers.map((l) => {
                    const isCur = l.number === activeLayerNum;
                    return (
                      <button
                        key={l.number}
                        type="button"
                        onClick={() => handleLayerClick(l.number)}
                        className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isCur
                            ? 'bg-brand-chocolate text-white shadow-sm ring-2 ring-brand-caramel'
                            : 'bg-brand-cream/70 text-brand-chocolate/75 hover:bg-brand-cream hover:text-brand-chocolate border border-brand-chocolate/10'
                        }`}
                      >
                        <span className="block text-[9px] uppercase tracking-wider opacity-75">
                          L{l.number}
                        </span>
                        <span className="block truncate text-[11px]">
                          {l.role.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SENSORY TASTE METRICS */}
              <div className="mt-4 p-3.5 bg-brand-cream/60 rounded-xl border border-brand-chocolate/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-caramel block">
                    Sweetness
                  </span>
                  <span className="text-xs font-bold text-brand-chocolate">
                    {currentFlavor.tasteMetrics.sweetness}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-caramel block">
                    Richness
                  </span>
                  <span className="text-xs font-bold text-brand-chocolate">
                    {currentFlavor.tasteMetrics.richness}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-caramel block">
                    Texture
                  </span>
                  <span className="text-xs font-bold text-brand-chocolate">
                    {currentFlavor.tasteMetrics.lightness}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING STORY CARDS (7 COLS ON DESKTOP) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8">
            {currentFlavor.layers.map((l, idx) => {
              const isSelected = l.number === activeLayerNum;
              return (
                <div
                  key={l.number}
                  data-step={l.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`sc-step-item ${isSelected ? 'active' : ''}`}
                >
                  <div
                    onClick={() => setActiveLayerNum(l.number)}
                    className="sc-step-card rounded-3xl p-6 sm:p-7 border transition-all duration-300 w-full cursor-pointer"
                  >
                    {/* Layer Header */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-caramel text-brand-chocolate font-bold text-xs flex items-center justify-center">
                          {l.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-caramel">
                          {l.role}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-chocolate/60 bg-brand-cream px-2.5 py-1 rounded-full border border-brand-chocolate/10">
                        Step {l.number} of 5
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-chocolate mb-2">
                      {l.title}
                    </h3>

                    <p className="font-body text-sm sm:text-base text-brand-chocolate/80 leading-relaxed mb-4">
                      {l.summary}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed bg-brand-cream/40 p-3.5 rounded-xl border border-brand-chocolate/10 mb-4">
                      {l.craftDetails}
                    </p>

                    {/* Ingredients & Baker's Secret */}
                    <div className="space-y-2 pt-2 border-t border-brand-chocolate/10">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="font-bold text-brand-chocolate mr-1">
                          Craft Ingredients:
                        </span>
                        {l.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-white border border-brand-chocolate/15 text-brand-chocolate font-medium text-[11px] shadow-2xs"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 text-xs text-brand-chocolate/75 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-caramel flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-brand-chocolate font-semibold">
                            Baker’s Secret:
                          </strong>{' '}
                          {l.bakerSecret}
                        </span>
                      </div>
                    </div>

                    {/* Final Step Call To Action */}
                    {l.number === 5 && (
                      <div className="mt-6 pt-5 border-t border-brand-chocolate/15 space-y-3">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <Link
                            href={`/cakes/${currentFlavor.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-chocolate text-white text-xs sm:text-sm font-bold hover:bg-brand-caramel transition-all duration-200 shadow-md cursor-pointer"
                          >
                            <span>Order {currentFlavor.shortName} ({currentFlavor.price})</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href="/custom-cakes"
                            className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-brand-chocolate/25 text-brand-chocolate text-xs sm:text-sm font-bold hover:bg-brand-cream transition-all duration-200 cursor-pointer"
                          >
                            Custom Tier Consultation
                          </Link>
                        </div>
                        <p className="text-[11px] text-brand-chocolate/60 text-center sm:text-left">
                          Baked the morning of delivery • 100% vegetarian / eggless options available.
                        </p>
                      </div>
                    )}
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
