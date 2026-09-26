import { HomeContent } from "@/components/sections/home";
import { siteUrl } from "@/lib/metadata";
export const metadata = {
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
};
export default function Home() {
  return <HomeContent />;
}
