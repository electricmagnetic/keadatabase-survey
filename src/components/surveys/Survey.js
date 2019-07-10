import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyPage from './SurveyPage';
import SurveyItem from './SurveyItem';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/surveys/`;

class Survey extends Component {
  render() {
    const { type, surveyFetch } = this.props;

    if (surveyFetch.pending) {
      return <Loader />;
    } else if (surveyFetch.rejected) {
      return <Error message="Survey invalid" />;
    } else if (surveyFetch.fulfilled) {
      const survey = surveyFetch.value;

      switch (type) {
        case 'item':
          return <SurveyItem survey={survey} />;
        default:
          return <SurveyPage survey={survey} />;
      }
    } else return null;
  }
}

Survey.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Survey.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  surveyFetch: `${API_URL}${props.id}/`,
}))(Survey);
