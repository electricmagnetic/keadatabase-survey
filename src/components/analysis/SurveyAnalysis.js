import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import SurveyAnalysisItem from './SurveyAnalysis/SurveyAnalysisItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/surveys/`;

/**
  Obtain analyses for a given survey
 */
class SurveyAnalysis extends Component {
  render() {
    const { surveyAnalysisFetch } = this.props;
    if (surveyAnalysisFetch.pending) {
      return <Loader />;
    } else if (surveyAnalysisFetch.rejected) {
      if (surveyAnalysisFetch.meta.response.status === 404)
        return <Error message="No analyses found" info />;
      else return <Error message="Error fetching analyses" />;
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
