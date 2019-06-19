import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/presentation/Header';
import Footer from './components/presentation/Footer';

import HomePage from './views/index';
import AboutPage from './views/about';
import LegalPage from './views/legal';

import ReportPage from './views/report/index';

import GridPage from './views/grid/index';
import GridDetailPage from './views/grid/detail';

import NoMatchPage from './views/nomatch';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/legal" component={LegalPage} />

            <Route exact path="/report" component={ReportPage} />

            <Route exact path="/grid" component={GridPage} />
            <Route exact path="/grid/:slug" component={GridDetailPage} />

            <Route component={NoMatchPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
