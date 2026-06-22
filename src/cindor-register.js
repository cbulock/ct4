import { CindorBadge } from 'cindor-ui-core/components/badge/cindor-badge';
import { CindorCard } from 'cindor-ui-core/components/card/cindor-card';
import { CindorCodeBlock } from 'cindor-ui-core/components/code-block/cindor-code-block';
import { CindorLayout } from 'cindor-ui-core/components/layout/cindor-layout';
import { CindorLayoutContent } from 'cindor-ui-core/components/layout-content/cindor-layout-content';
import { CindorLayoutHeader } from 'cindor-ui-core/components/layout-header/cindor-layout-header';
import { CindorLink } from 'cindor-ui-core/components/link/cindor-link';
import { CindorProvider } from 'cindor-ui-core/components/provider/cindor-provider';
import { CindorSearch } from 'cindor-ui-core/components/search/cindor-search';
import { CindorStack } from 'cindor-ui-core/components/stack/cindor-stack';

const definitions = [
	['cindor-badge', CindorBadge],
	['cindor-card', CindorCard],
	['cindor-code-block', CindorCodeBlock],
	['cindor-layout', CindorLayout],
	['cindor-layout-content', CindorLayoutContent],
	['cindor-layout-header', CindorLayoutHeader],
	['cindor-link', CindorLink],
	['cindor-provider', CindorProvider],
	['cindor-search', CindorSearch],
	['cindor-stack', CindorStack],
];

for (const [tagName, elementClass] of definitions) {
	if (!customElements.get(tagName)) {
		customElements.define(tagName, elementClass);
	}
}
