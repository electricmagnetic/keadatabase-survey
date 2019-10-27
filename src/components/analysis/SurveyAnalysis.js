import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import { calculateEncounterRate } from './calculations/surveyCalculations';

const API_URL = `https://data.keadatabase.nz/analysis/surveys/`;

/**
  Display analyses as an item
 */
const SurveyAnalysisItem = ({ surveyAnalysis }) => {
  const encounterRate = calculateEncounterRate(surveyAnalysis);

  return (
    <div className="SurveyAnalysisItem">
      <dl>
        <div className="row">
          <div className="col-md-2">
            <dt>Hours with kea</dt>
            <dd>{surveyAnalysis.hours_with_kea}</dd>
          </div>
          <div className="col-md-2">
            <dt>Hours surveyed</dt>
            <dd>{surveyAnalysis.hours_surveyed}</dd>
          </div>
          <div className="col-md-2">
            <dt>Encounter rate</dt>
            <dd>{encounterRate}%</dd>
          </div>
        </div>
      </dl>
    </div>
  );
};

SurveyAnalysisItem.propTypes = {
  surveyAnalysis: PropTypes.object.isRequired,
};

/**
  Obtain analyses for a given survey
 */
class SurveyAnalysis extends Component {
  render() {
    const { surveyAnalysisFetch } = this.props;
    if (surveyAnalysisFetch.pending) {
      return <Loader />;
    } else if (surveyAnalysisFetch.rejected) {
      return <Error message="No data found for this survey" info />;
    } else if (surveyAnalysisFetch.fulfilled) {
      return <SurveyAnalysisItem surveyAnalysis={surveyAnalysisFetch.value} />;
    }
  }
}

SurveyAnalysis.propTypes = {
  id: PropTypes.number.isRequired,
};

export default connect(props => ({
  surveyAnalysisFetch: `${API_URL}${props.id}/`,
}))(SurveyAnalysis);
