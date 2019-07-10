import React from 'react';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

/**
  Fieldset for two of three observer fields (observer.purpose is part of submissionFieldsets)
 */
const ObserverFieldset = ({ values, setFieldValue }) => (
  <fieldset className="mb-3">
    <legend>1. Your Details</legend>
    <div className="row">
      <div className="col-md-3">
        <Field
          component={RenderField}
          name="observer.name"
          type="text"
          placeholder="Name"
          label="Name"
        />
      </div>
      <div className="col-md-4">
        <Field
          component={RenderField}
          name="observer.email"
          type="text"
          placeholder="Email"
          label="Email"
        />
      </div>
    </div>
  </fieldset>
);

export default ObserverFieldset;