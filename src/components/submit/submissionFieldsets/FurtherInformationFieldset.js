import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const FurtherInformationFieldset = ({ options }) => (
  <fieldset>
    <legend>3. Further Information</legend>
    <div className="row">
      <div className="col-md-4">
        <Field
          component={RenderField}
          options={options.max_flock_size}
          name="max_flock_size"
          type="number"
          label="Max kea seen"
        />
      </div>
    </div>

    <Field
      component={RenderField}
      options={options.comments}
      name="comments"
      type="textarea"
      placeholder="Any comments? (optional)"
    />
  </fieldset>
);

FurtherInformationFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default FurtherInformationFieldset;
