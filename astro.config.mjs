// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: the public origin (custom domain, PLAN.md D3; public/CNAME holds the same domain).
// BASE_PATH: '/' with the custom domain; '/administrative-devices' only if served from data-scopes.github.io.
// Both can be overridden from the environment, e.g. in the deploy workflow.
const site = process.env.SITE_URL ?? 'https://administrative-devices.org';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
