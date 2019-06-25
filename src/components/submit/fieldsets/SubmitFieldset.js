import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../helpers/Loader';
import Error from '../../helpers/Error';

const SubmitFieldset = ({ submitCount, isValid, isSubmitting, postSubmissionResponse, errors }) => {
  const isLoading =
    (postSubmissionResponse && postSubmissionResponse.pending) ||
    (postSubmissionResponse && postSubmissionResponse.refreshing) ||
    isSubmitting;
  const isRejected = postSubmissionResponse && postSubmissionResponse.rejected;
  const isFulfilled = postSubmissionResponse && postSubmissionResponse.fulfilled;

  return (
    <fieldset>
      <legend className="sr-only">Submission</legend>
      <p>
        <button type="submit" className="btn btn-primary mr-3" disabled={isLoading || !isValid}>
          Submit
        </button>
        {!isValid && (
          <small>You cannot submit the form until all data has been entered correctly.</small>
        )}
      </p>
      {isRejected && (
        <Error message="Error">
          <p>An error was encountered. Please double-check the form for errors.</p>
          {postSubmissionResponse.reason.cause.detail &&
            `(${postSubmissionResponse.reason.cause.detail})`}
        </Error>
      )}
      {isLoading && <Loader />}
      {isFulfilled && <h1>Worked</h1>}
    </fieldset>
  );
};

SubmitFieldset.propTypes = {
  submitCount: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    fulfilled: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    reason: PropTypes.object,
    refreshing: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    settled: PropTypes.bool.isRequired,
  }),
  errors: PropTypes.object,
};

export default SubmitFieldset;
