import { ServicePage } from "@/components/sections/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Engineering Consultancy",
  "Architectural planning, structural design, surveying, estimation, DPR preparation and supervision from Techno Vision Engineering Consultancy.",
  "/services/engineering-consultancy",
);
export default function Page() {
  return <ServicePage kind="consultancy" />;
}
