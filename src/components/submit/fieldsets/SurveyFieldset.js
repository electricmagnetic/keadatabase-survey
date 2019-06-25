import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const SurveyFieldset = ({ options, values, setFieldValue }) => {
  return (
    <fieldset>
      <fieldset>
        <legend>1. Details</legend>
        <div className="row">
          <div className="col-md-3">
            <Field
              component={RenderField}
              options={options.observer.children.name}
              name="observer.name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="col-md-4">
            <Field
              component={RenderField}
              options={options.observer.children.email}
              name="observer.email"
              type="text"
              placeholder="Email"
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
        <div className="row">
          <div className="col-md-3">
            <Field
              component={RenderField}
              options={options.date}
              name="date"
              type="date"
              placeholder="Date"
            />
          </div>
        </div>
      </fieldset>
    </fieldset>
  );
};

SurveyFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default SurveyFieldset;
