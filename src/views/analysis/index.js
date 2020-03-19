import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import AnalysisMap from '../../components/map/AnalysisMap';

const AnalysisPage = props => {
  return (
    <div className="AnalysisPage">
      <Helmet title="Survey Analysis" />
      <section className="d-print-none">
        <Banner size="small">
          <h1>Survey Analysis</h1>
        </Banner>
      </section>
      <section>
      </section>
    </div>
  );
};

export default AnalysisPage;
