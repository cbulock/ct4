import styled from 'styled-components';

const SContent = styled.p`
	margin: 4px auto 0;
	width: fit-content;
	padding: 0.75em;
`;

const currentYear = new Date().getFullYear();

const Footer = () => (
	<footer>
		<SContent>{`©2003-${currentYear} Cameron Bulock`}</SContent>
	</footer>
);

export default Footer;
