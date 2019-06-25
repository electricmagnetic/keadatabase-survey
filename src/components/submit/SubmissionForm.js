import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import SurveyHourFieldset from './fieldsets/SurveyHourFieldset';
import SurveyFieldset from './fieldsets/SurveyFieldset';
import FurtherInformationFieldset from './fieldsets/FurtherInformationFieldset';
import SubmitFieldset from './fieldsets/SubmitFieldset';
import { initialValues } from './schema/initialValues';
import validationSchema from './schema/validationSchema';

const API_URL = `http://localhost:8000/report/survey/`;

class FormComponent extends Component {
  componentDidUpdate(prevProps) {
    // Handle react-refetch response (either successful POST or error handling for fields)
    if (this.props.postSubmissionResponse) {
      const { postSubmissionResponse } = this.props;
      const isSettled =
        postSubmissionResponse.settled &&
        prevProps.postSubmissionResponse.settled !== postSubmissionResponse.settled;

      // Conclude isSubmitting if either rejected or fulfilled
      if (
        (postSubmissionResponse.rejected || postSubmissionResponse.fulfilled) &&
        this.props.isSubmitting
      )
        this.props.setSubmitting(false);

      // Set formik status if API errors encountered, otherwise redirect to success page
      if (postSubmissionResponse.rejected && isSettled)
        this.props.setStatus(postSubmissionResponse.reason.cause);
      else if (postSubmissionResponse.fulfilled && isSettled)
        this.props.history.push(`/submit/success/${postSubmissionResponse.value.id}`);
    }
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
      const options = submissionOptions.value.actions.POST;
      return (
        <div>
          <p>All fields are required, except where indicated.</p>
          <Form>
            <SurveyFieldset {...this.props} options={options} />
            <SurveyHourFieldset {...this.props} options={options} />
            <FurtherInformationFieldset {...this.props} options={options} />
            <SubmitFieldset {...this.props} />
          </Form>
        </div>
      );
    } else return null;
  }
}

const SubmissionForm = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: validationSchema,
  handleSubmit: (values, actions) => {
    actions.props.postSubmission(values);
  },
})(FormComponent);

export default withRouter(
  connect(props => ({
    submissionOptions: {
      url: API_URL,
      method: 'OPTIONS',
    },
    postSubmission: values => ({
      postSubmissionResponse: {
        url: API_URL,
        method: 'POST',
        body: JSON.stringify(values),
      },
    }),
  }))(SubmissionForm)
);
