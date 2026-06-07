import MarkdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';

const escapeHtml = (value = '') =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const markdownRenderer = new MarkdownIt({
	breaks: true,
	linkify: false,
});

markdownRenderer.use(markdownItContainer, 'footer-note', {
	validate: (params) => /^footer-note(?:\s+.*)?$/u.test(params.trim()),
	render: (tokens, index) =>
		tokens[index].nesting === 1
			? '<div class="footer_note">\n'
			: '</div>\n',
});

markdownRenderer.use(markdownItContainer, 'youtube', {
	validate: (params) => /^youtube\s+[A-Za-z0-9_-]{11}$/u.test(params.trim()),
	render: (tokens, index) => {
		if (tokens[index].nesting !== 1) {
			return '';
		}

		const match = tokens[index].info.trim().match(/^youtube\s+([A-Za-z0-9_-]{11})$/u);

		if (!match) {
			return '';
		}

		const videoId = match[1];
		const embedUrl = `https://www.youtube.com/embed/${videoId}`;

		return `<div class="youtube-embed">\n<iframe src="${embedUrl}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>\n</div>\n`;
	},
});

markdownRenderer.renderer.rules.fence = (tokens, index) => {
	const token = tokens[index];
	const language = token.info.trim().split(/\s+/u)[0];
	const languageAttribute = language ? ` language="${escapeHtml(language)}"` : '';

	return `<cindor-code-block${languageAttribute}>${escapeHtml(token.content)}</cindor-code-block>\n`;
};

const renderMarkdownContent = (content = '') => markdownRenderer.render(String(content));

export { renderMarkdownContent };
