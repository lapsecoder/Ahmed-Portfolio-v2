import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const siteEnv = process.env.SITE_URL ?? process.env.VERCEL_URL;
const site = siteEnv ? `https://${siteEnv.replace(/^https?:\/\//, '')}` : undefined;

// The Ask Ahmed backend. The browser always talks to same-origin /api/chat;
// in production `vercel.json` rewrites that to this host, and the dev server
// proxies it here so local dev behaves like production.
const ragApiUrl = process.env.AHMED_RAG_API_URL ?? 'https://ahmed-rag.vercel.app';

export default defineConfig({
  // Vercel-ready: set SITE_URL in Vercel project settings to the final domain once known.
  // VERCEL_URL is picked up automatically on Vercel. No hardcoded URL.
  site,
  integrations: [mdx(), sitemap()],
  vite: {
    server: {
      proxy: {
        '/api/chat': {
          target: ragApiUrl,
          changeOrigin: true,
        },
      },
    },
  },
});
