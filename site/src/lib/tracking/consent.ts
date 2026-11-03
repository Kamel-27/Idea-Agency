// The visitor's cookie choice, saved in the browser (localStorage).
// "granted" loads the Meta Pixel, "denied" never loads it, null = not asked yet.
// useConsent() re-renders every component that reads it when the choice changes.

import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied" | null;

const STORAGE_KEY = "idea-consent";
const listeners = new Set<() => void>();
// Keeps the choice for this page view even when localStorage is blocked.
let memory: Consent = null;

function read(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Storage blocked (private mode, strict settings): ask again on each visit.
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Not saved, but the choice still applies to this page view.
  }
  memory = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** "unknown" on the server and during the first render, so the banner never flashes. */
export function useConsent(): Consent | "unknown" {
  return useSyncExternalStore(
    subscribe,
    () => read() ?? memory,
    () => "unknown",
  );
}
