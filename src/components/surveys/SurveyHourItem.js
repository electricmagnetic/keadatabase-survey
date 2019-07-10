import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SurveyHour.css';

/**
  Presents a nicely formatted list item for a given survey hour.
 */
const SurveyHourItem = ({ surveyHour }) => {
  const hasKea = surveyHour.kea;
  const notSurveying = surveyHour.activity === 'X';

  const classNames = [
    'SurveyHourItem',
    'card',
    'mb-1',
    hasKea && 'hasKea',
    `activity-${surveyHour.activity}`,
  ];

  return (
    <div className={classNames.join(' ')}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-2 field-hour">
            <i className="fa-fw far fa-clock mr-3"></i>
            {surveyHour.get_hour_display}
          </div>
          <div className="col-md-3 field-activity">
            <i className="fa-fw fas fa-walking mr-3"></i>
            {surveyHour.get_activity_display}
          </div>
          {!notSurveying && (
            <>
              <div className="col-md-2 field-kea">
                <i className="fa-fw fas fa-feather-alt mr-3"></i>
                {hasKea ? 'Kea' : 'No Kea'}
              </div>
              <div className="col-md-5 field-gridTile">
                <i className="fa-fw fas fa-map-marker-alt mr-3"></i>
                <Link to={`/grid/${surveyHour.grid_tile}`}>{surveyHour.grid_tile}</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

SurveyHourItem.propTypes = {
  surveyHour: PropTypes.object.isRequired,
};

export default SurveyHourItem;
