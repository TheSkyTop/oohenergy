"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

type SubmitState = "idle" | "submitting" | "success" | "error";

const formEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || `https://formsubmit.co/ajax/${site.enquiryEmail}`;

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("company_website");

    if (honeypot) {
      setSubmitState("success");
      form.reset();
      return;
    }

    try {
      formData.set("_subject", "Ooh Energy website enquiry");
      formData.set("_template", "table");
      formData.set("_captcha", "false");

      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === "false" || result?.success === false) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      window.location.href = buildMailtoUrl(formData);
      setSubmitState("error");
    }
  }

  return (
    <form className="grid gap-3.5" onSubmit={handleSubmit} noValidate={false}>
      {/* Paste the Formspree or Web3Forms endpoint into NEXT_PUBLIC_FORMSPREE_ENDPOINT. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input id="company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="recipient" value={site.enquiryEmail} />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Organisation" name="organisation" />
        <label className="grid gap-1.5 text-[14px] font-medium text-brand-ink">
          Enquiry type
          <select
            name="enquiry_type"
            className="h-10 border border-brand-rule bg-brand-bg px-3 text-[13px] font-normal text-brand-ink transition-colors duration-200 focus:border-brand-blue"
            defaultValue={site.contact.enquiryTypes[0]}
          >
            {site.contact.enquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-[14px] font-medium text-brand-ink">
        Message
        <textarea
          name="message"
          required
          rows={3}
          className="resize-y border border-brand-rule bg-brand-bg px-3 py-2 text-[13px] font-normal leading-5 text-brand-ink transition-colors duration-200 focus:border-brand-blue"
        />
      </label>
      <label className="flex gap-3 text-[12px] leading-5 text-brand-muted">
        <input
          name="privacy_consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-brand-blue"
        />
        Consent is given for Ooh Energy to collect the information in this form for the purpose of responding to the enquiry.
      </label>
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="h-9 w-fit border border-brand-blue px-5 text-[13px] font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState === "submitting" ? "Sending..." : "Send enquiry"}
      </button>
      <div className="min-h-6" aria-live="polite">
        {submitState === "success" && (
          <p className="text-[12px] text-brand-blue">Thank you. Your enquiry has been received.</p>
        )}
        {submitState === "error" && (
          <p className="text-[12px] text-brand-muted">
            The form service could not be reached, so an email draft has been opened instead.
          </p>
        )}
      </div>
      <p className="text-[12px] text-brand-muted">
        Ooh Energy usually replies within two business days. Direct email:{" "}
        <a href={`mailto:${site.enquiryEmail}`} className="text-brand-blue underline-offset-4 hover:underline">
          {site.enquiryEmail}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-[14px] font-medium text-brand-ink">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-10 border border-brand-rule bg-brand-bg px-3 text-[13px] font-normal text-brand-ink transition-colors duration-200 focus:border-brand-blue"
      />
    </label>
  );
}

function buildMailtoUrl(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const organisation = String(formData.get("organisation") || "");
  const enquiryType = String(formData.get("enquiry_type") || "");
  const message = String(formData.get("message") || "");
  const subject = `Ooh Energy enquiry${enquiryType ? `: ${enquiryType}` : ""}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation}`,
    `Enquiry type: ${enquiryType}`,
    "",
    "Message:",
    message
  ].join("\n");

  return `mailto:${site.enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
