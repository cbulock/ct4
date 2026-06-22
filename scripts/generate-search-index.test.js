import { describe, expect, test } from 'vitest';

import { buildSearchIndex, normalizeRouteMonth } from './generate-search-index.mjs';

describe('generate-search-index', () => {
	test('normalizes legacy single-digit routeMonth values to zero-padded strings', () => {
		expect(normalizeRouteMonth(8)).toBe('08');
		expect(normalizeRouteMonth('9')).toBe('09');
		expect(normalizeRouteMonth('11')).toBe('11');
	});

	test('builds canonical search index paths with zero-padded months', () => {
		const searchIndex = buildSearchIndex([
			{
				entryId: 1,
				sortOrder: '1',
				title: 'August Post',
				keywords: '',
				body: 'Body',
				routeKey: '2003/08/august_post',
				routeYear: '2003',
				routeMonth: 8,
				basename: 'august_post',
			},
			{
				entryId: 2,
				sortOrder: '2',
				title: 'Duplicate Canonical Route',
				keywords: '',
				body: 'Ignored',
				routeKey: '2003/08/august_post',
				routeYear: '2003',
				routeMonth: '08',
				basename: 'august_post',
			},
		]);

		expect(searchIndex).toEqual([
			expect.objectContaining({
				path: '/2003/08/august_post',
			}),
		]);
	});
});
