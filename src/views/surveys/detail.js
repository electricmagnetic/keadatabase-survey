import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';

const SurveyDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="SurveyDetailPage">
      <Helmet title="Grid Tile" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Survey: {slug}</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <p>TODO</p>
        </div>
      </section>
    </div>
  );
};

export default SurveyDetailPage;
