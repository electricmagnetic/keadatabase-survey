import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePageHeader} />
          <Route component={Header} />
        </Switch>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />

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
        </main>
        <Switch>
          <Route exact path="/submit" component={SubmitPageFooter} />
          <Route component={Footer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
