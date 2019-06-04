import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';

const LegalPage = props => {
  return (
    <div className="LegalPage">
      <Helmet title="About" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Legal</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Privacy Policy</h2>
          <p>To be provided</p>
        </div>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Terms of Use</h2>
          <p>To be provided</p>
        </div>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Copyright</h2>
          <p>To be provided</p>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
