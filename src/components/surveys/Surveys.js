import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyPage from './SurveyPage';
import SurveyItem from './SurveyItem';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/surveys/`;

class Surveys extends Component {
  render() {
    const { type, surveysFetch } = this.props;

    if (surveysFetch.pending) {
      return <Loader />;
    } else if (surveysFetch.rejected) {
      return <Error message="Error fetching surveys" />;
    } else if (surveysFetch.fulfilled) {
      const surveys = surveysFetch.value.results;

      switch (type) {
        case 'item':
          return surveys.map(survey => <SurveyItem survey={survey} key={survey.id} />);
        default:
          return surveys.map(survey => <SurveyPage survey={survey} key={survey.id} />);
      }
    } else return null;
  }
}

Surveys.propTypes = {
  type: PropTypes.string.isRequired,
};

Surveys.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  surveysFetch: `${API_URL}`,
}))(Surveys);
