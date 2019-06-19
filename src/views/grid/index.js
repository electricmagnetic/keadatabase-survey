import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import GridTileMap from '../../components/grid/GridTileMap';
import GridTileTool from '../../components/grid/GridTileTool';

const GridPage = props => {
  return (
    <div className="GridPage">
      <Helmet title="Grid Tiles" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Grid Tiles</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Quick Search</h2>
          <GridTileTool />
        </div>
      </section>
      <section className="mb-4">
        <div className="container">
          <h2>Map</h2>
          <GridTileMap />
        </div>
      </section>
    </div>
  );
};

export default GridPage;
