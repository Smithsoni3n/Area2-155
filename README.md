<<<<<<< HEAD
# Area2-155 — Live site links

This repository contains multiple standalone static site folders. Below are the folders and the *basic* GitHub Pages URLs you can use in your main README or hand to your professor. Replace `USERNAME` with your GitHub username.

Each folder is published as a project subpath when GitHub Pages is enabled from the repo root (branch: `main` / root or branch: `gh-pages` / root).

## Folders and live URL placeholders

- ALWAYS
  - https://USERNAME.github.io/Area2-155/ALWAYS/
- DUDE3
  - https://USERNAME.github.io/Area2-155/DUDE3/
- DUDE4
  - https://USERNAME.github.io/Area2-155/DUDE4/
- FUGLY4
  - https://USERNAME.github.io/Area2-155/FUGLY4/

Notes
- If you enable Pages using the `gh-pages` branch, push the site files to that branch root and the base URL will be `https://USERNAME.github.io/Area2-155/` and each folder will be reachable at the subpaths above.
- If you enable Pages from the `main` branch (root), the same subpaths will work so long as the folders are in the repository root.
- If any site uses absolute paths like `/styles.css`, those may 404 when published as a subpath (for example `/Area2-155/DUDE4/`). Prefer relative paths (e.g., `styles.css` or `./styles.css`) or add a `base` tag in `index.html`.

How to publish (short)
1. Push your repository to GitHub (add remote if needed):
# Area2-155

This repository contains four separate folders, each intended to be a standalone static site. Below are clean, separate links you can use from the main repo page. Replace the "LIVE SITE" placeholders with your deployed site URLs (Netlify/Vercel/Cloudflare Pages) if you host each folder separately; otherwise the GitHub Pages URLs (under the repository site) work immediately if you enable Pages for this repo.

Folders and links

- ALWAYS
  - GitHub folder: https://github.com/Smithsoni3n/Area2-155/tree/main/ALWAYS
  - GitHub Pages (subpath): https://Smithsoni3n.github.io/Area2-155/ALWAYS
  - Live site: REPLACE_WITH_LIVE_URL

- DUDE3
  - GitHub folder: https://github.com/Smithsoni3n/Area2-155/tree/main/DUDE3
  - GitHub Pages (subpath): https://Smithsoni3n.github.io/Area2-155/DUDE3
  - Live site: REPLACE_WITH_LIVE_URL

- DUDE4
  - GitHub folder: https://github.com/Smithsoni3n/Area2-155/tree/main/DUDE4
  - GitHub Pages (subpath): https://Smithsoni3n.github.io/Area2-155/DUDE4
  - Live site: REPLACE_WITH_LIVE_URL

- FUGLY4
  - GitHub folder: https://github.com/Smithsoni3n/Area2-155/tree/main/FUGLY4
  - GitHub Pages (subpath): https://Smithsoni3n.github.io/Area2-155/FUGLY4
  - Live site: REPLACE_WITH_LIVE_URL

Quick notes

- To have these served as separate production-ready sites (different domains or subdomains), deploy each folder as its own project in Netlify, Vercel, or Cloudflare Pages and paste the resulting URLs into the "Live site" lines above.
- To enable simple single-repo hosting under GitHub Pages, ensure each folder has an `index.html` and enable Pages for the repo (Settings → Pages). Then the GitHub Pages (subpath) URLs above will work.

How to publish (short)

1. Push your repository to GitHub (add remote if needed):

```powershell
git remote add origin <REMOTE_URL>
git push -u origin main
```

2. Go to your repository on GitHub → Settings → Pages. Set the source to:
   - Branch: `main`, Folder: `/ (root)`
   OR
   - Branch: `gh-pages`, Folder: `/ (root)` if you prefer a dedicated publishing branch.

3. Wait a minute and visit one of the URLs above (replace `USERNAME`).

If you want, I can push the local commits to your GitHub repo and enable the `gh-pages` deployment for you — paste the remote URL here and confirm you want me to push (I will not force-push any data unless you explicitly ask).
