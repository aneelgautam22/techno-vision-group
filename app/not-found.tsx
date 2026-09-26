import { Button } from "@/components/ui";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="inner-reference page-not-found">
      <section className="section container not-found">
        <span className="eyebrow">404 / PAGE NOT FOUND</span>
        <h1>This page hasn’t been built.</h1>
        <p>
          The address may have changed. Let’s get you back to familiar ground.
        </p>
        <Button href="/">Return Home</Button>
      </section>
    </div>
  );
}
