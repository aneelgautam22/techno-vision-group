"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { enquiryServices } from "@/data/services";
import { submitEnquiry } from "@/lib/enquiry";
import { Arrow } from "@/components/ui";

function createSubmissionId() {
  return `web-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 14)}`;
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const form = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const formStartedAt = useRef(0);
  const submissionId = useRef<string | null>(null);
  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const phoneInput = form.current?.elements.namedItem(
      "phone",
    ) as HTMLInputElement;
    const digits = phone.replace(/\D/g, "").length;
    phoneInput.setCustomValidity(
      digits < 7 || digits > 15 ? "Enter a phone number with 7–15 digits." : "",
    );
    const nameInput = form.current?.elements.namedItem(
      "name",
    ) as HTMLInputElement;
    const messageInput = form.current?.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    nameInput.setCustomValidity(
      name.length < 2 ? "Please enter your full name." : "",
    );
    messageInput.setCustomValidity(
      message.length < 10
        ? "Please add at least 10 characters about your project."
        : "",
    );
    if (!form.current?.reportValidity()) return;
    submitting.current = true;
    setState("sending");
    try {
      submissionId.current ??= createSubmissionId();
      const result = await submitEnquiry({
        name,
        message,
        phone,
        email: String(data.get("email")).trim(),
        service: String(data.get("service")),
        formElapsedMs: Date.now() - formStartedAt.current,
        submissionId: submissionId.current,
      });
      setState(result);
      if (result === "sent") {
        form.current?.reset();
        formStartedAt.current = Date.now();
        submissionId.current = null;
      }
    } catch {
      setState("error");
    } finally {
      submitting.current = false;
    }
  }
  return (
    <form ref={form} className="contact-form" onSubmit={submit}>
      <h2>Tell us about your project.</h2>
      <p>
        Share a few details to start the conversation. All fields are required.
      </p>
      <div className="form-grid">
        <label htmlFor="name">
          Full Name
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            placeholder="Your full name"
          />
        </label>
        <label htmlFor="phone">
          Phone Number
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="\+?[0-9][0-9 \(\)\-]{6,19}"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            maxLength={21}
            title="Enter 7–15 digits, optionally using spaces, parentheses or hyphens."
            placeholder="Your phone number"
          />
        </label>
        <label htmlFor="email">
          Email Address
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="Your email address"
          />
        </label>
        <label htmlFor="service">
          <span id="service-label">Service Required</span>
          <select
            aria-labelledby="service-label"
            id="service"
            name="service"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {enquiryServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="full-width" htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            placeholder="Tell us about your plans, location and the support you need."
          />
        </label>
      </div>
      <p className="form-notice" id="delivery-notice">
        Your details will only be used to respond to this project enquiry.
      </p>
      <button
        type="submit"
        className="button"
        disabled={state === "sending"}
        aria-describedby="delivery-notice"
      >
        {state === "sending" ? "Sending…" : "Send Enquiry"}
        <Arrow />
      </button>
      <div className={`form-status ${state}`} aria-live="polite" role="status">
        {state === "sent" &&
          "Thank you. Your enquiry has been sent successfully."}
        {state === "error" &&
          "Sorry, we couldn't send your enquiry. Please try again."}
      </div>
    </form>
  );
}
