// Loads the Meta Pixel and sends events to it. Browser only.
// This is Meta's official base code, written as a function (instead of
// pasting it in <head>) so it can be loaded from a React component.

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);
}

/** Standard events (PageView, Lead, Contact) use "track", our own use "trackCustom". */
export function sendMetaEvent(name: string, params: Record<string, unknown> = {}, custom = false) {
  window.fbq?.(custom ? "trackCustom" : "track", name, params);
}
