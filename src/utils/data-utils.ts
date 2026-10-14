import { type CollectionEntry, getCollection } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
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

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagId: string) {
    const filteredPosts: CollectionEntry<'blog'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
    return filteredPosts;
}
