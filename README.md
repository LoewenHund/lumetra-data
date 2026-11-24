# Lumetra Data

Interaktive Auswertung fiktiver Supportdaten, umgesetzt mit Vue 3 und Vite.

## Lokal starten

```bash
npm ci
npm run dev
```

## Produktions-Build prüfen

```bash
npm run build
npm run preview
```

## GitHub Pages

Der Workflow unter `.github/workflows/deploy.yml` baut und veröffentlicht die
Seite automatisch bei jedem Push auf `main`. Im GitHub-Repository muss unter
**Settings → Pages → Build and deployment → Source** einmalig **GitHub Actions**
ausgewählt werden.

Der Basispfad wird während des GitHub-Builds automatisch aus dem Namen des
Repositories ermittelt. Dadurch funktionieren Bilder sowohl lokal als auch auf
einer Projektseite wie `https://BENUTZERNAME.github.io/REPOSITORY/`.
