import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://sandraiderscheats.com',
  trailingSlash: 'always',
  redirects: {
    '/contact/': 'https://discord.gg/pkhMWtuW7',
    '/support/': 'https://discord.gg/pkhMWtuW7',
    '/products/dota-2-cheats/': '/store/',
    '/products/the-isle-hacks/': '/store/',
    '/products/aion-2/': '/store/',
    '/products/sand-raiders/': '/store/',
    '/products/sand-raiders-of-sophie/': '/store/',
    '/products/cloud-dma/': '/dma/',
    '/products/hwid-spoofer/': '/hwid/',
    '/products/skin-changer/': '/skin-changer/',
    '/blog/features/': '/intel/',
    '/blog/guides/': '/guides/',
    '/blog/setup/': '/howto/',
    '/blog/updates/': '/updates/',
    '/go/the-isle/': '/go/',
    '/go/aion-2/': '/go/',
    '/go/aion-2/monthly/': '/go/',
    '/go/aion-2/lifetime/': '/go/',
    '/go/sand-raiders/': '/go/',
    '/flight/': '/trampler/',
    '/nodes/': '/loot/',
    '/world/': '/loot/',
    '/compat/': '/ac/',
    '/classes/': '/tramplers/',
    '/guide/': '/cheats/',
    '/release/': '/early-access/',
    '/na/': '/squad/',
    '/q-flight/': '/q-trampler/',
    '/q-nodes/': '/q-loot/',
    '/q-compat/': '/q-ac/',
    '/the-isle-hacks-evrima/': '/cheats/',
    '/the-isle-player-esp/': '/esp/',
    '/the-isle-dinosaur-esp/': '/loot/',
    '/the-isle-health-esp/': '/esp/',
    '/the-isle-aimbot/': '/aim/',
    '/the-isle-hacks-pc-setup/': '/pc/',
    '/the-isle-radar-features/': '/radar/',
    '/the-isle-esp-terminology/': '/esp/',
    '/the-isle-compatibility-eac/': '/ac/',
    '/the-isle-monthly-vs-lifetime/': '/plans/',
    '/trampler/': '/trampler/',
    '/loot/': '/loot/',
    '/early-access/': '/early-access/',
    '/tramplers/': '/tramplers/',
    '/storm-dive/': '/storm-dive/',
    '/roadmap/': '/roadmap/',
    '/blueprints/': '/blueprints/',
    '/voyage/': '/voyage/',
    '/sophie/': '/sophie/',
    '/weapons/': '/weapons/',
    '/squad/': '/squad/',
    '/community/': '/community/',
    '/publisher/': '/publisher/',
    '/extraction/': '/extraction/',
    '/contracts/': '/contracts/',
    '/dieselpunk/': '/dieselpunk/',
    '/disclaimer/': '/disclaimer/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (['/404/', '/go/', '/monthly/', '/lifetime/', '/search/', '/support/', '/contact/'].includes(path)) {
          return false;
        }
        if (path.startsWith('/go/')) return false;
        if (path.startsWith('/blog/') && path !== '/blog/') return false;
        if (path.startsWith('/forum/') && path !== '/forum/') return false;
        return true;
      },
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 2048,
      modulePreload: { polyfill: false },
      reportCompressedSize: false,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
