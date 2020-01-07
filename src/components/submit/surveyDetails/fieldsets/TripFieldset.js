import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import GridTile from '../../../grid/GridTile';
import RenderField from '../../../form/RenderField';

const TripFieldset = ({ fieldOptions, values, setFieldValue }) => (
  <fieldset className="mb-3">
    <legend>1. Trip Details</legend>
    <div className="row">
      <div className="col-md-4">
        <Field
          component={RenderField}
          fieldOptions={fieldOptions.observer.children.name}
          name="observer.name"
          type="text"
          readOnly
          tabIndex={-1}
        />
      </div>
      <div className="col-md-5">
        <Field
          component={RenderField}
          fieldOptions={fieldOptions.observer.children.email}
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
          fieldOptions={fieldOptions.date}
          name="date"
          type="date"
          placeholder="Date"
          helpText="If a multi-day journey, start with earliest date"
          autoFocus
        />
      </div>
      <div className="col-md-5">
        <Field
          component={RenderField}
          fieldOptions={fieldOptions.observer.children.purpose}
          name="observer.purpose"
          type="choice"
          helpText="Optional"
        />
      </div>
    </div>

    <label className="control-label" htmlFor="gridTiles">
      Where
    </label>
    <div id="gridTiles" className="form-row my-n3">
      {values.gridTiles.map(gridTileId => (
        <div className="col-4 col-md-3 col-lg-2" key={gridTileId}>
          <GridTile id={gridTileId} type="card" hideDetails />
        </div>
      ))}
    </div>
  </fieldset>
);

TripFieldset.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default TripFieldset;
