import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../helpers/Error';
import GridTile from '../../grid/GridTile';

/**
  Displays a given set of gridTile IDs as a grid (without additional details).
 */
const SelectedGridTiles = ({ gridTiles }) => {
  if (gridTiles.length > 0) {
    return (
      <div className="SelectedGridTiles card bg-faded mb-3">
        <div className="card-body my-n3">
          <div className="form-row">
            {gridTiles.map(gridTile => (
              <div className="col-6 col-md-4" key={gridTile}>
                <GridTile id={gridTile} hideDetails type="card" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Error message="No grid tile selected" info />;
  }
};

SelectedGridTiles.propTypes = {
  gridTiles: PropTypes.array.isRequired,
};

export default SelectedGridTiles;
