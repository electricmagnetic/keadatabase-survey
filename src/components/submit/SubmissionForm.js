import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Form, withFormik } from 'formik';

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

      // Conclude isSubmitting if either rejected or fulfilled
      if (postSubmissionResponse.rejected && this.props.isSubmitting)
        this.props.setSubmitting(false);
      if (postSubmissionResponse.fulfilled && this.props.isSubmitting)
        this.props.setSubmitting(false);

      // Set formik status if API errors encountered
      if (postSubmissionResponse.rejected) {
        // Only set status one time, after react-refetch has finished
        if (prevProps.postSubmissionResponse.settled !== postSubmissionResponse.settled) {
          this.props.setStatus(postSubmissionResponse.reason.cause);
        }
      }
    }
  }

  render() {
    const { submissionOptions } = this.props;

    if (submissionOptions.pending) return <Loader />;
    else if (submissionOptions.rejected)
      return (
        <Error message="Error">
          {submissionOptions.reason.cause.detail && `(${submissionOptions.reason.cause.detail})`}
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

export default connect(props => ({
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
}))(SubmissionForm);
