import { type CollectionEntry, getCollection } from 'astro:content';

export function sortItemsByDateDesc(itemA: CollectionEntry<'projects'>, itemB: CollectionEntry<'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

// Featured projects first, then newest first
export function sortProjects(projectA: CollectionEntry<'projects'>, projectB: CollectionEntry<'projects'>) {
    return Number(projectB.data.isFeatured) - Number(projectA.data.isFeatured) || sortItemsByDateDesc(projectA, projectB);
}

// All projects in display order; drafts are only included in the local dev server
export async function getProjects() {
    const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
    return projects.sort(sortProjects);
}
