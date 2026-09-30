interface Env {
  RESEND_API_KEY?: string;
  ENQUIRY_TO_EMAIL?: string;
  ENQUIRY_FROM_EMAIL?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

type EnquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
  formElapsedMs?: unknown;
  submissionId?: unknown;
};

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const services = new Set([
  "Engineering Consultancy",
  "Architectural Design",
  "Structural Design",
  "Survey / Estimation",
  "Project Supervision",
  "Construction",
  "Renovation",
  "Other",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const submissionIdPattern = /^[a-zA-Z0-9_-]{8,100}$/;
const maxRequestBytes = 12_000;

function originFromHost(protocol: string, host: string | null) {
  if (!host) return null;
  try {
    return new URL(`${protocol}//${host.trim()}`).origin;
  } catch {
    return null;
  }
}

function forwardedValue(header: string | null, key: string) {
  const match = header
    ?.split(",")[0]
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith(`${key}=`));
  return match?.slice(key.length + 1).replace(/^"|"$/g, "") || null;
}

function requestOrigins(request: Request) {
  const url = new URL(request.url);
  const forwarded = request.headers.get("Forwarded");
  const forwardedProto =
    forwardedValue(forwarded, "proto") ||
    request.headers.get("X-Forwarded-Proto")?.split(",")[0]?.trim() ||
    url.protocol.replace(":", "");
  const protocol = `${forwardedProto}:`;
  const hosts = [
    request.headers.get("Host"),
    request.headers.get("X-Forwarded-Host")?.split(",")[0]?.trim() || null,
    forwardedValue(forwarded, "host"),
  ];
  const origins = new Set([url.origin]);
  for (const host of hosts) {
    const origin = originFromHost(protocol, host);
    if (origin) origins.add(origin);
  }
  return origins;
}

function headerOrigin(value: string | null) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return "invalid";
  }
}

function isLocalHostname(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  );
}

function developmentRequest(request: Request) {
  const url = new URL(request.url);
  const origin = headerOrigin(request.headers.get("Origin"));
  return (
    isLocalHostname(url.hostname) ||
    (origin !== null &&
      origin !== "invalid" &&
      isLocalHostname(new URL(origin).hostname))
  );
}

function logRejection(
  request: Request,
  reason: string,
  details: Record<string, unknown> = {},
) {
  if (!developmentRequest(request)) return;
  const url = new URL(request.url);
  console.warn("[enquiry] request rejected", {
    reason,
    requestOrigin: headerOrigin(request.headers.get("Origin")),
    refererOrigin: headerOrigin(request.headers.get("Referer")),
    requestUrlOrigin: url.origin,
    host: request.headers.get("Host"),
    forwardedHost: request.headers.get("X-Forwarded-Host"),
    ...details,
  });
}

function sameOriginRequest(request: Request) {
  const suppliedOrigin =
    headerOrigin(request.headers.get("Origin")) ||
    headerOrigin(request.headers.get("Referer"));
  if (!suppliedOrigin) return true;
  return requestOrigins(request).has(suppliedOrigin);
}

function diagnostic(
  event: string,
  details: Record<string, unknown> = {},
) {
  console.info(`[enquiry] ${event}`, details);
}

function safeDiagnosticText(value: unknown) {
  return typeof value === "string"
    ? value
        .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email redacted]")
        .slice(0, 240)
    : undefined;
}

