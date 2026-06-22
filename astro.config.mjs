import { defineConfig } from 'astro/config';
import { rehypeCindorCodeBlocks } from './src/lib/astro-markdown/rehypeCindorCodeBlocks.mjs';
import { remarkLegacyContainers } from './src/lib/astro-markdown/remarkLegacyContainers.mjs';

export default defineConfig({
	output: 'static',
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkLegacyContainers],
		rehypePlugins: [rehypeCindorCodeBlocks],
	},
});
