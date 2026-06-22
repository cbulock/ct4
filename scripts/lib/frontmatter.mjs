import yaml from 'js-yaml';

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n)?/u;

const parseFrontmatter = (source = '') => {
	const normalizedSource = String(source);
	const match = FRONTMATTER_PATTERN.exec(normalizedSource);

	if (!match) {
		return {
			data: {},
			content: normalizedSource,
		};
	}

	return {
		data:
			yaml.load(match[1], {
				schema: yaml.JSON_SCHEMA,
			}) ?? {},
		content: normalizedSource.slice(match[0].length).replace(/^\r?\n/u, ''),
	};
};

const stringifyFrontmatter = (content = '', data = {}) => {
	const normalizedContent = String(content);
	const yamlSource = yaml
		.dump(data, {
			noRefs: true,
			lineWidth: -1,
			sortKeys: false,
		})
		.trimEnd();

	return `---\n${yamlSource}\n---\n\n${normalizedContent}`;
};

const matter = (source = '') => parseFrontmatter(source);

matter.stringify = stringifyFrontmatter;

export default matter;
export { parseFrontmatter, stringifyFrontmatter };
