# Rishi Raj Portfolio

Recruiter-ready, animated personal portfolio with a bold visual style and zero build step.

## Included Features

- Funky, modern responsive design with reveal animations and animated stat counters
- Config-driven content via `site.config.js`
- Contact actions:
  - Email: `contact@rishi-raj.me`
  - LinkedIn message link
  - Resume download button
  - Calendar booking CTA
- Secure-by-default front-end hardening:
  - CSP meta policy
  - `noopener noreferrer` on external links
  - URL sanitization for dynamic links

## Quick Edit (No Coding Needed Later)

Update `site.config.js`:

- `linkedinUrl`
- `calendarUrl`
- `resumeUrl`
- `profileImage`
- `achievements`, `projects`, and `stats`

## Assets To Add

- Your resume PDF at: `assets/resume.pdf`
- Your profile picture (optional): replace `assets/profile-placeholder.svg` or change `profileImage` in config

## Local Preview

Open `index.html` directly, or run:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Free Deployment Options

- GitHub Pages (great for this static project)
- Cloudflare Pages (fast and free tier)
- Netlify (easy custom domain + forms)
- Vercel (strong DX and free hobby tier)

## Domain (Porkbun) Setup

1. Deploy site to one of the hosts above.
2. In Porkbun DNS, add host-provided records (usually `CNAME` for `www`, plus root `ALIAS/ANAME` or `A` records).
3. Enable HTTPS at the host.

## Security Notes

This is a static site. There is no server-side secret handling in this repo.
If you later add forms or APIs, use a serverless backend with spam protection and rate limits.
