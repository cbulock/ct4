import { visit } from 'unist-util-visit';

const getLanguage = (className = []) => {
	const classes = Array.isArray(className) ? className : [className];
	const languageClass = classes.find((value) => typeof value === 'string' && value.startsWith('language-'));

	return languageClass ? languageClass.slice('language-'.length) : '';
};

const getTextContent = (node) => {
	if (!node) {
		return '';
	}

	if (node.type === 'text') {
		return node.value;
	}

	if (!Array.isArray(node.children)) {
		return '';
	}

	return node.children.map(getTextContent).join('');
};

const convertPreCodeElement = (node) => {
	if (node?.type !== 'element' || node.tagName !== 'pre') {
		return null;
	}

	const [codeNode] = node.children ?? [];

	if (codeNode?.type !== 'element' || codeNode.tagName !== 'code') {
		return null;
	}

	const language = getLanguage(codeNode.properties?.className);

	return {
		type: 'element',
		tagName: 'cindor-code-block',
		properties: language ? { language } : {},
		children: [
			{
				type: 'text',
				value: getTextContent(codeNode),
			},
		],
	};
};

const rehypeCindorCodeBlocks = () => (tree) => {
	visit(tree, 'element', (node, index, parent) => {
		if (!parent || typeof index !== 'number') {
			return;
		}

		const replacementNode = convertPreCodeElement(node);

		if (!replacementNode) {
			return;
		}

		parent.children[index] = replacementNode;
	});
};

export { convertPreCodeElement, rehypeCindorCodeBlocks };
