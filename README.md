# linxaura

> A personal site combining a blog and a photo gallery.

## Project Structure

```
linxaura/
├── docs/                # VuePress blog content
│   └── .vuepress/
│       ├── config.ts    # VuePress config
│       └── public/      # Static assets
│           └── gallery-app/  # Afilmory gallery build output (gitignore)
├── afilmory/            # Afilmory photo gallery (pnpm monorepo)
│   ├── apps/web/        # Gallery SPA (Vite + React)
│   ├── packages/        # Shared packages
│   └── locales/         # i18n
├── package.json         # Blog project config
└── README.md
```

- **Blog**: Built with VuePress + vuepress-theme-plume. Markdown writing, tags, archives, friends links.
- **Gallery**: Powered by Afilmory. Photo grid, lightbox, EXIF metadata (camera, lens, aperture, shutter, ISO, GPS), map view.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 10 (the gallery project uses pnpm workspaces)

## Install

```sh
# Install blog dependencies
npm install

# Install gallery dependencies
cd afilmory && pnpm install && cd ..
```

## Development

Start both the blog and gallery with a single command:

```sh
npm run dev
```

- Blog dev server: `http://localhost:8080`
- Gallery dev server: `http://localhost:13333` (embedded via iframe in the Gallery page)
- Blog only: `npm run docs:dev`
- Gallery only: `npm run dev:gallery`

## Build

```sh
npm run build
```

Build pipeline:
1. `build:gallery` — Build Afilmory SPA (`vite build --base /gallery-app/`)
2. `copy:gallery` — Copy build output to `docs/.vuepress/public/gallery-app/`
3. `docs:build` — Build VuePress blog

Final output at `docs/.vuepress/dist/`, ready to deploy to any static hosting.

## Preview

```sh
npm run docs:preview
```

## Deploy to a Server

### Recommended: Nginx static file serving

```sh
# 1. Clone the project on your server
git clone <your-repo-url> linxaura
cd linxaura

# 2. Install dependencies
npm install
cd afilmory && pnpm install && cd ..

# 3. Build
npm run build

# 4. Point Nginx to docs/.vuepress/dist/
```

Nginx config example:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/linxaura/docs/.vuepress/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /gallery-app/assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Auto-deploy

Set up a webhook or cron job on your server to auto-pull and rebuild:

```sh
#!/bin/bash
# deploy.sh
cd /path/to/linxaura
git pull
npm install
cd afilmory && pnpm install && cd ..
npm run build
```

## Photo Management

The gallery uses Afilmory's builder pipeline to process photos:

```sh
# 1. Put photos in afilmory/apps/web/public/photos/
#    (subdirectories are supported, builder scans recursively)

# 2. Run the builder to generate photo manifest and thumbnails
cd afilmory
pnpm build:manifest

# 3. For a full rebuild (reprocess all photos)
pnpm build:manifest -- --force
```

The builder will:
- Scan the `photos/` directory and extract EXIF (camera, lens, GPS, etc.)
- Generate multi-size thumbnails + blurhash placeholders
- Write `apps/web/src/data/photos-manifest.json`

If you don't have a photo source on the server, you can use a locally prepared manifest directly.

## Documents

- [VuePress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
- [Afilmory](https://github.com/Afilmory/afilmory)
