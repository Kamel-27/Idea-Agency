// Sends tracking events to Google Tag Manager through window.dataLayer.
// GTM then forwards them to GA4 and the Meta Pixel (after consent).
// Until GTM is installed, the events just collect in dataLayer, which is harmless.
//
// Event map (docs/03-system-spec.md, "Tracking events"):
//   form_step2     visitor reached step 2 of the form   -> GA4 form_step2, Meta custom form_step2
//   generate_lead  form submitted successfully          -> GA4 generate_lead, Meta Lead
//   contact        WhatsApp button clicked              -> GA4 contact, Meta Contact

type TrackingEvent = "form_step2" | "generate_lead" | "contact";

type DataLayerEntry = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

export function trackEvent(event: TrackingEvent, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
