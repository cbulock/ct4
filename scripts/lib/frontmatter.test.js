import { describe, expect, test } from 'vitest';

import matter, {
	parseFrontmatter,
	stringifyFrontmatter,
} from './frontmatter.mjs';

describe('frontmatter helper', () => {
	test('parses YAML frontmatter and markdown body', () => {
		const source = `---\ntitle: Test Entry\ncreatedOn: 2026-06-22\ncategoryId: 4\n---\n\nHello world.\n`;
		const { data, content } = parseFrontmatter(source);

		expect(data).toEqual({
			title: 'Test Entry',
			createdOn: '2026-06-22',
			categoryId: 4,
		});
		expect(content).toBe('Hello world.\n');
	});

	test('stringifies frontmatter and round-trips through the default export', () => {
		const source = matter.stringify('Body text\n', {
			title: 'Round Trip',
			isCanonicalRouteEntry: true,
		});
		const { data, content } = matter(source);

		expect(source).toContain('title: Round Trip');
		expect(data).toEqual({
			title: 'Round Trip',
			isCanonicalRouteEntry: true,
		});
		expect(content).toBe('Body text\n');
	});

	test('preserves string types for numeric-looking values through round-trip', () => {
		const data = { entryId: '1', blogId: '42' };
		const stringified = stringifyFrontmatter('', data);
		const { data: parsed } = parseFrontmatter(stringified);

		expect(typeof parsed.entryId).toBe('string');
		expect(typeof parsed.blogId).toBe('string');
		expect(parsed.entryId).toBe('1');
		expect(parsed.blogId).toBe('42');
	});

	test('returns raw content when no frontmatter is present', () => {
		expect(stringifyFrontmatter('', { title: 'Empty' })).toContain(
			'title: Empty',
		);
		expect(parseFrontmatter('No frontmatter here.')).toEqual({
			data: {},
			content: 'No frontmatter here.',
		});
	});
});
