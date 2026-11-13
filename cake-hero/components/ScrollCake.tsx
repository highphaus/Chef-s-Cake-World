"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FLAVOURS, LAYER_HEIGHTS, toColour, type Flavour } from "@/lib/flavours";
import "./ScrollCake.css";

// One line per layer, bottom to top. Edit this copy with the client's own words.
const NOTES = [
  "The base. A thick sponge, baked in small batches on the day you order.",
  "A layer of cream, whipped fresh so it stays light.",
  "Fruit filling, spread by hand all the way to the edge.",
  "A second sponge, pressed down gently so every slice stays tall.",
  "Buttercream on top, piped and finished with berries and sprinkles.",
];
const SCALE = 2.6, BASE = 300, X = 70, W = 260;

export default function ScrollCake({ flavour = FLAVOURS[0] }: { flavour?: Flavour }) {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Data lists layers top to bottom; the build goes bottom to top.
  const heights = [...LAYER_HEIGHTS].reverse();
  let y = BASE;
  const layers = [...flavour.layers].reverse().map((l, i) => {
    const h = heights[i] * SCALE;
    y -= h;
    return { ...l, y, h };
  });
  const topY = y;
  const last = layers.length - 1;
  const theme = { "--bg": flavour.bg, "--frost": flavour.frost, "--sponge": flavour.sponge, "--fill": flavour.fill, "--accent": flavour.accent } as CSSProperties;

  return (
    <section className="sc" style={theme} aria-labelledby="sc-h">
      <div className="sc-head">
        <h2 id="sc-h">How your cake comes together</h2>
        <p>Scroll to build it, one layer at a time.</p>
      </div>

      <div className="sc-grid">
        <div className="sc-stage">
          <svg viewBox="0 0 400 360" aria-hidden="true">
            <ellipse cx={200} cy={314} rx={190} ry={26} fill="#fff" stroke="#2B1030" strokeWidth={3} />
            <ellipse cx={200} cy={314} rx={170} ry={20} fill="none" stroke="var(--accent)" strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
            {layers.map((l, i) => (
              <g key={i} className={`sc-lay${step >= i ? " on" : ""}`}>
                <rect x={X} y={l.y} width={W} height={l.h} rx={i === last ? 14 : 4} fill={toColour(l.fill)} stroke="#2B1030" strokeWidth={3} />
              </g>
            ))}
            <g className={`sc-top${step >= last ? " on" : ""}`}>
              {[110, 150, 190, 230, 270, 300].map((x) => (
                <circle key={x} cx={x} cy={topY + 4} r={8} fill="#fff" stroke="#2B1030" strokeWidth={2} />
              ))}
              {[115, 200, 285].map((x) => (
                <circle key={x} cx={x} cy={topY - 10} r={15} fill="var(--fill)" stroke="#2B1030" strokeWidth={2.5} />
              ))}
              {[[140, 22, 20], [172, 34, -30], [228, 20, 40], [262, 36, 10], [100, 38, -20]].map(([x, dy, r]) => (
                <rect key={x} x={-7} y={-3} width={14} height={6} rx={3} fill="var(--accent)" stroke="#2B1030" strokeWidth={1.5} transform={`translate(${x} ${topY + dy}) rotate(${r})`} />
              ))}
            </g>
          </svg>
        </div>

        <ol className="sc-steps">
          {layers.map((l, i) => (
            <li key={i} data-i={i} ref={(el) => { refs.current[i] = el; }} className={step === i ? "on" : ""} aria-current={step === i ? "step" : undefined}>
              <div className="sc-card">
                <span className="sc-n">Layer {i + 1} of {layers.length}</span>
                <h3>{l.name}</h3>
                <p>{NOTES[i]}</p>
                {i === last && <a className="btn" href="#order">Order this cake</a>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
