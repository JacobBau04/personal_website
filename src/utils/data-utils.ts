import { type CollectionEntry, getCollection } from 'astro:content';

export function sortItemsByDateDesc(itemA: CollectionEntry<'projects'>, itemB: CollectionEntry<'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

// Featured projects first, then by `order` (lowest first; unset goes last), then newest first
export function sortProjects(projectA: CollectionEntry<'projects'>, projectB: CollectionEntry<'projects'>) {
    const orderA = projectA.data.order ?? Infinity;
    const orderB = projectB.data.order ?? Infinity;
    return (
        Number(projectB.data.isFeatured) - Number(projectA.data.isFeatured) ||
        (orderA === orderB ? 0 : orderA < orderB ? -1 : 1) ||
        sortItemsByDateDesc(projectA, projectB)
    );
}

// Projects in display order; drafts are only included in the local dev server.
// Unlisted projects are left out unless includeUnlisted is true (used to build their pages).
export async function getProjects({ includeUnlisted = false } = {}) {
    const projects = await getCollection('projects', ({ data }) => (import.meta.env.DEV || !data.draft) && (includeUnlisted || !data.unlisted));
    return projects.sort(sortProjects);
}
