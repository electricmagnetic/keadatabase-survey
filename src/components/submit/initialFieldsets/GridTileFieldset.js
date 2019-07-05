import React from 'react';

import { Field } from 'formik';

import GridTileSelectTypeahead from '../../grid/GridTileSelectTypeahead';

/**
  Fieldset for grid tile selection (wrapper around GridTileSelectTypeahead).
 */
const GridTileFieldset = ({ values }) => (
  <fieldset className="mb-3">
    <legend>2. Grid Tiles</legend>
    <Field name="gridTiles" component={GridTileSelectTypeahead} values={values} />
  </fieldset>
);

export default GridTileFieldset;
