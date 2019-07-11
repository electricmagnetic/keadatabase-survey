import React from 'react';
import PropTypes from 'prop-types';

import './GridTileCard.css';

/**
  Presents a nicely formatted card for a given grid tile.
 */
const GridTileCard = ({ gridTile, hideDetails }) => {
  /* GeoJSON has tile data in properties, regular API endpoint does not */
  const tileData = gridTile.properties || gridTile;

  const classNames = ['GridTileCard', 'card', 'my-3', hideDetails && 'hideDetails'];

  return (
    <div className={classNames.join(' ')}>
      <img src={tileData.get_large_image} alt="Map grid tile" className="card-img-top" />
      <div className="card-body">
        <h2 className="card-title">{gridTile.id}</h2>
        {!hideDetails && (
          <div className="card-text">
            <dl>
              <div className="row">
                <div className="col-6">
                  <dt>
                    SW <small>NZTM</small>
                  </dt>
                  <dd>
                    {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
                  </dd>
                </div>
                <div className="col-6">
                  <dt>
                    NE <small>NZTM</small>
                  </dt>
                  <dd>
                    {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
                  </dd>
                </div>
              </div>
              <dt>Source</dt>
              <dd>LINZ (CC BY 4.0)</dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

GridTileCard.propTypes = {
  gridTile: PropTypes.object.isRequired,
  hideDetails: PropTypes.bool.isRequired,
};

GridTileCard.defaultProps = {
  hideDetails: false,
};

export default GridTileCard;
