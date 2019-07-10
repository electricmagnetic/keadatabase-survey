import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Surveys from '../../components/surveys/Surveys';

const SurveyPage = props => {
  return (
    <div className="SurveyPage">
      <Helmet title="Surveys" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Surveys</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Recent Surveys</h2>
          <Surveys type="item" />
        </div>
      </section>
    </div>
  );
};

export default SurveyPage;
