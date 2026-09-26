import { CindorBadge } from 'cindor-ui-core/components/badge/cindor-badge';
import { CindorBreadcrumbs } from 'cindor-ui-core/components/breadcrumbs/cindor-breadcrumbs';
import { CindorButton } from 'cindor-ui-core/components/button/cindor-button';
import { CindorCard } from 'cindor-ui-core/components/card/cindor-card';
import { CindorIcon } from 'cindor-ui-core/components/icon/cindor-icon';
import { CindorIconButton } from 'cindor-ui-core/components/icon-button/cindor-icon-button';
import { CindorLink } from 'cindor-ui-core/components/link/cindor-link';
import { CindorProvider } from 'cindor-ui-core/components/provider/cindor-provider';
import { CindorSearch } from 'cindor-ui-core/components/search/cindor-search';
import { CindorStack } from 'cindor-ui-core/components/stack/cindor-stack';

// Register only the components used by this site and their child components.
const components: [string, CustomElementConstructor][] = [
	['cindor-badge', CindorBadge],
	['cindor-breadcrumbs', CindorBreadcrumbs],
	['cindor-button', CindorButton],
	['cindor-card', CindorCard],
	['cindor-icon', CindorIcon],
	['cindor-icon-button', CindorIconButton],
	['cindor-link', CindorLink],
	['cindor-provider', CindorProvider],
	['cindor-search', CindorSearch],
	['cindor-stack', CindorStack],
];

for (const [name, component] of components) {
	if (!customElements.get(name)) customElements.define(name, component);
}

if (document.querySelector('cindor-code-block')) {
	import('cindor-ui-core/components/code-block/cindor-code-block').then(
		({ CindorCodeBlock }) => {
			if (!customElements.get('cindor-code-block'))
				customElements.define('cindor-code-block', CindorCodeBlock);
		},
	);
}
