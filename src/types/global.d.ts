import type gsapType from "gsap";

declare global {
  interface Window {
    gsap: typeof gsapType;
  }
}
