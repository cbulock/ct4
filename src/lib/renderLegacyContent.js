const renderLegacyContent = (content = '') =>
	String(content)
		.replace(/\r\n/g, '\n')
		.split('\n')
		.map((line) => `${line}<br />`)
		.join('\n');

export { renderLegacyContent };
