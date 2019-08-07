import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Survey from './Survey';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/surveys/`;

class Surveys extends Component {
  render() {
    const { surveysFetch, ...others } = this.props;

    if (surveysFetch.pending) {
      return <Loader />;
    } else if (surveysFetch.rejected) {
      return <Error message="Error fetching surveys" />;
    } else if (surveysFetch.fulfilled) {
      return surveysFetch.value.results.map(survey => (
        <Survey survey={survey} key={survey.id} {...others} />
      ));
    } else return null;
  }
}

Surveys.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

Surveys.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  surveysFetch: `${API_URL}${props.queryString ? props.queryString : ''}`,
}))(Surveys);
