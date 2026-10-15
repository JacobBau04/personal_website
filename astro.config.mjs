import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import siteConfig from './src/data/site-config';

// Project pages marked `unlisted: true` are left out of the sitemap so search engines don't find them
const projectsDir = './src/content/projects';
const unlistedProjects = readdirSync(projectsDir)
    .filter((file) => /\.mdx?$/.test(file) && /^unlisted:\s*true\s*$/m.test(readFileSync(`${projectsDir}/${file}`, 'utf8')))
    .map((file) => file.replace(/\.mdx?$/, ''));

// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        mdx(),
        sitemap({
            filter: (page) => !unlistedProjects.some((id) => page.includes(`/projects/${id}/`))
        })
    ]
});
