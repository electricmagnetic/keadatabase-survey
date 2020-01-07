import React from 'react';

import { Field } from 'formik';

import RenderField from '../../../form/RenderField';

/**
  Fieldset for grid tile selection (wrapper around GridTilesSelectTypeahead).
 */
const GridTileFieldset = ({ values }) => (
  <fieldset className="mb-3">
    <legend>2. Trip Details</legend>
    <p>Please select all surveyed grid tiles from the duration of your trip.</p>
    <Field
      name="gridTiles"
      component={RenderField}
      values={values}
      type="gridTileSelect"
      multiple
      label="Select grid tiles"
    />
  </fieldset>
);

export default GridTileFieldset;
