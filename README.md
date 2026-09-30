# Techno Vision Group

Premium corporate website for Techno Vision Engineering Consultancy and Techno Vision Nirman Sewa. Built with Next.js App Router, TypeScript, Tailwind CSS and locally hosted Manrope fonts and photography.

## Run

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Development preview: http://localhost:3000. For Cloudflare Pages, use `npm run build` as the build command and `out` as the build output directory. The static export uses the already optimized local images, while the root `functions/` directory supplies the Pages Function routes. This project has not been published.

## Validate

```sh
pnpm run typecheck
pnpm run lint
pnpm run build
node scripts/smoke.mjs
```

The smoke check requires a running server; an optional base URL can be passed as its first argument. ESLint 9 is retained for compatibility with the installed Next.js ESLint plugin.

## Pages and components

Home, About, Engineering Consultancy, Construction, Projects, project detail pages, Gallery and Contact are implemented, together with a custom 404, robots.txt and sitemap.xml. Shared components include the responsive header, footer, brand, buttons, section headings, image heroes, company panels, service layout, project cards/filters, owner profile, enquiry form and keyboard-accessible gallery dialog.

Design: royal blue, fresh green and soft neutral backgrounds; compact editorial spacing; architectural photography; restrained borders and motion; distinct but connected consultancy and construction panels. The approved homepage defines the shared header, footer, buttons, cards, image treatment and responsive rhythm used by every inner page. Reduced-motion preferences are respected.

## Content and launch configuration

- `data/site.ts`: company identity, navigation, verified owner name/title/photo, phone, email, address, map embed and social links. Only verified contact values are rendered as contact methods; unavailable details remain null.
- `data/services.ts`: service groups and enquiry options.
- `data/projects.ts`: client-supplied ongoing construction, completed residences and renovation work, including scope, status and galleries. Location, year and detailed descriptions remain clearly marked for confirmation.
- `data/gallery.ts`: client-supplied project photography grouped by status and activity.
- `pnpm run images:optimize`: converts source JPG, JPEG, PNG or WebP files in `source-images-originals` into deployment-ready WebP files in `public/images/optimized`, targeting about 55 KB per file. Put future originals in the source folder and run this command before referencing the new WebP path. Duplicate stems receive explicit aliases in the script.
- `app/about/page.tsx`: corporate introduction, two-business structure, verified areas of work, vision, mission, editable service-based objectives and the real owner presentation for Er. Milan Adhikari.
- `.env.example`: copy to `.env.local` and set the approved public origin through `NEXT_PUBLIC_SITE_URL`. Without it, robots disallows indexing and the sitemap is empty. Rebuild after changing public environment variables.
- `functions/api/enquiries.ts`: Cloudflare Pages Function for `POST /api/enquiries`. It validates the form again on the server, applies a lightweight form-timing spam check, and sends a professional HTML and plain-text email through Resend. Each form instance keeps one stable, unique idempotency key across retries to protect against duplicate delivery.

## Enquiry email delivery

Set these bindings in Cloudflare Pages under **Settings → Variables and Secrets** for both Production and Preview as needed:

- `RESEND_API_KEY`: a secret Resend API key with send permission.
- `ENQUIRY_TO_EMAIL`: the company's receiving email address.
- `ENQUIRY_FROM_EMAIL`: a Resend-approved sender, such as `Techno Vision Group <enquiries@your-verified-domain.com>`.

In Resend, add and verify the sending domain, configure its DNS records, and create an API key. The recipient can be the company's normal inbox, but the FROM address must use the verified domain or another sender Resend accepts. Redeploy the Pages project after adding or changing bindings.

The ordinary Next.js dev server does not execute the `functions/` directory. To test the Function by itself locally, create an ignored `.dev.vars` file containing the three variables, then run `pnpm dlx wrangler pages dev public` and POST test JSON to the Wrangler URL at `/api/enquiries`. An integrated website-and-Function preview requires the final Cloudflare Pages build output directory. Never commit a real API key; `.env*` and `.dev.vars*` are ignored.

The confirmed phone number, official email, establishment year, owner identity and social profiles are configured. No address, client counts, awards or testimonials have been invented. See ASSET_CREDITS.md and QA.md for provenance and verification.
