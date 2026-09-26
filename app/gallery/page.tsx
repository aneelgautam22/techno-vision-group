import { GalleryGrid } from "@/components/gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Gallery",
  "Browse completed residences, ongoing construction, site activities and renovation work by Techno Vision.",
  "/gallery",
);
export default function Gallery() {
  return (
    <div className="inner-reference page-gallery">
      <section className="section gallery-only-section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
