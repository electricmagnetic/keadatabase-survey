import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import SurveyPage from './Survey/SurveyPage';
import SurveyItem from './Survey/SurveyItem';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://data.keadatabase.nz/surveys/surveys/`;

class Survey extends Component {
  constructor(props) {
    super(props);
    this.renderSurvey = this.renderSurvey.bind(this);
  }

  renderSurvey(survey) {
    const { type, ...others } = this.props;
    switch (type) {
      case 'item':
        return <SurveyItem survey={survey} {...others} />;
      default:
        return <SurveyPage survey={survey} {...others} />;
    }
  }

  componentDidMount() {
    if (this.props.id) this.props.lazyFetchSurvey(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) this.props.lazyFetchSurvey(this.props.id);
  }

  render() {
    if (this.props.surveyFetch) {
      const { surveyFetch } = this.props;
      if (surveyFetch.pending) {
        return <Loader />;
      } else if (surveyFetch.rejected) {
        return <Error message="Survey invalid" />;
      } else if (surveyFetch.fulfilled) {
        return this.renderSurvey(surveyFetch.value);
      }
    } else if (this.props.survey) {
      return this.renderSurvey(this.props.survey);
    } else return null;
  }
}

Survey.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  survey: PropTypes.object,
};

Survey.defaultProps = {
  type: 'page',
};

export default connect(props => ({
  lazyFetchSurvey: id => ({
    surveyFetch: `${API_URL}${props.id}/`,
  }),
}))(Survey);
