import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'components/GlobalStyle';

import theme from 'theme';

import Header from 'components/global/Header';
import Footer from 'components/global/Footer';
import PageContainer from 'components/global/PageContainer';

import HomePage from 'components/pages/Home';
import EntryPage from 'components/pages/Entry';
import Archives from 'components/pages/Archives';
import Year from 'components/pages/Year';
import Category from 'components/pages/Category';

const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<Header />
		<PageContainer>
			<Router>
				<Switch>
					<Route path="/:year/:month/:entryBasename">
						<EntryPage />
					</Route>
					<Route path="/archives">
						<Archives />
					</Route>
					<Route path="/cat/:categoryBasename">
						<Category />
					</Route>
					<Route path="/:year">
						<Year />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</Router>
		</PageContainer>
		<Footer />
	</ThemeProvider>
);

export default App;
