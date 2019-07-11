import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SurveyHour.css';

/**
  Presents a nicely formatted list item for a given survey hour.
  `swapGridTileSurvey` enables toggling betwen showing the grid tile or the survey ID.
 */
const SurveyHourItem = ({ surveyHour, swapGridTileSurvey }) => {
  const hasKea = surveyHour.kea;
  const notSurveying = surveyHour.activity === 'X';
  const showSurvey = swapGridTileSurvey;
  const showGridTile = !swapGridTileSurvey;

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
          {showSurvey && (
            <div className="col-md-2 field-survey">
              <i className="fa-fw fas fa-clipboard-list mr-3"></i>
              <Link to={`/surveys/${surveyHour.survey}`}>#{surveyHour.survey}</Link>
            </div>
          )}
          <div className="col-md-2 field-hour">
            <i className="fa-fw fas fa-clock mr-3"></i>
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
              {showGridTile && (
                <div className="col-md-5 field-gridTile">
                  <i className="fa-fw fas fa-map-marker-alt mr-3"></i>
                  <Link to={`/grid/${surveyHour.grid_tile}`}>{surveyHour.grid_tile}</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

SurveyHourItem.propTypes = {
  surveyHour: PropTypes.object.isRequired,
  swapGridTileSurvey: PropTypes.bool.isRequired,
};

SurveyHourItem.defaultProps = {
  swapGridTileSurvey: false,
};

export default SurveyHourItem;
