#!/bin/bash
# Deploy Astroware website to Cloudflare Pages

set -e

echo "Deploying to Cloudflare Pages..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "Building static export..."
    npm run build
fi

# Deploy using wrangler
npx wrangler pages project list 2>/dev/null || true

echo "Deploying from ./dist directory..."
npx wrangler pages deploy dist --project-name=astroware-site

echo "Done! Your site should be live at: https://astroware-site.pages.dev"