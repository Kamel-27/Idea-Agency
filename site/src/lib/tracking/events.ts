// Sends tracking events to Google Tag Manager through window.dataLayer,
// and to the Meta Pixel directly (it only exists after cookie consent).
// Until GTM is installed, the dataLayer events just collect there, which is harmless.
// If GTM later forwards events to Meta too, remove the Meta part here to avoid counting twice.
//
// Event map (docs/03-system-spec.md, "Tracking events"):
//   form_step2     visitor reached step 2 of the form   -> GA4 form_step2, Meta custom form_step2
//   generate_lead  form submitted successfully          -> GA4 generate_lead, Meta Lead
//   contact        WhatsApp button clicked              -> GA4 contact, Meta Contact

import { sendMetaEvent } from "./metaPixel";

type TrackingEvent = "form_step2" | "generate_lead" | "contact";

type DataLayerEntry = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

const metaEvents: Record<TrackingEvent, { name: string; custom: boolean }> = {
  form_step2: { name: "form_step2", custom: true },
  generate_lead: { name: "Lead", custom: false },
  contact: { name: "Contact", custom: false },
};

export function trackEvent(event: TrackingEvent, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });

  const meta = metaEvents[event];
  sendMetaEvent(meta.name, params, meta.custom);
}
