# Navy and Sashes

Standalone microsite for Typography 260.

## Required project files
- `index.html`
- `styles.css`
- `app.js`
- `assets/`

## Preview locally
```bash
python3 -m http.server 4173
# open http://localhost:4173/?era=early
# or http://localhost:4173/?era=late
# or http://localhost:4173/?era=seventies
```

## Era pages behavior
This site uses one page with era query routes (`?era=early|late|seventies`) so each era page starts on its required chronology slide while keeping one strict root file structure.

## Upload these exact asset filenames into `/assets/`
### Cinemograph MP4 loops
- `era-1960-64-loop.mp4`
- `era-1965-69-loop.mp4`
- `era-1970-79-loop.mp4`

### Slide artifact photos (realistic, texture-rich)
- `slide1-dock.jpg` (Navy Yard-style dungarees)
- `slide1-drape.jpg` (clinical nursing whites)
- `slide2-dock.jpg` (service station/gas attendant)
- `slide2-drape.jpg` (professional retail/stewardess)
- `slide3-dock.jpg` (rugged maritime/logging gear)
- `slide3-drape.jpg` (heavy-duty shipyard coveralls)

### Featured gallery photos (Michael Martin)
- `feature-1.jpg`
- `feature-2.jpg`
- `feature-3.jpg`

If any files are missing, the app shows visible missing-file overlays while preserving animated gradient + grain fallback so the experience never appears broken.
