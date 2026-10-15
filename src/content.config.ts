import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).optional()
    });

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            seo: seoSchema(image).optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            // Drafts show up in the local preview (npm run dev) but not on the live site
            draft: z.boolean().default(false),
            // Unlisted pages are live at their URL but hidden from all project lists and search engines
            unlisted: z.boolean().default(false),
            image: imageSchema(image).optional(),
            // Shown as the date in the details row instead of the month/year, e.g. 'Summer 2024'; '' hides the date
            period: z.string().optional(),
            organization: z.string().optional(),
            role: z.string().optional(),
            team: z.string().optional(),
            tools: z.array(z.string()).default([]),
            links: z.array(z.object({ text: z.string(), href: z.string() })).default([]),
            seo: seoSchema(image).optional()
        })
});

export const collections = { pages, projects };
