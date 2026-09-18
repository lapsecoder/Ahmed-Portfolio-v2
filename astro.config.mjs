import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const siteEnv = process.env.SITE_URL ?? process.env.VERCEL_URL;
const site = siteEnv ? `https://${siteEnv.replace(/^https?:\/\//, '')}` : undefined;

export default defineConfig({
  // Vercel-ready: set SITE_URL in Vercel project settings to the final domain once known.
  // VERCEL_URL is picked up automatically on Vercel. No hardcoded URL.
  site,
  integrations: [mdx(), sitemap()],
});
