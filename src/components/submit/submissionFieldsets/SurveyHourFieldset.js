import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

import { RenderField } from '../../helpers/RenderField';
import { initialHourValues } from '../schema/initialValues';
import { surveyHours } from '../schema/surveyParameters';

const RenderHours = ({ arrayHelpers, options }) => {
  const { values } = arrayHelpers.form;

  return (
    <div className="RenderHours table-responsive">
      {values.gridTiles && values.gridTiles.length === 1 && (
        <div className="alert alert-info">
          Only one grid tile has been selected, so this has been added to every hour.
        </div>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Hour</th>
            <th>Activity</th>
            <th>Kea?</th>
            <th>Grid Tile</th>
          </tr>
        </thead>
        <tbody>
          {values.hours &&
            values.hours.length > 0 &&
            values.hours.map((hour, index) => (
              <tr
                key={index}
                className={
                  !surveyHours.winter.includes(hour.hour) ? 'table-warning summer' : 'winter'
                }
              >
                <td>
                  <Field
                    component={RenderField}
                    options={options.hour}
                    name={`hours.${index}.hour`}
                    type="number"
                    label="Hour"
                    readOnly
                    hideLabel
                  />
                </td>
                <td>
                  <Field
                    component={RenderField}
                    options={options.activity}
                    name={`hours.${index}.activity`}
                    type="choice"
                    label="Activity"
                    addBlank
                    hideLabel
                  />
                </td>
                <td>
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name={`hours.${index}.kea`}
                      className="form-check-input"
                      id={`hours.${index}.kea`}
                    />
                    <label className="form-check-label" htmlFor={`hours.${index}.kea`}>
                      Kea
                    </label>
                  </div>
                </td>
                <td>
                  <Field
                    component={RenderField}
                    options={options.grid_tile}
                    name={`hours.${index}.grid_tile`}
                    type="text"
                    label="Grid Tile"
                    hideLabel
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const HourFieldset = ({ options, values }) => {
  return (
    <fieldset className="mb-3">
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
