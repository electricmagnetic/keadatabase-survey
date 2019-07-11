import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyHour from './SurveyHour';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/hours/`;

class SurveyHours extends Component {
  render() {
    const { surveyHoursFetch, ...others } = this.props;

    if (surveyHoursFetch.pending) {
      return <Loader />;
    } else if (surveyHoursFetch.rejected) {
      return <Error message="Error fetching survey hours" />;
    } else if (surveyHoursFetch.fulfilled) {
      return surveyHoursFetch.value.results.map(surveyHour => (
        <SurveyHour surveyHour={surveyHour} key={surveyHour.id} {...others} />
      ));
    } else return null;
  }
}

SurveyHours.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

SurveyHours.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  surveyHoursFetch: `${API_URL}${props.queryString ? props.queryString : ''}`,
}))(SurveyHours);
