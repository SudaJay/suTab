# Arc Home

A soft, modern browser home page built with Vue 3, Composition API, Tailwind CSS and SCSS.

## Features

- Arc / Apple inspired glassmorphism layout with animated gradient wallpaper.
- Central search with engine switching, local history suggestions and enter-to-search.
- Draggable shortcut grid with favicon support, add modal and localStorage persistence.
- Greeting, time, mock weather, bookmark groups and recent visits.
- Responsive layout with dark mode.

## Stack

- Vue 3 + `<script setup>` + TypeScript
- Vite
- Tailwind CSS + scoped SCSS
- VueUse
- vue-draggable-plus

## Run

```bash
npm install
npm run dev
```

## Weather

The weather card uses [Open-Meteo](https://open-meteo.com/) free weather APIs. No API key is required.

The weather card supports changing the city from the UI. The selected city name is stored in localStorage. If the city lookup or weather request fails, the UI falls back to local demo weather.

## Real Browser Data

Bookmarks and history use real browser data only when this page runs inside a browser extension context. The extension manifest lives in `public/manifest.json` and is copied to `dist/manifest.json` during build:

```json
{
  "manifest_version": 3,
  "name": "Arc Home",
  "version": "1.0.0",
  "permissions": ["bookmarks", "history"],
  "host_permissions": [
    "https://suggestqueries.google.com/*",
    "https://www.baidu.com/*",
    "https://api.bing.com/*",
    "https://duckduckgo.com/*",
    "https://geocoding-api.open-meteo.com/*",
    "https://api.open-meteo.com/*"
  ],
  "chrome_url_overrides": {
    "newtab": "index.html"
  }
}
```

When opened as a normal Vite web page, browsers do not expose real bookmarks or history to JavaScript, so the UI falls back to demo data.

To test real data:

1. Run `npm run build`.
2. Open `chrome://extensions/` or `edge://extensions/`.
3. Enable developer mode.
4. Choose "Load unpacked" and select the `dist` directory.
5. Open a new tab.

## Build

```bash
npm run build
```
