import React from 'react';
import { Field, getIn } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';

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
  <fieldset className="mb-3">
    <legend>2. Grid Tiles</legend>
    <Field name="gridTiles" component={GridTileSelector} />
  </fieldset>
);

export default GridTileFieldset;
