import { existsSync, readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const exists = (path) => existsSync(join(root, path));

[
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'src/main.tsx',
  'src/App.tsx',
  'src/types.ts',
  'src/styles/tokens.css',
  'src/styles/global.css',
  'src/mocks/prototypeData.ts',
  'src/features/detected/DetectedPanel.tsx',
  'src/features/downloads/DownloadsPanel.tsx',
  'src/features/dashboard/DashboardPages.tsx',
  'README.md',
  'STATE_MATRIX.md',
  'DESIGN_MAPPING.md',
].forEach((path) => assert.ok(exists(path), `${path} should exist`));

const packageJson = JSON.parse(read('package.json'));
assert.equal(packageJson.type, 'module');
assert.equal(packageJson.scripts.dev, 'vite');
assert.match(packageJson.scripts.build, /tsc -b/);
assert.match(packageJson.scripts.test, /prototype-engineering-check\.mjs/);
assert.ok(packageJson.dependencies.react);
assert.ok(packageJson.devDependencies.vite);

const indexHtml = read('index.html');
assert.match(indexHtml, /<div id="root"><\/div>/);
assert.match(indexHtml, /src="\/src\/main\.tsx"/);
assert.doesNotMatch(indexHtml, /<style>/i);
assert.doesNotMatch(indexHtml, /function switchTab|const PLUGIN_VIDEOS|document\.querySelector/);

const tokens = read('src/styles/tokens.css');
assert.match(tokens, /--sf-sidebar-width:\s*480px/);
assert.match(tokens, /--sf-orange:\s*#FA8A04/);
assert.match(tokens, /--sf-blue:\s*#1E9CEB/);
assert.match(tokens, /--sf-radius-main:\s*8px/);

const types = read('src/types.ts');
assert.match(types, /export type PreviewState/);
assert.match(types, /detected-default/);
assert.match(types, /detected-hover/);
assert.match(types, /detected-expand/);
assert.match(types, /license-info/);
assert.match(types, /export interface DetectedResource/);
assert.match(types, /export interface DownloadTask/);

const app = read('src/App.tsx');
assert.match(app, /window\.location\.hash/);
assert.match(app, /DetectedPanel/);
assert.match(app, /DownloadsPanel/);
assert.match(app, /DashboardPages/);

const detectedPanel = read('src/features/detected/DetectedPanel.tsx');
assert.match(detectedPanel, /Select Episodes/);
assert.match(detectedPanel, /Resolution/);
assert.match(detectedPanel, /Language/);
assert.match(detectedPanel, /Subtitles/);
assert.match(detectedPanel, /expandedId/);

const docs = `${read('README.md')}\n${read('STATE_MATRIX.md')}\n${read('DESIGN_MAPPING.md')}`;
assert.match(docs, /03_page_structure\.md/);
assert.match(docs, /12_ui_ux_visual_layout_specs\.md/);
assert.match(docs, /#hover/);
assert.match(docs, /#expand/);
assert.match(docs, /#downloads/);
assert.match(docs, /#setting/);
assert.match(docs, /#license/);
