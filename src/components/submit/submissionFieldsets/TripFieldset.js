import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const TripFieldset = ({ options, values, setFieldValue }) => (
  <fieldset className="mb-3">
    <legend>1. Trip Details</legend>
    <div className="row">
      <div className="col-md-4">
        <Field
          component={RenderField}
          options={options.observer.children.name}
          name="observer.name"
          type="text"
          readOnly
          tabIndex={-1}
        />
      </div>
      <div className="col-md-5">
        <Field
          component={RenderField}
          options={options.observer.children.email}
          name="observer.email"
          type="email"
          readOnly
          tabIndex={-1}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <Field
          component={RenderField}
          options={options.date}
          name="date"
          type="date"
          placeholder="Date"
          autoFocus
        />
      </div>
      <div className="col-md-5">
        <Field
          component={RenderField}
          options={options.observer.children.purpose}
          name="observer.purpose"
          type="choice"
        />
      </div>
    </div>
  </fieldset>
);

TripFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default TripFieldset;
