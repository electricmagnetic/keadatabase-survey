import React from 'react';

import GridTileDetail from '../../grid/GridTileDetail';

const SelectedGridTiles = ({ gridTiles }) => (
  <div className="SelectedGridTiles card bg-light">
    <div className="card-body my-n3">
      {gridTiles.map(gridTile => (
        <GridTileDetail id={gridTile} key={gridTile} />
      ))}
      {gridTiles.length === 0 && (
        <p className="my-3">
          <em>No tiles selected.</em>
        </p>
      )}
    </div>
  </div>
);

export default SelectedGridTiles;
