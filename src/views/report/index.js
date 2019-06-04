import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';

const ReportPage = props => {
  return (
    <div className="ReportPage">
      <Helmet title="Report" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Report</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <p>Report tool goes here</p>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
