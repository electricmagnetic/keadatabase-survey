import React from 'react';

import Error from '../../helpers/Error';

const SubmitFieldset = ({ isValid, submitCount, errors }) => (
  <fieldset className="mb-3">
    <legend className="sr-only">Submission</legend>
    <input type="submit" value="Next" className="btn btn-primary mr-3 mb-3" disabled={!isValid} />
    {!isValid && (
      <small className="d-inline-block">
        You cannot submit the form until all data has been entered correctly.
      </small>
    )}
    {submitCount > 0 && errors && !isValid && (
      <Error message="Error">
        <p>Please double-check the form for errors.</p>
      </Error>
    )}
  </fieldset>
);

export default SubmitFieldset;
