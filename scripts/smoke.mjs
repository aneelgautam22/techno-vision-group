import assert from "node:assert/strict";

const base = process.argv[2] || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/about",
  "/services/engineering-consultancy",
  "/services/construction",
  "/projects",
  "/gallery",
  "/contact",
  ...[
    "ongoing-residential-construction",
    "completed-residence-01",
    "completed-residence-02",
    "completed-residence-03",
    "completed-residence-04",
    "completed-residence-05",
    "completed-residence-06",
    "interior-renovation",
  ].map((slug) => `/projects/${slug}`),
];
const links = new Set();
const titles = new Set();
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one H1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route}: title`);
  assert.ok(!titles.has(title), `${route}: unique title`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    if (match[1].startsWith("/")) links.add(match[1].split("#")[0]);
  }
  console.log(`PASS ${route}`);
}
for (const link of links) assert.equal((await fetch(new URL(link, base))).status, 200, link);
for (const route of ["/missing-page", "/projects/missing-project"]) assert.equal((await fetch(new URL(route, base))).status, 404, route);
for (const image of [
  "complete-1.webp",
  "complete-3.webp",
  "owner.webp",
  "project-1.webp",
  "project-11-structure.webp",
  "renovation-2.webp",
])
  assert.equal(
    (await fetch(new URL(`/images/optimized/${image}`, base))).status,
    200,
    image,
  );
console.log(
  `PASS ${routes.length} pages, ${links.size} internal destinations, 2 missing routes, 6 representative images`,
);
