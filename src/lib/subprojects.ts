import { getCollection, type CollectionEntry } from 'astro:content';

export type Subproject = CollectionEntry<'subprojects'>;
export type Subpage = CollectionEntry<'subpages'>;

// Subpage ids look like "<subproject-id>/<page>".
export function splitSubpageId(id: string): { project: string; page: string } {
  const [project, ...rest] = id.split('/');
  return { project, page: rest.join('/') };
}

export async function getSubpages(project?: string): Promise<Subpage[]> {
  const all = await getCollection('subpages', (e) => import.meta.env.DEV || !e.data.draft);
  return all
    .filter((e) => !project || splitSubpageId(e.id).project === project)
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
