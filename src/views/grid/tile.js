import React from 'react';
import Helmet from 'react-helmet';

import GetGridTile from '../../components/grid/GetGridTile';
import Banner from '../../components/presentation/Banner';

const GridTilePage = props => {
  return (
    <div className="GridToolPage">
      <Helmet title="Get Grid Tile" />
      <section className="mb-4">
        <Banner size="small" additionalClasses="d-print-none">
          <h1 className="mb-3">Get Grid Tile</h1>
          <p className="lead">Obtain the grid square image for a particular ID</p>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <GetGridTile />
        </div>
      </section>
    </div>
  );
};

export default GridTilePage;
