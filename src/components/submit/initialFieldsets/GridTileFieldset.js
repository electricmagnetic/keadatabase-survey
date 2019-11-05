import React from 'react';

import { Field } from 'formik';

import RenderField from '../../form/RenderField';

/**
  Fieldset for grid tile selection (wrapper around GridTilesSelectTypeahead).
 */
const GridTileFieldset = ({ values }) => (
  <fieldset className="mb-3">
    <legend>2. All Grid Tiles</legend>
    <p>Please enter all surveyed grid tiles.</p>
    <Field
      name="gridTiles"
      component={RenderField}
      values={values}
      type="gridTileSelect"
      multiple
      hideLabel
      label="Grid Tile Select"
    />
  </fieldset>
);

export default GridTileFieldset;
