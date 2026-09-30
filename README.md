# Nufail Ismath — Portfolio

Static Next.js site. All content is in `lib/data.ts`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Before publishing
- Set real GitHub / LinkedIn / Medium URLs in `lib/data.ts` → `profile.links`.
- Replace `public/resume.pdf` whenever your CV changes.
- Adjust `profile.workHours` (used by the timezone-overlap widget).

## Deploy
- **Vercel:** import the repo — zero config.
- **GitHub Pages:** build and publish `out/`. For a project page (`username.github.io/repo`), set `basePath: "/repo"` in `next.config.mjs`. For `username.github.io`, no change needed.
