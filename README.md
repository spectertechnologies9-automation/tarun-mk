# Tarun M K — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3 · framer-motion. No 3D library; the hero is a lightweight canvas and the diagrams are SVG.

## Run
```bash
npm install
cp .env.example .env.local   # optional: enables the contact form
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Edit your content (everything is in one of these)
- `src/config/site.ts` — name, roles, rotating words, phone/WhatsApp, social URLs (LinkedIn/GitHub/Instagram are empty placeholders), tagline.
- `src/data/ventures.ts` — Spectre Technologies / Tachyon Intelligence (add `website` when ready).
- `src/data/projects.ts` — 8 projects. Set `status`, `technologies`, `screenshots`, `demoVideo`, `liveUrl`, `github`, and `template: false` as each is documented.
- `src/data/lab.ts`, `capabilities.ts`, `architectures.ts` — lab experiments, expertise panels, system diagrams.

## Contact
- WhatsApp / Call / Save Contact (`/api/vcard`, vCard 3.0) work out of the box.
- The form never fakes success: set `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`, or `FORMSPREE_ENDPOINT`. Without them it shows an honest "not configured" message and points to WhatsApp.

## Notes
Lab output, diagrams and project visuals are illustrative and labelled as such. Honours `prefers-reduced-motion`; the custom cursor appears only on fine-pointer desktops.
