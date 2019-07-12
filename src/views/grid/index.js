import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import GridTileMap from '../../components/map/GridTileMap';
import GridTileTool from '../../components/grid/GridTileTool';

const GridPage = props => {
  return (
    <div className="GridPage">
      <Helmet title="Grid Tiles" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Grid Tiles</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Quick Search</h2>
          <GridTileTool />
        </div>
      </section>
      <section className="py-4 bg-light mb-5">
        <div className="container">
          <h2>Map</h2>
          <GridTileMap />
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Download Grid</h2>
          <p>
            The kea survey grid is a subset of the{' '}
            <a href="https://birdatlas.co.nz/" target="_blank" rel="noopener noreferrer">
              New Zealand Bird Atlas
            </a>{' '}
            grid tiles.
          </p>
          <p>
            Each kea survey grid tile matches the ID of a bird atlas 10km by 10km tile, but has been
            further divided into four 5km by 5km tiles with one of four cardinal marker suffixes
            (NW/NE/SW/SE).
          </p>
          <p>It is provided in multiple formats below for download.</p>
          <p>
            <a
              href="https://geo.keadatabase.nz/grid/grid_tiles.gpx"
              className="btn btn-primary mr-3 mb-3"
            >
              <i className="fa-fw fas fa-file-download mr-1"></i>Download GPX
            </a>
            <a
              href="https://geo.keadatabase.nz/grid/grid_tiles.geojson"
              className="btn btn-primary mr-3 mb-3"
            >
              <i className="fa-fw fas fa-file-download mr-1"></i>Download GeoJSON
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default GridPage;
