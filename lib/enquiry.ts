export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  formElapsedMs: number;
  submissionId: string;
};
export async function submitEnquiry(
  enquiry: Enquiry,
): Promise<"sent"> {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enquiry),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Delivery failed");
  const result = await response.json();
  if (result.success !== true) throw new Error("Delivery was not confirmed");
  return "sent";
}
