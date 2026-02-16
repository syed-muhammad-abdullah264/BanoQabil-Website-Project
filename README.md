# BanoQabil Website

This repository contains the BanoQabil marketing website built with React and Tailwind CSS. It showcases courses, campuses, faculty, news, and an admission workflow.

**Features**
- Responsive, accessible landing pages built with React and Tailwind CSS
- Hero, Services, Testimonials, Statistics, and CTA sections on the Home page
- Courses listing and course preview components
- Campuses listing with search and Google Maps directions
- Faculty directory with filters and profile cards
- News listing and detailed news pages (markdown support)
- Contact and Registration pages with form handling
- Authentication context and role-based utilities (Firebase)
- Netlify functions for lightweight serverless features (in `netlify/functions`)
- Dark mode support and theme context
- Optimized production build (Create React App)

**Local Setup**
1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

If you need to reproduce Netlify CI behavior locally (ensures ESLint warnings fail builds):

```bash
set CI=true&& npm run build   # Windows CMD
$env:CI="true"; npm run build  # PowerShell
```

**Environment & Deployment**
- Put any secret keys in a `.env` file (do not commit it). Example variables:
	- `REACT_APP_FIREBASE_API_KEY`
	- `REACT_APP_FIREBASE_AUTH_DOMAIN`

- Netlify deploy:
	- Build command: `npm run build`
	- Publish directory: `build`
	- If Netlify fails on lint warnings, you can set the environment variable `DISABLE_ESLINT_PLUGIN=true` in Site settings to bypass CRA lint plugin (not recommended long-term).

**Tech Stack**
- React 18 + Create React App
- Tailwind CSS
- Firebase (auth + firestore)
- Netlify (hosting + functions)
- MUI icons, lucide-react, framer-motion

**Scripts**
- `npm start` – start dev server
- `npm run build` – production build
- `npm test` – run tests

**Contributing**
- Create a branch for changes, commit, and open a PR.
- Keep secrets out of the repo; use `.env` and Netlify environment variables.

If you want, I can also add a short Features section inside the homepage or create a `FEATURES.md` file — which would you prefer? 

