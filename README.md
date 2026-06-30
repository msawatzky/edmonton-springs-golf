# Edmonton Springs Golf Course Website

Static marketing site for Edmonton Springs Golf Course, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). The site is deployed to **Cloudflare Pages** and serves `https://www.edmontonspringsgolfcourse.com`.

---

## Table of Contents

- [Local Development](#local-development)
- [Infrastructure Overview](#infrastructure-overview)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Form Systems](#form-systems)
- [Media](#media)
- [Content Updates](#content-updates)
- [Planned Off-Season Migrations](#planned-off-season-migrations)

---

## Local Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Setup

```bash
npm install
cp .env.example .env
# Edit .env with real values (see Environment Variables below)
npm run dev
```

The dev server runs at `http://localhost:4321`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Infrastructure Overview

The site currently spans **three providers** with assets split across **two Cloudflare accounts**:

```
┌─────────────────────────────────────────────────────────────────┐
│  Wix (domain registrar / DNS)                                   │
│  edmontonspringsgolfcourse.com                                  │
│       │                                                         │
│       └── DNS points to ──► Cloudflare Pages (personal account) │
│                              Astro static site (this repo)      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Cloudflare R2 (ESG Webmaster account)                          │
│  Flyover videos (h1.mp4 … h18.mp4)                              │
│  Public URL via PUBLIC_MEDIA_URL                                │
└─────────────────────────────────────────────────────────────────┘
```

| Component | Account / Provider | Notes |
|-----------|-------------------|-------|
| **Website hosting** | Personal Cloudflare account | Cloudflare Pages project connected to this Git repo |
| **Flyover video storage** | ESG Webmaster Cloudflare account (Google login) | R2 bucket with public `r2.dev` URL |
| **Domain registration & DNS** | Wix | Domain points at the Cloudflare Pages deployment |
| **Static images & documents** | Bundled in repo (`public/`) | Deployed with each build |

> **Why the split?** The site was stood up quickly on a personal Cloudflare account during the season. Media (large flyover videos) was placed on the club's Webmaster Cloudflare account from the start. Both will be consolidated on the Webmaster account during the off-season (see [Planned Off-Season Migrations](#planned-off-season-migrations)).

---

## Deployment

### How it works

This is a **static Astro site** — `npm run build` outputs HTML, CSS, JS, and `public/` assets into `dist/`. Cloudflare Pages serves that folder.

There is no server-side runtime. All dynamic behavior (announcement expiry, course tour hole switching, league form modals) runs in the browser or is resolved at build time.

### Cloudflare Pages (personal account)

1. **Connect the repo** — In the Cloudflare dashboard (personal account), create or open the Pages project linked to this repository.
2. **Build settings**

   | Setting | Value |
   |---------|-------|
   | Framework preset | Astro (or None) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | 18 or 20 (set in Environment variables if needed) |

3. **Environment variables** — Add every `PUBLIC_*` variable from [Environment Variables](#environment-variables) in the Pages project settings (Production and Preview as needed). These are baked in at build time.
4. **Custom domain** — `www.edmontonspringsgolfcourse.com` is attached in Pages; Wix DNS currently points the domain at Cloudflare.
5. **Deploy** — Pushes to the connected branch trigger automatic builds. You can also trigger a manual redeploy from the dashboard.

### Production URL

The canonical site URL is set in `astro.config.mjs`:

```js
site: "https://www.edmontonspringsgolfcourse.com"
```

This value is used for league form return URLs after FormSubmit redirects.

### Verifying a deployment

1. Confirm the Pages build succeeded (no missing env var warnings in build logs).
2. Visit `/course/tour` and confirm flyover videos load (requires `PUBLIC_MEDIA_URL`).
3. Open a league page (`/leagues/mens` or `/leagues/ladies`), submit a test application, and confirm email delivery.

---

## Environment Variables

Copy `.env.example` to `.env` for local development. In production, set the same variables in **Cloudflare Pages → Settings → Environment variables**.

All variables use the `PUBLIC_` prefix so Astro exposes them to client-side code at build time.

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_MEDIA_URL` | Yes (for course tour) | Base URL for R2-hosted flyover videos. No trailing slash. Example: `https://pub-….r2.dev` |
| `PUBLIC_LEAGUE_FORM_BACKEND` | No | `formsubmit` (default) or `formspree` |
| `PUBLIC_FORMSUBMIT_MENS_LEAGUE` | If using FormSubmit | Recipient email for Men's League applications |
| `PUBLIC_FORMSUBMIT_LADIES_LEAGUE` | If using FormSubmit | Recipient email for Ladies League applications |
| `PUBLIC_FORMSUBMIT_WEBMASTER_CC` | No | CC address on all FormSubmit league submissions |
| `PUBLIC_FORMSPREE_MENS_LEAGUE` | If using Formspree | Full Formspree endpoint URL for Men's League |
| `PUBLIC_FORMSPREE_LADIES_LEAGUE` | If using Formspree | Full Formspree endpoint URL for Ladies League |

**Important:** Changing an environment variable requires a **new build and deploy** — values are embedded at build time, not read at request time.

---

## Form Systems

League registration uses **modal application forms** on the Men's and Ladies league pages. There is no contact form on `/contact` (that page is address, phone, and downloadable resources only).

### Architecture

```
User fills modal form
        │
        ▼
  POST (standard HTML form)
        │
        ├── FormSubmit (default) ──► formsubmit.co ──► league email (+ optional CC)
        │
        └── Formspree (optional)   ──► formspree.io ──► configured inbox
```

Backend selection is controlled by `PUBLIC_LEAGUE_FORM_BACKEND` in `src/data/leagueApplications.ts`.

### FormSubmit (current default)

- **Endpoint pattern:** `https://formsubmit.co/{recipient-email}`
- **Men's League recipient:** `PUBLIC_FORMSUBMIT_MENS_LEAGUE` → `esgmensleague@gmail.com`
- **Ladies League recipient:** `PUBLIC_FORMSUBMIT_LADIES_LEAGUE` → `Ladiesleague@edmontonspringsgolf.com`
- **Webmaster CC:** `PUBLIC_FORMSUBMIT_WEBMASTER_CC` → `webmaster@edmontonspringsgolf.com` (sent via hidden `_cc` field)

**FormSubmit-specific behavior** (`src/components/LeagueApplicationModal.astro`):

| Hidden field | Purpose |
|--------------|---------|
| `_subject` | Email subject line (e.g. "Men's League Application") |
| `_next` | Redirect URL after submit: `{site}/leagues/{slug}?submitted=1` |
| `_cc` | Copies webmaster on every submission |

**First-time activation:** FormSubmit sends a confirmation email to each recipient address the first time the form is used from a new domain. Someone with access to that inbox must click the activation link before submissions are delivered.

### Formspree (alternate backend)

To switch back to Formspree:

1. Set `PUBLIC_LEAGUE_FORM_BACKEND=formspree`
2. Set `PUBLIC_FORMSPREE_MENS_LEAGUE` and `PUBLIC_FORMSPREE_LADIES_LEAGUE` to the full form URLs (e.g. `https://formspree.io/f/xxxx`)
3. Redeploy

Formspree forms are managed in the [Formspree dashboard](https://formspree.io). No `_next` redirect is added when using Formspree.

### Form fields

Field definitions live in `src/data/leagueApplications.ts`:

| League | Required fields |
|--------|-----------------|
| Men's | Name, Email, Phone, Handicap & other information |
| Ladies | Name, Email, Phone |
| Both | Optional: Address, City/Postal Code |

Sidebar content (fees, contacts, payment instructions) is defined in the same file and shown beside the form in the modal.

### Adding or editing forms

1. **Change fields or sidebar copy** — Edit `mensLeagueApplication` / `ladiesLeagueApplication` in `src/data/leagueApplications.ts`
2. **Change recipients** — Update env vars in Cloudflare Pages (and `.env` locally), then redeploy
3. **Switch provider** — Change `PUBLIC_LEAGUE_FORM_BACKEND` and ensure the matching provider's vars are set

If the form action URL resolves to empty (missing env vars), the submit button is disabled and a warning banner appears in the modal.

---

## Media

Media falls into three categories: **repo-static assets**, **R2-hosted video**, and **content managed in TypeScript data files**.

### 1. Static assets in the repo (`public/`)

Shipped with every deploy. No extra configuration.

| Path | Used for |
|------|----------|
| `public/images/` | Gallery photos, hero images, course photos, flyover thumbnails |
| `public/images/flyovers/thumbs/` | Hole selector thumbnails on `/course/tour` (`h1.jpg` … `h18.jpg`) |
| `public/documents/` | PDFs (e.g. newsletters) linked from `/contact` |
| `public/documents/announcements/` | Promotional poster images for the homepage dialog |
| `public/favicon.png`, `public/*-grid.png`, etc. | Branding and layout graphics |

**Gallery** — Image list is defined in `src/data/gallery.ts`. Add files under `public/images/`, then add the filename to `GALLERY_FILES` (duplicate DJI exports are filtered automatically).

**Announcements** — Posters and expiry dates are in `src/data/announcements.ts`. Set `expiresOn` to the first day the poster should *stop* showing.

### 2. Flyover videos on Cloudflare R2 (Webmaster account)

The 18 hole flyover `.mp4` files are **too large for git** and are hosted on R2:

- **Bucket:** ESG Webmaster Cloudflare account
- **Public access:** R2 public bucket URL (or custom domain if configured later)
- **Env var:** `PUBLIC_MEDIA_URL` — base URL, videos referenced as `{PUBLIC_MEDIA_URL}/h1.mp4` … `h18.mp4`
- **Code:** `src/data/courseHoles.ts` builds video URLs via the `flyover()` helper

`public/videos/flyovers/` is in `.gitignore` for local overrides during development.

#### Uploading or replacing flyover videos

1. Log into the **ESG Webmaster** Cloudflare account
2. Open **R2** → the flyover bucket
3. Upload/replace `h1.mp4` through `h18.mp4` at the bucket root (or match whatever path structure `PUBLIC_MEDIA_URL` expects)
4. Ensure the bucket allows public read access (or use a custom domain)
5. No redeploy needed unless `PUBLIC_MEDIA_URL` changes

#### Thumbnails (in repo)

Thumbnails in `public/images/flyovers/thumbs/` are committed to git and served from Pages. Update these when flyover footage changes significantly.

### 3. External / legacy links

Some pages still link to the old Wix site (e.g. map on `/contact` → `edmontonspringsgolf.com`). These will be updated when the domain moves to Cloudflare.

---

## Content Updates

Most site copy is in Astro pages and `src/data/` modules. Common edits:

| What to change | Where |
|----------------|-------|
| League schedules, fees, copy | `src/data/leagues.ts` |
| League form fields | `src/data/leagueApplications.ts` |
| Homepage announcements | `src/data/announcements.ts` + image in `public/documents/announcements/` |
| Gallery photos | `public/images/` + `src/data/gallery.ts` |
| Course hole data & flyover links | `src/data/courseHoles.ts` |
| Rates | `src/components/Rates.astro` |
| Navigation | `src/components/Navbar.astro` |
| Site title / meta defaults | `src/layouts/Layout.astro` |
| PDF downloads | `public/documents/` + `src/pages/contact.astro` `resources` array |

After changes: commit, push, and let Cloudflare Pages rebuild (or run `npm run build` locally to verify).

---

## Planned Off-Season Migrations

Two consolidations are planned for the **off-season** when traffic is lower and DNS changes are safer.

### 1. Cloudflare account: personal → ESG Webmaster

**Goal:** Host the Pages project on the same Cloudflare account as the R2 bucket.

**Checklist:**

- [ ] Create a new Cloudflare Pages project on the **ESG Webmaster** account (or transfer if Cloudflare supports it)
- [ ] Connect the same Git repository and copy build settings (`npm run build`, output `dist`)
- [ ] Copy all `PUBLIC_*` environment variables from the personal account project
- [ ] Attach custom domain on the new project
- [ ] Verify build, forms, and flyover videos on the new deployment URL before cutover
- [ ] Update Wix DNS (or Cloudflare DNS after domain transfer) to point at the new Pages project
- [ ] Decommission the personal-account Pages project once stable

**Benefit:** Single account for site hosting, R2 media, and (eventually) DNS.

### 2. Domain: Wix → Cloudflare

**Goal:** Move `edmontonspringsgolfcourse.com` registration and DNS from Wix to Cloudflare.

**Checklist:**

- [ ] Initiate domain transfer from Wix to Cloudflare (unlock domain, obtain auth code, extend registration by 1 year as part of transfer)
- [ ] Add the domain to the ESG Webmaster Cloudflare account
- [ ] Recreate DNS records (apex + `www` → Cloudflare Pages)
- [ ] Confirm SSL/TLS is active (Full or Full Strict)
- [ ] Update any hardcoded URLs if the canonical domain changes
- [ ] Retire Wix DNS once propagation is complete

**Note:** Until the domain moves, Wix remains the DNS authority even though the live site is the Astro build on Cloudflare Pages.

### Post-migration cleanup

- [ ] Update `/contact` map link if it should point to an on-site page instead of the old Wix URL
- [ ] Remove or archive `golf-card.html` (saved export from the legacy Wix site) if no longer needed
- [ ] Document final R2 bucket name and any custom media domain in this README

---

## Project Structure (quick reference)

```
├── public/                 # Static assets deployed with the site
│   ├── images/             # Photos, flyover thumbnails
│   └── documents/          # PDFs, announcement posters
├── src/
│   ├── components/         # Reusable UI (Navbar, Hero, modals, etc.)
│   ├── data/               # Content & config (leagues, gallery, holes, announcements)
│   ├── layouts/            # Page shell
│   ├── pages/              # Routes (file-based routing)
│   └── styles/             # Global CSS
├── .env.example            # Environment variable template
├── astro.config.mjs        # Astro config (site URL, Tailwind)
└── tailwind.config.mjs     # Brand colors and fonts
```

---

## Support Contacts

| Role | Contact |
|------|---------|
| Pro Shop | (780) 962-6500 · proshop@edmontonspringsgolf.com |
| Webmaster | webmaster@edmontonspringsgolf.com |
| Men's League | esgmensleague@gmail.com |
| Ladies League | Ladiesleague@edmontonspringsgolf.com |
