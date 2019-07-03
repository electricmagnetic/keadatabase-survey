import React from 'react';
import { Field, getIn } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';

import GridTileDetail from '../../grid/GridTileDetail';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import tiles from '../../../assets/geo/tiles.json';

const GridTileSelector = ({ field, form }) => {
  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const isInvalid = touched && error ? true : false;

  return (
    <div className="form-group">
      <label htmlFor="gridTiles" className="sr-only">
        Grid Tiles
      </label>
      <Typeahead
        {...field}
        options={tiles.features.map(feature => feature.id)}
        labelKey={option => `${option}`}
        minLength={4}
        multiple
        selectHintOnEnter
        highlightOnlyResult
        placeholder="Grid ID (XXXX-XX)"
        id={field.name}
        ignoreDiacritics={false}
        maxResults={4}
        isInvalid={isInvalid}
        onChange={selected => form.setFieldValue(field.name, selected)}
        onBlur={event => form.setFieldTouched(field.name, true)}
      />
      {/* `d-inline` is used to force visibility due to incompatibility of Typeahead with BS4 */}
      {isInvalid && <span className="invalid-feedback d-inline">{error}</span>}
    </div>
  );
};

const GridTileFieldset = ({ values }) => (
  <fieldset>
    <legend>2. Grid Tiles</legend>
    <div className="row">
      <div className="col-md-4">
        <Field name="gridTiles" component={GridTileSelector} />
      </div>
      <div className="col-md-8">
        <div className="card bg-light">
          <div className="card-body my-n3">
            {values.gridTiles.map(gridTile => (
              <GridTileDetail id={gridTile} key={gridTile} />
            ))}
            {values.gridTiles.length === 0 && <p className="my-3">No tiles selected.</p>}
          </div>
        </div>
      </div>
    </div>
  </fieldset>
);

export default GridTileFieldset;
