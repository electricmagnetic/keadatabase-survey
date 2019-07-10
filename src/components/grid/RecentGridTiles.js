import React from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import GridTileDetail from './GridTileDetail';
import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import getUniqueGridTiles from '../helpers/getUniqueGridTiles';

const API_URL = `https://data.keadatabase.nz/surveys/hours/?page_size=45`;

/**
  Displays grid tiles with recent hours
 */
const RecentGridTiles = ({ recentSurveyHoursFetch }) => {
  if (recentSurveyHoursFetch.pending) {
    return <Loader />;
  } else if (recentSurveyHoursFetch.rejected) {
    return <Error message="Error loading grid tiles" />;
  } else if (recentSurveyHoursFetch.fulfilled) {
    const gridTileIds = getUniqueGridTiles(recentSurveyHoursFetch.value.results).slice(-4);

    return (
      <div className="RecentGridTiles">
        <h2>Recently Surveyed Tiles</h2>
        <div className="form-row my-n3">
          {gridTileIds.map(gridTileId => (
            <div className="col-md" key={gridTileId}>
              <Link to={`/grid/${gridTileId}`}>
                <GridTileDetail id={gridTileId} hideDetails />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};

export default connect(props => ({
  recentSurveyHoursFetch: `${API_URL}`,
}))(RecentGridTiles);
