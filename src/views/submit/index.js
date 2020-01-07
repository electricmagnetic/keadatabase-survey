import React, { Component } from 'react';
import Helmet from 'react-helmet';
import qs from 'qs';
import PropTypes from 'prop-types';

import { qsOptions } from '../../components/submit/schema/surveyParameters';
import Banner from '../../components/presentation/Banner';
import InitialSurveyForm from '../../components/submit/InitialSurveyForm';
import SubmissionForm from '../../components/submit/SubmissionForm';

const InitialSurveyFormPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="1. Observer and Trip Details | Submit Survey" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Submit Survey</h1>
          <p className="lead mb-0">Step 1: Observer and Trip Details</p>
        </Banner>
      </section>
      <section className="mb-5">
        <InitialSurveyForm />
      </section>
    </div>
  );
};

const SubmissionFormPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="2. Survey Details | Submit Survey" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Submit Survey</h1>
          <p className="lead mb-0">Step 2: Survey Details</p>
        </Banner>
      </section>
      <section className="mb-5">
        <SubmissionForm queryString={props.queryString} />
      </section>
    </div>
  );
};

SubmissionFormPage.propTypes = {
  queryString: PropTypes.object,
};

class SubmissionPage extends Component {
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
      <SubmissionFormPage queryString={this.state.queryString} />
    ) : (
      <InitialSurveyFormPage />
    );
  }
}

SubmissionPage.propTypes = {
  'location.search': PropTypes.string,
};

export default SubmissionPage;
