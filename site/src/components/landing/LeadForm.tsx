"use client";

// The two-step lead form.
// Step 1 asks only 3 things (name, WhatsApp, business) so starting feels easy.
// Step 2 asks the questions we use to score the lead.
//
// On submit: validate in the browser -> call the submitLead Server Action ->
// fire the generate_lead event -> go to the thank-you page.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DiagnosticPageContent } from "@/content/landing/types";
import { submitLead } from "@/lib/leads/submitLead";
import {
  EMPTY_LEAD,
  STEP_1_FIELDS,
  STEP_2_FIELDS,
  validateLead,
  type FieldErrors,
  type LeadField,
  type LeadInput,
} from "@/lib/leads/validation";
import { trackEvent } from "@/lib/tracking/events";
import { readUtmFromUrl } from "@/lib/tracking/utm";
import { ChoiceField, CheckboxField, SelectField, TextAreaField, TextField } from "@/components/forms/fields";

type LeadFormProps = {
  content: DiagnosticPageContent;
};

export function LeadForm({ content }: LeadFormProps) {
  const { form, links, locale } = content;
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [lead, setLead] = useState<LeadInput>(EMPTY_LEAD);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState(false);

  /** Updates one field and clears its error. */
  function update<K extends LeadField>(field: K, value: LeadInput[K]) {
    setLead((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  /** Shared props for every field: id, label, translated error. */
  function fieldProps(field: LeadField) {
    const error = errors[field];
    return {
      id: field,
      label: form.labels[field],
      error: error ? form.errors[error] : undefined,
    };
  }

  function goToStep2() {
    const stepErrors = validateLead(lead, STEP_1_FIELDS);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    setStep(2);
    trackEvent("form_step2", { locale });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) return goToStep2();

    const stepErrors = validateLead(lead, STEP_2_FIELDS);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    setIsSending(true);
    setServerError(false);

    const result = await submitLead(lead, {
      locale,
      page: window.location.pathname,
      utm: readUtmFromUrl(),
      honeypot,
    });

    if (result.ok) {
      trackEvent("generate_lead", { locale, ...readUtmFromUrl() });
      router.push(links.thankYou);
      return;
    }

    setIsSending(false);
    if (result.reason === "invalid") {
      setErrors(result.errors);
      // Server found a problem in step 1 fields: go back so the visitor sees it.
      if (STEP_1_FIELDS.some((field) => result.errors[field])) setStep(1);
    } else {
      setServerError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-card bg-white p-6 shadow-card sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{form.stepLabel.replace("{step}", String(step))}</span>
          <span className="font-medium text-ink">{form.stepTitles[step - 1]}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-brand-soft">
          <div className={`h-full rounded-full bg-brand transition-all ${step === 1 ? "w-1/2" : "w-full"}`} />
        </div>
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company_website">Website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {step === 1 ? (
        <div className="space-y-5">
          <TextField {...fieldProps("name")} value={lead.name} onChange={(v) => update("name", v)} placeholder={form.placeholders.name} autoComplete="name" />
          <TextField {...fieldProps("phone")} type="tel" dir="ltr" value={lead.phone} onChange={(v) => update("phone", v)} placeholder={form.placeholders.phone} autoComplete="tel" />
          <TextField {...fieldProps("business")} value={lead.business} onChange={(v) => update("business", v)} placeholder={form.placeholders.business} autoComplete="organization" />
        </div>
      ) : (
        <div className="space-y-5">
          <TextField {...fieldProps("email")} type="email" dir="ltr" value={lead.email} onChange={(v) => update("email", v)} placeholder={form.placeholders.email} autoComplete="email" />
          <SelectField {...fieldProps("industry")} value={lead.industry} onChange={(v) => update("industry", v)} options={form.options.industry} placeholder={form.selectPlaceholder} />
          <ChoiceField {...fieldProps("role")} value={lead.role} onChange={(v) => update("role", v)} options={form.options.role} />
          <ChoiceField {...fieldProps("team_size")} value={lead.team_size} onChange={(v) => update("team_size", v)} options={form.options.team_size} />
          <ChoiceField {...fieldProps("spend")} value={lead.spend} onChange={(v) => update("spend", v)} options={form.options.spend} />
          <TextAreaField {...fieldProps("challenge")} value={lead.challenge} onChange={(v) => update("challenge", v)} placeholder={form.placeholders.challenge} />
          <ChoiceField {...fieldProps("timeline")} value={lead.timeline} onChange={(v) => update("timeline", v)} options={form.options.timeline} />
          <CheckboxField id="whatsapp_opt_in" checked={lead.whatsapp_opt_in} onChange={(v) => update("whatsapp_opt_in", v)}>
            {form.labels.whatsapp_opt_in}{" "}
            <Link href={links.privacy} target="_blank" className="text-brand underline underline-offset-2">
              {form.optInPrivacyText}
            </Link>
          </CheckboxField>
        </div>
      )}

      {serverError && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {form.serverError}
        </p>
      )}

      <div className="mt-7 flex gap-3">
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={isSending}
            className="min-h-12 rounded-full border-[1.5px] border-ink px-6 font-display font-medium"
          >
            {form.back}
          </button>
        )}
        <button
          type="submit"
          disabled={isSending}
          className="min-h-12 flex-1 rounded-full bg-brand px-6 font-display text-[17px] font-medium text-white transition hover:shadow-brand disabled:opacity-60"
        >
          {step === 1 ? form.next : isSending ? form.sending : form.submit}
        </button>
      </div>
    </form>
  );
}