async function resendErrorDetails(response: Response) {
  try {
    const body = (await response.clone().json()) as Record<string, unknown>;
    return {
      status: response.status,
      name: safeDiagnosticText(body.name),
      code: safeDiagnosticText(body.code),
      message: safeDiagnosticText(body.message),
    };
  } catch {
    return { status: response.status };
  }
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function field(payload: EnquiryPayload, key: keyof EnquiryPayload) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(value: string) {
  return value.length <= 254 && emailPattern.test(value);
}

function validate(payload: EnquiryPayload): Enquiry | null {
  const name = field(payload, "name");
  const phone = field(payload, "phone");
  const email = field(payload, "email");
  const service = field(payload, "service");
  const message = field(payload, "message");
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    name.length < 2 ||
    name.length > 100 ||
    phone.length > 21 ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    !/^\+?[0-9][0-9 ()-]{6,20}$/.test(phone) ||
    (email !== "" && !validEmail(email)) ||
    !services.has(service) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return null;
  }

  return { name, phone, email, service, message };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function emailHtml(enquiry: Enquiry, submittedAt: string) {
  const rows = [
    ["Name", enquiry.name],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email],
    ["Service", enquiry.service],
    ["Submitted", submittedAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #e6eaed;color:#52616b;font-weight:600;width:120px">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e6eaed;color:#122f44">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f3f5f7;font-family:Arial,sans-serif;color:#122f44"><div style="max-width:680px;margin:0 auto;padding:32px 16px"><div style="background:#07589a;padding:24px 28px;color:#fff"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase">Techno Vision Group</div><h1 style="font-size:24px;margin:8px 0 0">New Website Enquiry</h1></div><div style="background:#fff;padding:24px 28px"><table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table><h2 style="font-size:16px;margin:28px 0 10px">Message</h2><div style="white-space:pre-wrap;line-height:1.7;padding:16px;background:#f6f8f9;border-left:3px solid #2da62f">${escapeHtml(enquiry.message)}</div></div></div></body></html>`;
}

function emailText(enquiry: Enquiry, submittedAt: string) {
  return [
    "New Website Enquiry - Techno Vision Group",
    "",
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Email: ${enquiry.email}`,
    `Service: ${enquiry.service}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");
}

export async function onRequestPost({ request, env }: PagesContext) {
  diagnostic("request_received", {
    requestUrlOrigin: new URL(request.url).origin,
    requestOrigin: headerOrigin(request.headers.get("Origin")),
  });

  if (!sameOriginRequest(request)) {
    logRejection(request, "origin_mismatch", {
      acceptedOrigins: [...requestOrigins(request)],
    });
    return json({ success: false }, 403);
  }
  diagnostic("origin_valid");

  if (!request.headers.get("Content-Type")?.includes("application/json")) {
    logRejection(request, "unsupported_content_type");
    return json({ success: false }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > maxRequestBytes) {
    logRejection(request, "request_too_large", { contentLength });
    return json({ success: false }, 413);
  }

  let payload: EnquiryPayload;
  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    logRejection(request, "invalid_json");
    return json({ success: false }, 400);
  }

  const enquiry = validate(payload);
  if (!enquiry) {
    logRejection(request, "invalid_form_fields");
    return json({ success: false }, 400);
  }
  diagnostic("validation_passed");

  if (field(payload, "companyWebsite")) {
    diagnostic("honeypot_filled");
    return json({ success: false }, 400);
  }
  diagnostic("honeypot_clear");

  const formElapsedMs = payload.formElapsedMs;
  if (
    typeof formElapsedMs !== "number" ||
    !Number.isFinite(formElapsedMs) ||
    formElapsedMs < 500 ||
    formElapsedMs > 86_400_000
  ) {
    logRejection(request, "form_timing_invalid");
    return json({ success: false }, 400);
  }
  diagnostic("spam_check_passed");

  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.ENQUIRY_TO_EMAIL?.trim();
  const from = env.ENQUIRY_FROM_EMAIL?.trim();
  const fromAddress = from?.match(/<([^>]+)>$/)?.[1] ?? from;
  if (!apiKey || !to || !from || !validEmail(to) || !validEmail(fromAddress || "")) {
    console.error("[enquiry] email delivery configuration is invalid.");
    return json({ success: false }, 503);
  }

  const submittedAt = new Date().toISOString();
  const suppliedId = field(payload, "submissionId");
  const submissionId = submissionIdPattern.test(suppliedId)
    ? suppliedId
    : crypto.randomUUID();

  let resendResponse: Response;
  try {
    diagnostic("resend_request_started");
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry-${submissionId}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(enquiry.email ? { reply_to: enquiry.email } : {}),
        subject: "New Website Enquiry - Techno Vision Group",
        html: emailHtml(enquiry, submittedAt),
        text: emailText(enquiry, submittedAt),
      }),
    });
  } catch (error) {
    console.error("[enquiry] resend_failed", {
      name: error instanceof Error ? error.name : "unknown",
      message:
        error instanceof Error
          ? safeDiagnosticText(error.message)
          : "Unknown network error",
    });
    return json({ success: false }, 502);
  }

  if (!resendResponse.ok) {
    console.error(
      "[enquiry] resend_failed",
      await resendErrorDetails(resendResponse),
    );
    return json({ success: false }, 502);
  }

  diagnostic("resend_success", { status: resendResponse.status });
  return json({ success: true });
}
