import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import qs from 'qs';
import PropTypes from 'prop-types';

import { qsOptions } from './schema/surveyParameters';
import Banner from '../presentation/Banner';
import InitialDetailsForm from './initialDetails/InitialDetailsForm';
import SurveyDetailsForm from './surveyDetails/SurveyDetailsForm';

import './SubmissionForm.css';

const InitialDetailsFormPage = props => {
  return (
    <div className="SubmissionForm">
      <Helmet title="1. Observer and Trip Details | Submit Survey" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Submit Survey</h1>
          <p className="lead mb-0">Step 1: Observer and Trip Details</p>
        </Banner>
      </section>
      <section className="mb-5">
        <InitialDetailsForm />
      </section>
    </div>
  );
};

const SurveyDetailsFormPage = props => {
  return (
    <div className="SubmissionForm">
      <Helmet title="2. Survey Details | Submit Survey" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Submit Survey</h1>
          <p className="lead mb-0">Step 2: Survey Details</p>
        </Banner>
      </section>
      <section className="mb-5">
        <SurveyDetailsForm queryString={props.queryString} />
      </section>
    </div>
  );
};

SurveyDetailsFormPage.propTypes = {
  queryString: PropTypes.object,
};

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
    return this.state.queryString.gridTiles ? (
      <SurveyDetailsFormPage queryString={this.state.queryString} />
    ) : (
      <InitialDetailsFormPage />
    );
  }
}

SubmissionForm.propTypes = {
  'location.search': PropTypes.string,
};

export default withRouter(SubmissionForm);
