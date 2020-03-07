import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import GridTile from './GridTile';
import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import getUniqueGridTiles from '../helpers/getUniqueGridTiles';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/hours/?page_size=90`;

/**
  Displays grid tiles condensed from survey hours.
 */
const GridTilesFromSurveyHours = ({ surveyHoursFetch, limit, classes, ...others }) => {
  if (surveyHoursFetch.pending) {
    return <Loader />;
  } else if (surveyHoursFetch.rejected) {
    return <Error message="Error loading grid tiles" />;
  } else if (surveyHoursFetch.fulfilled) {
    const gridTileIds = getUniqueGridTiles(surveyHoursFetch.value.results).slice(0, limit);

    return (
      <div className="RecentGridTiles">
        <div className="form-row my-n3">
          {gridTileIds.map(gridTileId => (
            <div className={classes} key={gridTileId}>
              <Link to={`/grid/${gridTileId}`}>
                <GridTile id={gridTileId} {...others} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};

GridTilesFromSurveyHours.propTypes = {
  limit: PropTypes.number.isRequired,
  classes: PropTypes.string.isRequired,
};

GridTilesFromSurveyHours.defaultProps = {
  limit: 4,
  classes: 'col-6 col-md-4 col-lg-3',
};

export default connect(props => ({
  surveyHoursFetch: `${API_URL}`,
}))(GridTilesFromSurveyHours);
