import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import GridTileMap from '../../components/grid/GridTileMap';

const GridPage = props => {
  return (
    <div className="GridPage">
      <Helmet title="Grid Tile Map" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Grid Tile Map</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <GridTileMap />
        </div>
      </section>
    </div>
  );
};

export default GridPage;
