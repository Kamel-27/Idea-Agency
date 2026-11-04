// Loads Google Analytics 4 (gtag.js) and sends events to it. Browser only.
// This is Google's official tag, written as a function so it can be loaded
// from a React component (instead of pasting it in <head>).
// Page views: GA4 "Enhanced measurement" counts them on every page change by
// itself (it watches the browser history), so we do not send them by hand.

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function loadGa4(measurementId: string) {
  if (window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads the `arguments` object itself, so this must stay a classic function.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function sendGa4Event(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}
