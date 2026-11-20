# Sapphire Music — Spotify-inspired React Player

A responsive music player built from the four modules in the supplied screenshots:

1. **Layout & Navigation** — responsive sidebar, top navigation, main content area, CSS Grid and Flexbox.
2. **Playlist & Track Listing** — reusable playlist cards and track rows rendered from JavaScript data with props.
3. **Audio Player Controls** — HTML5 `<audio>` element with play/pause, previous/next, progress seeking, volume and playback events.
4. **Search & Now Playing State** — React Context shares the current track and playback state across the app; search filters the track list while the player stays visible.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

Open a terminal in this project folder and run these commands one at a time:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
sapphire-music/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── PlayerBar.jsx
    │   ├── Sidebar.jsx
    │   └── TrackList.jsx
    ├── context/
    │   └── PlayerContext.jsx
    └── data/
        └── music.js
```

## Notes

- Demo audio and cover art are loaded from external URLs, so an internet connection is required for those assets.
- The audio files are sample tracks from SoundHelix, not Spotify streams.
- This is an educational Spotify-inspired interface, not an official Spotify product.
