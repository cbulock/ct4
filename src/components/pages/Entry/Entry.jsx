import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import entries from 'entries';

const Entry = () => {
	const { entryBasename } = useParams();

	const entry = entries.find((e) => e.entry_basename === entryBasename);

	const { entry_title: title, entry_text: text } = entry;

	return (
		<>
			<h2>{title}</h2>
			<p>
				{text.split('\n').map((item, key) => (
					// eslint-disable-next-line react/no-array-index-key
					<Fragment key={key}>
						{parse(item)}
						<br />
					</Fragment>
				))}
			</p>
		</>
	);
};

export default Entry;
