// UTM parameters tell us which ad or post sent a visitor, for example:
//   /diagnostic?utm_source=meta&utm_medium=cpc&utm_campaign=leads_cairosme_2026-10&utm_content=video_negation_v1
// The dictionary of allowed values is in docs/03-system-spec.md.

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>;

/** Browser only: reads the UTM values from the current page URL. */
export function readUtmFromUrl(): Partial<UtmParams> {
  const params = new URLSearchParams(window.location.search);
  const utm: Partial<UtmParams> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

/**
 * Server side: cleans UTM values and fills the gaps.
 * Missing source means the visitor came directly, so it becomes "direct".
 * Values follow the dictionary rules: lowercase, no spaces.
 */
export function normalizeUtm(raw: unknown): UtmParams {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const clean = (value: unknown) =>
    typeof value === "string"
      ? value.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_.\-]/g, "").slice(0, 100)
      : "";

  return {
    utm_source: clean(data.utm_source) || "direct",
    utm_medium: clean(data.utm_medium) || "none",
    utm_campaign: clean(data.utm_campaign) || "none",
    utm_content: clean(data.utm_content) || "none",
  };
}
