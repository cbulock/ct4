import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import entries from 'entries';
import formatEntryContent from 'utils/formatEntryContent';
import EntryContainer from 'components/common/EntryContainer';

const SDate = styled.p`
	font-size: 0.875rem;
	font-style: oblique;
`;

const Entry = () => {
	const { entryBasename } = useParams();

	// '.html' was appended to all URL's on the Movable Type and PHP iterations of this site
	const cleanEntryBasename = entryBasename.split('.')[0];

	const entry = entries.find((e) => e.entry_basename === cleanEntryBasename);

	const {
		entry_title: title,
		entry_text: text,
		entry_created_on: createdData,
	} = entry;

	const formatedDate = new Date(createdData).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const formatedTime = new Date(createdData).toLocaleTimeString('en-us');

	return (
		<EntryContainer>
			<Helmet>
				<title>{`${title} - Cameron's Thoughts`}</title>
			</Helmet>
			<h2>{title}</h2>
			<p>{formatEntryContent(text)}</p>
			<SDate>{`Posted on ${formatedDate} at ${formatedTime}`}</SDate>
		</EntryContainer>
	);
};

export default Entry;
