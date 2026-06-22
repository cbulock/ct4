import fs from 'node:fs/promises';
import path from 'node:path';
import matter from './lib/frontmatter.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/i;
const HTML_COMMENT_PATTERN = /<!--/;

const loadPosts = async () => {
	const fileNames = (await fs.readdir(POSTS_DIR))
		.filter((fileName) => fileName.endsWith('.md'))
		.sort();

	return Promise.all(
		fileNames.map(async (fileName) => {
			const filePath = path.join(POSTS_DIR, fileName);
			const source = await fs.readFile(filePath, 'utf8');
			const { data, content } = matter(source);

			return {
				filePath,
				fileName,
				content,
				...data,
			};
		}),
	);
};

const main = async () => {
	const [, , providedLimit] = process.argv;
	const limit = Number.isFinite(Number(providedLimit)) ? Number(providedLimit) : 25;
	const posts = await loadPosts();
	const candidates = posts
		.filter((post) => !post.textMoreIgnored)
		.filter((post) => !HTML_TAG_PATTERN.test(post.content))
		.filter((post) => !HTML_COMMENT_PATTERN.test(post.content))
		.sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
		.map((post) => ({
			filePath: path.relative(ROOT_DIR, post.filePath),
			sortOrder: Number(post.sortOrder),
			title: post.title,
			basename: post.basename,
			lineCount: String(post.content).split(/\r?\n/).length,
		}));

	console.log(
		JSON.stringify(
			{
				totalPosts: posts.length,
				candidateCount: candidates.length,
				candidates: candidates.slice(0, limit),
			},
			null,
			2,
		),
	);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
