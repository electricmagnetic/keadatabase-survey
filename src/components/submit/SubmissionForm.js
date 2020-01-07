import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-refetch';
import qs from 'qs';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import { qsOptions } from './schema/surveyParameters';
import InitialDetailsForm from './initialDetails/InitialDetailsForm';
import SurveyDetailsForm from './surveyDetails/SurveyDetailsForm';

import './SubmissionForm.css';

const API_URL = `https://data.keadatabase.nz/report/survey/`;

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: {},
    };
  }

  updateStateFromQueryString() {
    // Store query string in state
    this.setState({
      queryString: qs.parse(this.props.location.search, qsOptions),
    });
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryString();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryString();
  }

  render() {
    const { submissionOptions } = this.props;

    if (submissionOptions.pending) return <Loader />;
    else if (submissionOptions.rejected)
      return (
        <Error message="Error">
          {submissionOptions.reason.cause && `(${submissionOptions.reason.cause.detail})`}
        </Error>
      );
    else if (submissionOptions.fulfilled) {
      const fieldOptions = submissionOptions.value.actions.POST;

      return (
        <div className="SubmissionForm">
          {this.state.queryString.gridTiles ? (
            <SurveyDetailsForm queryString={this.state.queryString} fieldOptions={fieldOptions} />
          ) : (
            <InitialDetailsForm fieldOptions={fieldOptions} />
          )}
        </div>
      );
    } else return null;
  }
}

SubmissionForm.propTypes = {
  'location.search': PropTypes.string,
};

export default withRouter(
  connect(props => ({
    submissionOptions: {
      url: API_URL,
      method: 'OPTIONS',
    },
  }))(SubmissionForm)
);
