import React, { Component } from 'react';
import Helmet from 'react-helmet';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import Banner from '../../components/presentation/Banner';
import GridTileSelector from '../../components/submit/GridTileSelector';
import SubmissionForm from '../../components/submit/SubmissionForm';

const GridTileSelectorPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="Grid Tile Selection (Survey Submission)" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Survey Submission</h1>
          <h2 className="mt-3">Step 1</h2>
          <p className="lead mb-0">
            Please select all grid tiles that were surveyed during the day.
          </p>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <GridTileSelector />
        </div>
      </section>
    </div>
  );
};

const SubmissionFormPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="Form (Survey Submission)" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Survey Submission</h1>
          <h2 className="mt-3">Step 2</h2>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <SubmissionForm queryString={props.queryString} />
        </div>
      </section>
    </div>
  );
};

SubmissionFormPage.propTypes = {
  queryString: PropTypes.object,
};

class SubmissionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: {},
    };
  }

  updateStateFromQueryString() {
    // Store query string in state
    this.setState({
      queryString: queryString.parse(this.props.location.search, { arrayFormat: 'bracket' }),
    });
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryString();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryString();
  }

  render() {
    return this.state.queryString.gridTiles ? (
      <SubmissionFormPage queryString={this.state.queryString} />
    ) : (
      <GridTileSelectorPage />
    );
  }
}

SubmissionPage.propTypes = {
  'location.search': PropTypes.string,
};

export default SubmissionPage;
