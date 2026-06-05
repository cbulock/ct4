import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const VALID_FORMATS = new Set(['legacy', 'markdown']);

const toAbsolutePostPath = (filePath) =>
	path.isAbsolute(filePath) ? filePath : path.join(ROOT_DIR, filePath);

const updateContentFormat = (source, contentFormat) => {
	const newline = source.includes('\r\n') ? '\r\n' : '\n';

	if (!source.startsWith(`---${newline}`)) {
		throw new Error('Expected file to start with YAML frontmatter.');
	}

	const pattern = /^contentFormat:\s*(legacy|markdown)\s*$/m;

	if (pattern.test(source)) {
		return source.replace(pattern, `contentFormat: ${contentFormat}`);
	}

	return source.replace(`---${newline}`, `---${newline}contentFormat: ${contentFormat}${newline}`);
};

const main = async () => {
	const [, , contentFormat, ...providedPaths] = process.argv;

	if (!VALID_FORMATS.has(contentFormat)) {
		throw new Error('Usage: node scripts/set-content-format.mjs <legacy|markdown> [post-file ...]');
	}

	const filePaths =
		providedPaths.length > 0
			? providedPaths.map(toAbsolutePostPath)
			: (await fs.readdir(POSTS_DIR))
					.filter((fileName) => fileName.endsWith('.md'))
					.sort()
					.map((fileName) => path.join(POSTS_DIR, fileName));

	let updatedCount = 0;

	for (const filePath of filePaths) {
		const source = await fs.readFile(filePath, 'utf8');
		const nextSource = updateContentFormat(source, contentFormat);

		if (nextSource !== source) {
			await fs.writeFile(filePath, nextSource);
			updatedCount += 1;
		}
	}

	console.log(`Updated ${updatedCount} post(s) to contentFormat: ${contentFormat}`);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
