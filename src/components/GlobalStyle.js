import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		background-color: ${({ theme }) => theme.offWhite};
		font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: 'B612 Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
	}

	a {
		color: black;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`;

export default GlobalStyle;
