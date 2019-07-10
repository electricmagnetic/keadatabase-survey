import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SurveyHourItem from './SurveyHourItem';
import FormatDate from '../helpers/FormatDate';
import GridTileDetail from '../grid/GridTileDetail';
import getUniqueGridTiles from '../helpers/getUniqueGridTiles';

/**
  Presents a nicely formatted page for a given survey.
 */
const SurveyPage = ({ survey }) => {
  const gridTileIds = getUniqueGridTiles(survey.hours);

  return (
    <div className="SurveyPage">
      <section className="mb-5">
        <h2>Details</h2>
        <dl>
          <div className="row">
            <div className="col-md-4">
              <dt>Date</dt>
              <dd>
                <FormatDate>{survey.date}</FormatDate>
              </dd>
            </div>
            <div className="col-md-4">
              <dt>Observer</dt>
              <dd>{survey.observer}</dd>
            </div>
            {survey.max_flock_size && (
              <div className="col-md-4">
                <dt>Max Kea Seen</dt>
                <dd>{survey.max_flock_size}</dd>
              </div>
            )}
          </div>
          {survey.comments && (
            <>
              <dt>Comments</dt>
              <dd>{survey.comments}</dd>
            </>
          )}
        </dl>
      </section>
      <section className="mb-5">
        <h2>Hours</h2>
        {survey.hours.map(surveyHour => (
          <SurveyHourItem surveyHour={surveyHour} key={surveyHour.id} />
        ))}
      </section>
      <section className="mb-5">
        <h2>Grid Tiles</h2>
        <div className="row my-n3">
          {gridTileIds.map(gridTileId => (
            <div className="col-md-3" key={gridTileId}>
              <Link to={`/grid/${gridTileId}`}>
                <GridTileDetail id={gridTileId} hideDetails />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

SurveyPage.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyPage;