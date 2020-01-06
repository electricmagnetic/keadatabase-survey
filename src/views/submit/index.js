import React, { Component } from 'react';
import Helmet from 'react-helmet';
import qs from 'qs';
import PropTypes from 'prop-types';

import { qsOptions } from '../../components/submit/schema/surveyParameters';
import Banner from '../../components/presentation/Banner';
import InitialSurveyForm from '../../components/submit/InitialSurveyForm';
import SubmissionForm from '../../components/submit/SubmissionForm';
import Error from '../../components/helpers/Error';

import {
  queryStringValidationSchema,
  initialValidationSchema,
} from '../../components/submit/schema/validationSchemas';

const InitialSurveyFormPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="1. Details | Survey Submission" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Survey Submission</h1>
          <h2 className="mt-3 mb-1">Step 1</h2>
          <p className="lead mb-0">
            Please enter your details and the grid tiles you were in during the survey period.
          </p>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <InitialSurveyForm queryString={props.queryString} />
        </div>
      </section>
    </div>
  );
};

const SubmissionFormPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="2. Surveyed Hours | Survey Submission" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Survey Submission</h1>
          <h2 className="mt-3 mb-1">Step 2</h2>
          <p className="lead mb-0">
            Please enter the specific details of your trip and the hours observed. All fields are
            required except where indicated.
          </p>
          <p>
            <em>
              If you expect to be entering data for these grid squares regularly, you can bookmark
              this page to save time.
            </em>
          </p>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <SubmissionForm queryString={props.queryString} />
        </div>
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
      queryString: qs.parse(this.props.location.search, qsOptions) || {},
    };
  }

  updateStateFromQueryString() {
    // Store query string in state
    this.setState({
      queryString: qs.parse(this.props.location.search, qsOptions),
    });
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryString();
  }

  render() {
    const { queryString } = this.state;
    console.log(queryStringValidationSchema.validateSync(queryString));

    if (queryStringValidationSchema.isValidSync(queryString)) {
      return <InitialSurveyFormPage queryString={queryString} />;
    } else if (initialValidationSchema.isValidSync(queryString)) {
      return <SubmissionFormPage queryString={queryString} />;
    } else {
      return <Error message="Invalid URL parameters provided" />;
    }
  }
}

SubmissionPage.propTypes = {
  'location.search': PropTypes.string,
};

export default SubmissionPage;
