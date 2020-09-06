import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';
import GPXConvert from '../components/gpx/GPXConvert';

const GPXPage = props => {
  return (
    <div className="GPXPage">
      <Helmet title="GPX" />
      <section className="mb-5">
        <Banner size="small">
          <h1>GPX Conversion</h1>
          <p>This tool can be used to approximate the grid tiles for a given GPX track.</p>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <GPXConvert />
        </div>
      </section>
    </div>
  );
};

export default GPXPage;
