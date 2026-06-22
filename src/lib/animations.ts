/**
 * Global animation orchestrator.
 *
 * Boots Lenis (smooth scroll) and registers GSAP ScrollTrigger
 * defaults. Each block is responsible for its own scoped animations
 * via `setupReveal`, `setupParallax` etc.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    smoothWheel: true,
  });

  // Hand off scroll updates to ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Reveal an element (fade + rise) when it scrolls into view. */
export function setupReveal(selector: string | HTMLElement, options: gsap.TweenVars = {}) {
  const targets =
    typeof selector === "string"
      ? gsap.utils.toArray<HTMLElement>(selector)
      : [selector];
  targets.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      ...options,
    });
  });
}

/** Stagger reveal each direct child of an element. */
export function setupRevealStagger(
  containerSelector: string | HTMLElement,
  options: gsap.TweenVars = {},
) {
  const containers =
    typeof containerSelector === "string"
      ? gsap.utils.toArray<HTMLElement>(containerSelector)
      : [containerSelector];
  containers.forEach((container) => {
    const children = Array.from(container.children) as HTMLElement[];
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: container, start: "top 85%", once: true },
      ...options,
    });
  });
}

/**
 * BATCHED reveal — best pattern for grids / lists / long pages.
 *
 * Each element animates as IT enters the viewport. If several land
 * within ~100ms (e.g. a row of cards already visible on first paint,
 * or fast scrolling), they're batched and gracefully staggered.
 * Solves the "whole grid pops at once" problem.
 *
 * @param selector  CSS selector of items to reveal
 * @param options   Optional knobs
 */
export function setupBatchReveal(
  selector: string,
  options: {
    /** y-offset to translate from. Default 24 */
    y?: number;
    /** Per-batch stagger in seconds. Default 0.08 */
    stagger?: number;
    /** Start position vs viewport. Default "top 88%" */
    start?: string;
    /** Per-element duration. Default 0.85s */
    duration?: number;
  } = {},
) {
  if (typeof window === "undefined") return;

  const { y = 24, stagger = 0.08, start = "top 88%", duration = 0.85 } = options;

  const targets = gsap.utils.toArray<HTMLElement>(selector);
  if (!targets.length) return;

  // Set initial hidden state so items don't flash before entering view
  gsap.set(targets, { opacity: 0, y });

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (els) => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "expo.out",
        overwrite: true,
      });
    },
  });
}

/** Parallax: shift a layer at a slower (or different) rate than scroll. */
export function setupParallax(
  selector: string | HTMLElement,
  { yPercent = -15 }: { yPercent?: number } = {},
) {
  const targets =
    typeof selector === "string"
      ? gsap.utils.toArray<HTMLElement>(selector)
      : [selector];
  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -yPercent },
      {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

/** Count a number element from 0 → its data-target. */
export function setupCountUp(selector: string) {
  const els = gsap.utils.toArray<HTMLElement>(selector);
  els.forEach((el) => {
    const target = parseFloat(el.dataset.target ?? el.textContent ?? "0");
    el.textContent = "0";
    gsap.to(el, {
      textContent: target,
      duration: 1.6,
      ease: "expo.out",
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });
}

export { gsap, ScrollTrigger, lenis };
