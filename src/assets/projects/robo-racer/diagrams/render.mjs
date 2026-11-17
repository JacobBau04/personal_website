// Renders every .mmd in this folder to a theme-aware .svg next to it.
// Usage (from this folder):  node render.mjs
// Needs @mermaid-js/mermaid-cli (npx downloads it) and a local Chrome or Edge.
// Mermaid draws with placeholder colors (mermaid-config.json); this script swaps them for the
// site's CSS variables, so the inline SVG follows the light/dark theme.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const browser = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome'
].find((p) => p && existsSync(p));
const font = pathToFileURL(resolve(here, '../../../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')).href;
const css = join(tmpdir(), 'mmd-font.css');
writeFileSync(css, `@font-face { font-family: 'Inter Variable'; font-weight: 100 900; src: url('${font}') format('woff2'); }`);
const pptr = join(tmpdir(), 'mmd-puppeteer.json');
writeFileSync(pptr, JSON.stringify({ executablePath: browser, headless: 'shell' }));

const swaps = {
    '#a1a1a1': 'var(--bg-muted)', // node fill
    '#b2b2b2': 'var(--border-main)', // borders and lines
    '#c3c3c3': 'var(--text-main)', // text
    '#d4d4d4': 'transparent' // subgraph fill
};

for (const file of readdirSync(here).filter((f) => f.endsWith('.mmd'))) {
    const out = join(here, file.replace(/\.mmd$/, '.svg'));
    const mmdc = process.env.MMDC ?? 'mmdc';
    execFileSync(mmdc, ['-i', join(here, file), '-o', out, '-c', join(here, 'mermaid-config.json'), '-C', css, '-p', pptr, '-b', 'transparent', '-I', file.replace(/.mmd$/, '')], { stdio: 'inherit', shell: process.platform === 'win32' });
    let svg = readFileSync(out, 'utf8');
    for (const [from, to] of Object.entries(swaps)) svg = svg.replaceAll(new RegExp(from, 'gi'), to);
    svg = svg.replace(/<style>@font-face[^<]*<\/style>/, '');
    writeFileSync(out, svg);
    const left = [...new Set(svg.match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|rgb\([^)]*\)|hsl\([^)]*\)/gi) ?? [])];
    console.log(`${file} -> ${out.split(/[\/]/).pop()}${left.length ? '  (other colors left: ' + left.join(' ') + ')' : ''}`);
}
