import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const HTML_TAG_PATTERN = /<(?!!--)[^>]+>/;
const IMAGE_PATTERN = /<img\b[^>]*src=(?:"([^"]*)"|'([^']*)')[^>]*>/gi;

const stripLinksAndImages = (value = '') =>
	value
		.replace(/<a\b[^>]*>/gi, '')
		.replace(/<\/a>/gi, '')
		.replace(/<img\b[^>]*>/gi, '');

const collectImageSources = (value = '') =>
	[...value.matchAll(IMAGE_PATTERN)].map((match) => match[1] ?? match[2]);

const main = () => {
	const [, , providedLimit] = process.argv;
	const limit = Number.isFinite(Number(providedLimit)) ? Number(providedLimit) : 20;
	const fileNames = fs
		.readdirSync(POSTS_DIR)
		.filter((fileName) => fileName.endsWith('.md'))
		.sort();

	const candidates = fileNames
		.map((fileName) => {
			const filePath = path.join(POSTS_DIR, fileName);
			const source = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(source);
			const imageSources = collectImageSources(content);

			return {
				fileName,
				data,
				content,
				imageSources,
			};
		})
		.filter((post) => post.imageSources.length > 0)
		.filter((post) => !HTML_TAG_PATTERN.test(stripLinksAndImages(post.content)))
		.map((post) => ({
			filePath: `content/posts/${post.fileName}`,
			title: post.data.title,
			imageCount: post.imageSources.length,
			anchorCount: (post.content.match(/<a\b/gi) || []).length,
			localImages: post.imageSources.filter((imageSource) => imageSource.startsWith('/')),
			remoteImages: post.imageSources.filter((imageSource) => !imageSource.startsWith('/')),
			missingLocalImages: post.imageSources.filter(
				(imageSource) =>
					imageSource.startsWith('/') &&
					!fs.existsSync(path.join(PUBLIC_DIR, imageSource.replace(/^\//, ''))),
			),
		}));

	console.log(
		JSON.stringify(
			{
				count: candidates.length,
				candidates: candidates.slice(0, limit),
			},
			null,
			2,
		),
	);
};

main();
