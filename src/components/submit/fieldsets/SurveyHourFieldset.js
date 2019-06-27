import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

import { RenderField } from '../../helpers/RenderField';
import { initialHourValues } from '../schema/initialValues';
import { surveyHours } from '../schema/surveyParameters';

const RenderHours = ({ arrayHelpers, options }) => {
  const { values } = arrayHelpers.form;

  return (
    <div className="RenderHours">
      {values.hours &&
        values.hours.length > 0 &&
        values.hours.map((hour, index) => (
          <div key={index}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <Field
                      component={RenderField}
                      options={options.hour}
                      name={`hours.${index}.hour`}
                      type="number"
                      label="Hour"
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <Field
                      component={RenderField}
                      options={options.activity}
                      name={`hours.${index}.activity`}
                      type="choice"
                      label="Activity"
                      addBlank
                    />
                  </div>

                  <div className="col-md-2">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name={`hours.${index}.kea`}
                        className="form-check-input"
                        id={`hours.${index}.kea`}
                      />
                      <label className="form-check-label" htmlFor={`hours.${index}.kea`}>
                        Kea observed?
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <Field
                      component={RenderField}
                      options={options.grid_tile}
                      name={`hours.${index}.grid_tile`}
                      type="text"
                      label="Grid Tile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <button
        type="button"
        className="btn btn-primary mr-3"
        onClick={() => {
          surveyHours.summer.map(hour =>
            arrayHelpers.push(Object.assign({}, initialHourValues, { hour: hour }))
          );
        }}
      >
        Summer
      </button>
      <button
        type="button"
        className="btn btn-primary mr-3"
        onClick={() => {
          surveyHours.winter.map(hour =>
            arrayHelpers.push(Object.assign({}, initialHourValues, { hour: hour }))
          );
        }}
      >
        Winter
      </button>
    </div>
  );
};

const HourFieldset = ({ options, values }) => {
  return (
    <fieldset>
      <legend>2. Hours</legend>
      <FieldArray
        initialValues={initialHourValues}
        name="hours"
        render={arrayHelpers => (
          <RenderHours arrayHelpers={arrayHelpers} options={options.hours.child.children} />
        )}
      />
    </fieldset>
  );
};

HourFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default HourFieldset;
