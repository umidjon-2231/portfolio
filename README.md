# Umidjon Tojiboyev — Portfolio

Personal portfolio with a fully admin-editable, trilingual (EN / RU / UZ)
content layer and a motion-led ("Kinetic Motion") public site.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first theme) · **Motion** (Framer Motion)
- **MongoDB** + **Mongoose 9** · **Zod** validation
- Auth: single admin **password → JWT** in an httpOnly cookie (`jose` + `bcryptjs`)
- i18n: custom locale routing (`/` = en, `/ru`, `/uz`) via `src/proxy.ts`
- pnpm · Docker (standalone) · GitHub Actions

## Getting started

```bash
pnpm install
cp .env.example .env        # then fill the values
pnpm db:seed                # one-shot import of INFORMATION.md content
pnpm dev                    # http://localhost:3000  ·  admin: /admin
```

### Generating the admin password hash

```bash
pnpm dlx tsx -e "import b from 'bcryptjs';console.log(b.hashSync('YOUR_PASSWORD',12))"
```

Put the output in `ADMIN_PASSWORD_HASH` and set a long random `JWT_SECRET`.

## Scripts

| Script          | Purpose                                            |
|-----------------|----------------------------------------------------|
| `pnpm dev`      | Dev server                                         |
| `pnpm build`    | Production build (`postbuild` regenerates sitemap) |
| `pnpm start`    | Run the build (`node .next/standalone/server.js`)  |
| `pnpm lint`     | ESLint 9 (flat config)                             |
| `pnpm db:seed`  | Idempotent seed from `INFORMATION.md`              |

## Admin dashboard

`/admin` (password-gated by `src/proxy.ts` + a server-side session check).
Every portfolio domain is editable, each text field in EN/RU/UZ
(RU/UZ fall back to EN). Singletons (Profile, Social Proof) upsert;
collections support create / edit / delete / drag-order.

### Adding a new content domain (4 steps, no new infra)

1. **Schema** — `src/db/scheme/<name>.ts` (use `LocalizedStringSchema` from
   `_shared.ts` for trilingual fields).
2. **Service** — add one `createCrudService` line + register it in
   `src/db/service/index.ts` (`services` map).
3. **Validation** — add a Zod schema in `src/lib/validation/index.ts`
   (`validators` map, same key).
4. **Admin UI** — add an entry to `DOMAINS` in `src/lib/admin/config.ts`
   and a field descriptor array in `src/lib/admin/fields.ts`.

The generic `/api/admin/[domain]` API and `/admin/[slug]` editor pick it
up automatically. Surface it on the public site by adding a section
component under `src/components/sections/`.

## Deployment

Push to `master` → GitHub Actions: install (pnpm, frozen lockfile) →
lint → build → SSH to the host → `docker compose build && up -d`
(Next.js standalone output, Node 20).

Run `pnpm db:seed` once against the production database after the first
deploy. Attachments (avatar / project covers) are stored in MongoDB so
they survive immutable redeploys; `public/cv.pdf` stays a static asset.
