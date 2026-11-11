// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: the public origin, e.g. https://administrativedevices.org (custom domain, PLAN.md D3).
// BASE_PATH: '/' with a custom domain; '/administrative-devices' while served from data-scopes.github.io.
// Both are set in the deploy workflow from repository variables.
const site = process.env.SITE_URL ?? 'https://data-scopes.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
