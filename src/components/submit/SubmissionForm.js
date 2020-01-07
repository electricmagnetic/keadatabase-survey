import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

import { qsOptions } from './schema/surveyParameters';
import InitialDetailsForm from './initialDetails/InitialDetailsForm';
import SurveyDetailsForm from './surveyDetails/SurveyDetailsForm';

import './SubmissionForm.css';

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
    return (
      <div className="SubmissionForm">
        {this.state.queryString.gridTiles ? (
          <SurveyDetailsForm queryString={this.state.queryString} />
        ) : (
          <InitialDetailsForm />
        )}
      </div>
    );
  }
}

SubmissionForm.propTypes = {
  'location.search': PropTypes.string,
};

export default withRouter(SubmissionForm);
