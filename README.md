# Kitsap / Bremerton, Washington — Vintage Fashion 1960s–70s

Plain HTML + CSS + Vanilla JS microsite designed for GitHub Pages.

## Project structure

```
/index.html
/pages/context.html
/pages/gallery.html
/pages/featured.html
/pages/builder.html
/pages/about.html
/css/styles.css
/js/app.js
/js/slideshow.js
/js/builder.js
/assets/images/
/assets/icons/
/README.md
/IMAGE_SOURCES.md
/CREDITS.md
```

## Local testing

### Option A: open directly
1. Double-click `index.html` (uses only relative links and works on `file://`).
2. Navigate to every page and test interactions.

### Option B: local server (recommended)
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## GitHub Pages deployment (exact steps)
1. Create a GitHub repository and push this folder to the default branch (for example `main`).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Wait for deployment (Actions/Pages may take ~1–5 minutes).
6. Open the published URL shown in Pages settings.

## Image workflow
1. Use `IMAGE_SOURCES.md` to locate appropriate historical images.
2. Save files into `/assets/images/` using exact filenames listed there.
3. Fill out `CREDITS.md` with source URLs, creators, and licenses.

## Accessibility highlights
- Semantic landmarks and headings
- Keyboard operable nav, filters, slideshow, and builder controls
- Visible focus styles
- `prefers-reduced-motion` support
- Text size and high contrast toggles persisted with `localStorage`
