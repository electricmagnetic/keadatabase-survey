import React from 'react';
import Helmet from 'react-helmet';

import GridTileDetail from '../../components/grid/GridTileDetail';
import Banner from '../../components/presentation/Banner';

const GridDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="GridDetailPage">
      <Helmet title="Grid Tile" />
      <section className="mb-4">
        <Banner size="small" additionalClasses="d-print-none">
          <h1>Grid Tile: {slug}</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <GridTileDetail id={slug} />
        </div>
      </section>
    </div>
  );
};

export default GridDetailPage;
