import { ServicePage } from "@/components/sections/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Construction Services",
  "Residential and commercial construction, civil works, infrastructure, renovation and finishing from Techno Vision Nirman Sewa.",
  "/services/construction",
);
export default function Page() {
  return <ServicePage kind="construction" />;
}
