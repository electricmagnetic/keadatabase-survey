import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, withFormik } from 'formik';
import qs from 'qs';

import Messages from './initialFieldsets/Messages';
import ObserverFieldset from './initialFieldsets/ObserverFieldset';
import GridTileFieldset from './initialFieldsets/GridTileFieldset';
import SubmitFieldset from './initialFieldsets/SubmitFieldset';
import SelectedGridTiles from './initialFieldsets/SelectedGridTiles';
import GridTileSelectMap from '../map/GridTileSelectMap';

import { qsOptions } from './schema/surveyParameters';
import { initialInitialValues } from './schema/initialValues';
import { initialValidationSchema } from './schema/validationSchemas';

import './Form.css';

/**
  Enables user to select a set of gridTiles as specified in `tiles.json`.
  Submission results in an appropriately formatted query string pushed to same URL.
 */
class InitialSurveyFormComponent extends Component {
  render() {
    return (
      <div className="InitialSurveyForm">
        <Form className="form mb-3">
          <div className="container">
            <Messages {...this.props} />
            <ObserverFieldset {...this.props} />
            <GridTileFieldset {...this.props} />
            <p>
              <em>You can select grid tiles on the map below.</em>
            </p>
          </div>
          <div className="submit-bar fixed-bottom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <SubmitFieldset {...this.props} />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row no-gutters">
              <div className="col-lg-9 mb-3">
                <GridTileSelectMap {...this.props} />
              </div>
              <div className="col-lg-3 mb-3">
                <SelectedGridTiles {...this.props} />
              </div>
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
