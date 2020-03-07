import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyHour from './SurveyHour';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/hours/`;

class SurveyHours extends Component {
  render() {
    const { surveyHoursFetch, ...others } = this.props;

    if (surveyHoursFetch.pending) {
      return <Loader />;
    } else if (surveyHoursFetch.rejected) {
      return <Error message="Error fetching survey hours" />;
    } else if (surveyHoursFetch.fulfilled) {
      const surveyHours = surveyHoursFetch.value.results;
      if (surveyHours.length > 0) {
        return surveyHours.map(surveyHour => (
          <SurveyHour surveyHour={surveyHour} key={surveyHour.id} {...others} />
        ));
      } else return <Error message="No hours found" info />;
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
