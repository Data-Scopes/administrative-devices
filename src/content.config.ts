import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const layer = z.enum(['information', 'administrative', 'archival']);

// One Markdown file per sub-project. The body is the summary shown on /subprojects/<id>/.
// The same file may be kept in the sub-project's own repo as site/summary.md; `npm run sync`
// copies it here (see PLAN.md, "Summaries synced from sub-project repos").
const subprojects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/subprojects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    group: z.enum(['core', 'republic']),
    layers: z.array(layer).min(1),
    stages: z.array(z.number().int().min(1).max(3)).default([]),
    status: z.enum(['active', 'planned', 'paused', 'done']).default('active'),
    repo: z.string().optional(), // "owner/name" on GitHub
    visibility: z.enum(['public', 'private']).default('public'),
    docs: z.url().optional(), // full documentation site, if any
    order: z.number().default(100),
  }),
});

const team = defineCollection({
  loader: file('src/data/team.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    affiliation: z.string().optional(), // id from partners.yaml
    url: z.url().optional(),
    order: z.number().default(100),
  }),
});

const partners = defineCollection({
  loader: file('src/data/partners.yaml'),
  schema: z.object({
    name: z.string(),
    short: z.string().optional(),
    kind: z.enum(['lead', 'partner', 'support', 'archive']),
    url: z.url().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { subprojects, team, partners };
