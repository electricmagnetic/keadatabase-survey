import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';

const SurveyPage = props => {
  return (
    <div className="SurveyPage">
      <Helmet title="Surveys" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Surveys</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Surveys</h2>
          <p>TODO</p>
        </div>
      </section>
    </div>
  );
};

export default SurveyPage;
