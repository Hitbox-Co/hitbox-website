import type Lenis from "lenis";

/**
 * Holds the running Lenis instance so anything that needs to freeze the page
 * can reach it. Setting `body { overflow: hidden }` is not enough on its own:
 * Lenis drives scrolling from wheel and touch events, so it keeps running
 * behind an open overlay unless it is explicitly stopped.
 */
let instance: Lenis | null = null;

export function registerSmoothScroll(next: Lenis | null) {
  instance = next;
}

export function pauseSmoothScroll() {
  instance?.stop();
}

export function resumeSmoothScroll() {
  instance?.start();
}
