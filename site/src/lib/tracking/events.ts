// Sends tracking events to Google Analytics 4 and the Meta Pixel, directly
// (no Google Tag Manager). Both are loaded by components/tracking/Tracking.tsx.
//
// Event map (docs/03-system-spec.md, "Tracking events"):
//   form_step2     visitor reached step 2 of the form   -> GA4 form_step2, Meta custom form_step2
//   generate_lead  form submitted successfully          -> GA4 generate_lead, Meta Lead
//   contact        WhatsApp button clicked              -> GA4 contact, Meta Contact

import { sendGa4Event } from "./ga4";
import { sendMetaEvent } from "./metaPixel";

type TrackingEvent = "form_step2" | "generate_lead" | "contact";

const metaEvents: Record<TrackingEvent, { name: string; custom: boolean }> = {
  form_step2: { name: "form_step2", custom: true },
  generate_lead: { name: "Lead", custom: false },
  contact: { name: "Contact", custom: false },
};

export function trackEvent(event: TrackingEvent, params: Record<string, unknown> = {}) {
  sendGa4Event(event, params);

  const meta = metaEvents[event];
  sendMetaEvent(meta.name, params, meta.custom);
}
