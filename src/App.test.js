import { renderLegacyContent } from './lib/renderLegacyContent';
import { cleanEntryBasename, getEntryPath } from './lib/routes';

test('renders legacy content by appending line breaks per stored newline', () => {
	expect(renderLegacyContent('Line one\nLine two')).toBe(
		'Line one<br />\nLine two<br />',
	);
});

test('builds canonical and legacy-compatible entry paths', () => {
	const entry = {
		routeYear: '2005',
		routeMonth: '02',
		basename: 'what_im_reading',
	};

	expect(getEntryPath(entry)).toBe('/2005/02/what_im_reading');
	expect(getEntryPath(entry, { legacyHtml: true })).toBe(
		'/2005/02/what_im_reading.html',
	);
	expect(cleanEntryBasename('what_im_reading.html')).toBe('what_im_reading');
});
