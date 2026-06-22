import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stringLike = z.union([z.string(), z.number()]).transform((value) => String(value));
const nullableStringLike = z
	.union([z.string(), z.number(), z.null()])
	.transform((value) => (value === null ? null : String(value)));

const posts = defineCollection({
	loader: glob({
		base: './content/posts',
		pattern: '**/*.md',
	}),
	schema: z
		.object({
			sortOrder: z.number(),
			entryId: z.string(),
			blogId: z.string().optional(),
			status: z.string().optional(),
			authorId: z.string().optional(),
			allowComments: z.string().optional(),
			allowPings: nullableStringLike.optional(),
			convertBreaks: z.string().optional(),
			categoryId: nullableStringLike.optional(),
			originalCategoryId: nullableStringLike.optional(),
			title: z.string(),
			excerpt: z.string().optional(),
			keywords: z.string().optional(),
			createdOn: z.string(),
			modifiedOn: z.string().optional(),
			basename: z.string(),
			atomId: z.string().optional(),
			weekNumber: nullableStringLike.optional(),
			routeYear: stringLike,
			routeMonth: stringLike,
			routeKey: z.string(),
			canonicalRouteEntryId: z.string(),
			isCanonicalRouteEntry: z.boolean(),
			textMoreIgnored: z.boolean().optional(),
		})
		.passthrough(),
});

export const collections = { posts };
