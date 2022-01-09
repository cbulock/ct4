import { useState } from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { getEntriesPerSearch } from 'utils/entryData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SContainer = styled.div`
	position: relative;
`;

const SResults = styled.div`
	border-radius: 8px;
	box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.6);
	background-color: ${({ theme }) => theme.offWhite};
	position: absolute;
	top: 32px;
	right: 0;
	width: 180%;
`;

const SList = styled.ul`
	list-style: none;
`;

const SListItem = styled.li`
	margin-bottom: 0.5em;
`;

const SInput = styled.input`
	width: 6em;
	height: 20px;
	border-radius: 16px;
	border-width: 1px;
	border-style: solid;
	padding-left: 8px;
	padding-right: 25px;
	@media all and (min-width: 576px) {
		width: 14em;
	}
`;

const SIcon = styled(FontAwesomeIcon)`
	color: ${({ theme }) => theme.primary};
	position: absolute;
	right: 6px;
	top: 6px;
	height: 16px;
`;

const Search = () => {
	const [showResults, setShowResults] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const search = (term) => {
		if (term.length < 3) {
			// don't waste time with small search terms
			setSearchResults([]);
			return;
		}
		setSearchResults(getEntriesPerSearch(term));
	};

	return (
		<SContainer>
			<SInput
				type="text"
				onFocus={() => setShowResults(true)}
				onInput={(e) => search(e.target.value)}
			/>
			<SIcon icon={faSearch} />
			{!!searchResults.length && showResults && (
				<SResults>
					<SList>
						{searchResults.map((entry) => (
							<SListItem>
								<Link
									onClick={() => setShowResults(false)}
									to={`/${entry.year}/${entry.month}/${entry.basename}`}
								>
									{entry.title}
								</Link>
							</SListItem>
						))}
					</SList>
				</SResults>
			)}
		</SContainer>
	);
};

export default Search;
