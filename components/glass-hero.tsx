"use client";

import { useEffect, useRef } from "react";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

const NAME = "NITYANAND YADAV";

// Nav "Let's talk" button — point this at whichever profile/contact you want
// people to reach you through (LinkedIn, X/Twitter, Instagram, mailto, etc.)
const TALK_LINK = "https://www.linkedin.com/in/your-handle";

// Bottom-left "Explore my work" button — point this at your work: GitHub,
// a portfolio site, Behance/Dribbble, an Instagram grid, etc.
const WORK_LINK = "/work";

const HEADLINE_LINES = ["Building", "Beyond", "Possible."];
const INTRO_LINE =
  "I build interfaces where engineering precision meets human detail.";
const TAGLINE_LINES = ["BUILDING THE", "NEXT VERSION", "IN PUBLIC"];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Experiments", href: "#experiments" },
];

type Point = { x: number; y: number };

function isMobileLayout() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px) and (orientation: portrait)")
    .matches;
}

function targetRadiusForViewport() {
  return isMobileLayout() ? MOBILE_RADIUS : DESKTOP_RADIUS;
}

export default function GlassHero() {
  const heroRef = useRef<HTMLElement | null>(null);

  // Pointer + animation state lives entirely in refs so pointer movement
  // and the rAF loop never trigger a React re-render.
  const rawPos = useRef<Point>({ x: -999, y: -999 });
  const smoothPos = useRef<Point>({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouching = useRef(false);
  const rafId = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const loop = () => {
      const posFactor = reducedMotion.current ? 1 : 0.14;
      const radiusFactor = reducedMotion.current ? 1 : 0.12;

      smoothPos.current.x +=
        (rawPos.current.x - smoothPos.current.x) * posFactor;
      smoothPos.current.y +=
        (rawPos.current.y - smoothPos.current.y) * posFactor;
      currentRadius.current +=
        (targetRadius.current - currentRadius.current) * radiusFactor;

      hero.style.setProperty("--reveal-x", `${smoothPos.current.x}px`);
      hero.style.setProperty("--reveal-y", `${smoothPos.current.y}px`);
      hero.style.setProperty(
        "--reveal-radius",
        `${Math.max(currentRadius.current, 0)}px`
      );

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    rawPos.current = { x: e.clientX, y: e.clientY };
    targetRadius.current = targetRadiusForViewport();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      rawPos.current = { x: e.clientX, y: e.clientY };
      return;
    }
    if (isTouching.current) {
      rawPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    targetRadius.current = 0;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") return;
    isTouching.current = true;
    const el = e.currentTarget;
    if (el.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture isn't available on every device; safe to ignore.
      }
    }
    rawPos.current = { x: e.clientX, y: e.clientY };
    smoothPos.current = { x: e.clientX, y: e.clientY };
    targetRadius.current = targetRadiusForViewport();
  };

  const endTouch = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") return;
    isTouching.current = false;
    targetRadius.current = 0;
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={endTouch}
      onPointerCancel={endTouch}
      style={
        {
          "--reveal-x": "-999px",
          "--reveal-y": "-999px",
          "--reveal-radius": "0px",
        } as React.CSSProperties
      }
    >
      <div className="hero-layer hero-layer--base hero-anim-base" aria-hidden />
      <div className="hero-layer hero-layer--reveal" aria-hidden />

      <div className="hero-grid" aria-hidden>
        <div className="hero-grid__circle" />
      </div>

      <header className="hero-nav hero-anim-nav">
        <a href="#top" className="hero-nav__brand" aria-label={`${NAME} — home`}>
          <svg
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden
>
  <circle cx="15" cy="15" r="14" stroke="currentColor" strokeWidth="1" />
  <path
    d="M10 21V9H12.6L18 17.5V9H20V21H17.4L12 12.5V21H10Z"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinejoin="round"
  />
</svg>
          <span className="hero-nav__name">{NAME}</span>
        </a>

        <nav className="hero-nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={TALK_LINK}
          className="hero-cta"
          target="_blank"
          rel="noreferrer"
        >
          Let&rsquo;s talk
        </a>
      </header>

      <div className="hero-copy">
        <h1 className="hero-headline">
          {HEADLINE_LINES.map((line, i) => (
            <span
              key={line}
              className="hero-anim-line"
              style={{ animationDelay: `${0.3 + i * 0.12}s` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-tagline hero-anim-tagline" aria-hidden="true">
          {TAGLINE_LINES.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <div className="hero-bottom">
          <p className="hero-intro hero-anim-intro">{INTRO_LINE}</p>
          <a
            href={WORK_LINK}
            className="hero-cta hero-explore hero-anim-intro"
            target="_blank"
            rel="noreferrer"
          >
            Explore my work
          </a>
        </div>
      </div>
    </section>
  );
}
