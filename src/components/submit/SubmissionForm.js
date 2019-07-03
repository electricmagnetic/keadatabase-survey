import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import SurveyHourFieldset from './submissionFieldsets/SurveyHourFieldset';
import TripFieldset from './submissionFieldsets/TripFieldset';
import FurtherInformationFieldset from './submissionFieldsets/FurtherInformationFieldset';
import SubmitFieldset from './submissionFieldsets/SubmitFieldset';

import { initialFullValues } from './schema/initialValues';
import { fullValidationSchema, initialValidationSchema } from './schema/validationSchemas';

const API_URL = `https://data.keadatabase.nz/report/survey/`;

/**
  Master form layout for survey submission.

  Verifies that gridTiles have been passed via URL parameters. Also checks to see if parameters are valid.
  Loads permissible choices using react-refetch from an OPTIONS call to the API.
  Validates data using yup, reports errors back to user. Also reports API errors back to user using 'status' field.

  On successful client-side validation, values are posted to server and user is redirected to success page.
 */
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

    // Validate parameters passed via queryString
    if (!initialValidationSchema.isValidSync(this.props.queryString))
      return <Error message="Invalid or missing URL parameters" />;

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
        <>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <dl>
                    <dt>Name</dt>
                    <dd>{this.props.queryString.observer.name}</dd>
                  </dl>
                </div>
                <div className="col-md-6">
                  <dl>
                    <dt>Email</dt>
                    <dd>{this.props.queryString.observer.email}</dd>
                  </dl>
                </div>
              </div>
              <em>
                If you expect to be entering data for these grid squares regularly, you can bookmark
                this page to save time.
              </em>
            </div>
          </div>
          <div className="alert alert-primary">
            <dl>
              <dt>Grid Tiles</dt>
              <dd>{this.props.queryString.gridTiles.map(gridTile => `${gridTile} `)}</dd>
            </dl>
            <p>Nothing happens with these yet</p>
          </div>
          <p>All fields are required, except where indicated.</p>
          <Form>
            <TripFieldset {...this.props} options={options} />
            <SurveyHourFieldset {...this.props} options={options} />
            <FurtherInformationFieldset {...this.props} options={options} />
            <SubmitFieldset {...this.props} />
          </Form>
        </>
      );
    } else return null;
  }
}

const SubmissionForm = withFormik({
  mapPropsToValues: props => Object.assign({}, initialFullValues, props.queryString),
  validationSchema: fullValidationSchema,
  handleSubmit: (values, actions) => {
    actions.props.postSubmission(values);
  },
})(FormComponent);

SubmissionForm.propTypes = {
  queryString: PropTypes.shape({
    gridTiles: PropTypes.array.isRequired,
  }).isRequired,
};

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
