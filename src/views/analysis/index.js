import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';

const AnalysisPage = props => {
  return (
    <div className="AnalysisPage">
      <Helmet title="Analysis" />
      <section className="d-print-none">
        <Banner size="small">
          <h1>Analysis</h1>
        </Banner>
      </section>
      <section>
      </section>
    </div>
  );
};

export default AnalysisPage;
