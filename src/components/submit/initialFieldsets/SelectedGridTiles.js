import React from 'react';
import PropTypes from 'prop-types';

import GridTileDetail from '../../grid/GridTileDetail';

/**
  Displays a given set of gridTile IDs as a grid (without additional details).
 */
const SelectedGridTiles = ({ gridTiles }) => (
  <div className="SelectedGridTiles card bg-light">
    <div className="card-body my-n3">
      <div className="form-row">
        {gridTiles.map(gridTile => (
          <div className="col-6 col-md-4" key={gridTile}>
            <GridTileDetail id={gridTile} hideDetails />
          </div>
        ))}
      </div>
      {gridTiles.length === 0 && (
        <p className="my-3">
          <em>No tiles selected.</em>
        </p>
      )}
    </div>
  </div>
);

SelectedGridTiles.propTypes = {
  gridTiles: PropTypes.array.isRequired,
};

export default SelectedGridTiles;
