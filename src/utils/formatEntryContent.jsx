import { Fragment } from 'react';
import parse from 'html-react-parser';

export default (content) =>
	content.split('\n').map((item, key) => (
		// eslint-disable-next-line react/no-array-index-key
		<Fragment key={key}>
			{parse(item)}
			<br />
		</Fragment>
	));
