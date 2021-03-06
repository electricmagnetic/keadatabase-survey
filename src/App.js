import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { Header, HomePageHeader } from './components/presentation/Header';
import { Footer, SubmitPageFooter } from './components/presentation/Footer';

import HomePage from './views/index';
import AboutPage from './views/about';
import LegalPage from './views/legal';
import InstructionsPage from './views/instructions';

import SubmissionPage from './views/submit/index';
import SubmissionSuccessPage from './views/submit/success';

import GridPage from './views/grid/index';
import GridDetailPage from './views/grid/detail';

import AnalysisPage from './views/analysis/index';

import SurveyPage from './views/surveys/index';
import SurveyDetailPage from './views/surveys/detail';

import NoMatchPage from './views/nomatch';

const CACHE_TIME = 24 * 60 * 60 * 1000;
const fetcher = async url => {
  const result = await fetch(url);

  if (!result.ok) {
    const error = new Error('An error occurred while fetching the data.');

    error.info = await result.json();
    error.status = result.status;
    throw error;
  }
  return result.json();
};

const OtherPagesContainer = () => {
  return (
    <>
      <Header />
      <main>
        <div className="constrainer">
          <Switch>
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/legal" component={LegalPage} />
            <Route exact path="/instructions" component={InstructionsPage} />

            <Route exact path="/submit" component={SubmissionPage} />
            <Route exact path="/submit/success" component={SubmissionSuccessPage} />
            <Route exact path="/submit/success/:slug" component={SubmissionSuccessPage} />

            <Route exact path="/grid" component={GridPage} />
            <Route exact path="/grid/:slug" component={GridDetailPage} />

            <Route exact path="/analysis" component={AnalysisPage} />

            <Route exact path="/surveys" component={SurveyPage} />
            <Route exact path="/surveys/:slug" component={SurveyDetailPage} />

            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </main>
    </>
  );
};

const HomePageContainer = () => {
  return (
    <>
      <HomePageHeader />
      <main>
        <HomePage />
      </main>
    </>
  );
};

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        dedupingInterval: CACHE_TIME,
        revalidateOnFocus: false,
      }}
    >
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePageContainer} />
            <Route component={OtherPagesContainer} />
          </Switch>
          <Switch>
            <Route exact path="/submit" component={SubmitPageFooter} />
            <Route component={Footer} />
          </Switch>
        </div>
      </Router>
    </SWRConfig>
  );
}

export default App;
