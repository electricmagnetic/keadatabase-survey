import React from 'react';
import PropTypes from 'prop-types';

import SurveyHours from '../../surveys/SurveyHours';
import SelectedGridTilesMap from '../../map/SelectedGridTilesMap';
import GridTileAnalysis from '../../analysis/GridTileAnalysis';

/**
  Presents a nicely formatted page for a given grid tile.
 */
const GridTilePage = ({ gridTile, ...others }) => {
  /* GeoJSON has tile data in properties, regular API endpoint does not */
  const tileData = gridTile.properties || gridTile;
  const id = others.id || gridTile.id;

  return (
    <div className="GridTilePage mb-1">
      <section className="mb-5">
        <div className="row">
          <div className="col-md-3">
            <img
              src={tileData.get_large_image}
              alt="Map grid tile"
              className="img-fluid img-thumbnail mb-3"
            />
            <dl>
              <dt>
                Southwest <small>NZTM</small>
              </dt>
              <dd>
                {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
              </dd>
              <dt>
                Northeast <small>NZTM</small>
              </dt>
              <dd>
                {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
              </dd>
            </dl>
          </div>
          <div className="col-md-9">
            <SelectedGridTilesMap gridTileIds={[id]} />
          </div>
        </div>
      </section>
      <section className="mb-5">
        <h2>Analysis</h2>
        <GridTileAnalysis id={id} />
      </section>
      <section className="mb-5">
        <h2>
          Recent Hours <small>(last 25)</small>
        </h2>
        <SurveyHours queryString={`?grid_tile=${gridTile.id}&page_size=25`} swapGridTileSurvey />
      </section>
    </div>
  );
};

GridTilePage.propTypes = {
  gridTile: PropTypes.object.isRequired,
};

export default GridTilePage;
