import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';

const AboutPage = props => {
  return (
    <div className="AboutPage">
      <Helmet title="About" />
      <section className="mb-4">
        <Banner size="small">
          <h1>About</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <p>About the Kea Survey Tool</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
