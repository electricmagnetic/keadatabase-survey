import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, withFormik } from 'formik';
import qs from 'qs';

import ObserverFieldset from './initialFieldsets/ObserverFieldset';
import GridTileFieldset from './initialFieldsets/GridTileFieldset';
import SubmitFieldset from './initialFieldsets/SubmitFieldset';
import SelectedGridTiles from './initialFieldsets/SelectedGridTiles';
import GridTileSelectMap from '../map/GridTileSelectMap';

import { qsOptions } from './schema/surveyParameters';
import { initialInitialValues } from './schema/initialValues';
import { initialValidationSchema } from './schema/validationSchemas';

/**
  Enables user to select a set of gridTiles as specified in `tiles.json`.
  Submission results in an appropriately formatted query string pushed to same URL.
 */
class InitialSurveyFormComponent extends Component {
  render() {
    return (
      <div className="InitialSurveyForm">
        <Form className="form mb-3">
          <ObserverFieldset {...this.props} />
          <div className="row">
            <div className="col-md-6">
              <GridTileFieldset {...this.props} />
              <SubmitFieldset {...this.props} />
              <SelectedGridTiles gridTiles={this.props.values.gridTiles} />
            </div>
            <div className="col-md-6">
              <GridTileSelectMap {...this.props} />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const InitialSurveyForm = withFormik({
  mapPropsToValues: props => initialInitialValues,
  validationSchema: initialValidationSchema,
  handleSubmit: (values, actions) => {
    const queryString = `${qs.stringify(values, qsOptions)}`;
    actions.props.history.push(`${queryString}`);
  },
})(InitialSurveyFormComponent);

export default withRouter(InitialSurveyForm);
