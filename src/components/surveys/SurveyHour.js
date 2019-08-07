import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyHourItem from './SurveyHour/SurveyHourItem';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/hours/`;

class SurveyHour extends Component {
  constructor(props) {
    super(props);
    this.renderSurveyHour = this.renderSurveyHour.bind(this);
  }

  renderSurveyHour(surveyHour) {
    const { type, ...others } = this.props;
    switch (type) {
      default:
        return <SurveyHourItem surveyHour={surveyHour} {...others} />;
    }
  }

  componentDidMount() {
    if (this.props.id) this.props.lazyFetchSurveyHour(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) this.props.lazyFetchSurveyHour(this.props.id);
  }

  render() {
    if (this.props.surveyHourFetch) {
      const { surveyHourFetch } = this.props;
      if (surveyHourFetch.pending) {
        return <Loader />;
      } else if (surveyHourFetch.rejected) {
        return <Error message="Survey hour invalid" />;
      } else if (surveyHourFetch.fulfilled) {
        return this.renderSurveyHour(surveyHourFetch.value);
      }
    } else if (this.props.surveyHour) {
      return this.renderSurveyHour(this.props.surveyHour);
    } else return null;
  }
}

SurveyHour.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  surveyHour: PropTypes.object,
};

SurveyHour.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  lazyFetchSurveyHour: id => ({
    surveyHourFetch: `${API_URL}${props.id}/`,
  }),
}))(SurveyHour);
