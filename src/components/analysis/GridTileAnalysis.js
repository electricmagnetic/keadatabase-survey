import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import HoursSurveyedPerQuarter from './graphs/HoursSurveyedPerQuarter';

import { calculateEncounterRate } from './calculations/gridTileCalculations';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/grid_tiles/`;

/**
  Display analyses as an item
 */
const GridTileAnalysisItem = ({ gridTileAnalysis }) => {
  return (
    <div className="GridTileAnalysisItem">
      <div className="row">
        <div className="col-md-2">
          <dl>
            <dt>Hours with kea</dt>
            <dd>{gridTileAnalysis.hours_total.with_kea}</dd>
            <dt>Total hours</dt>
            <dd>{gridTileAnalysis.hours_total.total}</dd>
            <dt>Encounter rate</dt>
            <dd>{calculateEncounterRate(gridTileAnalysis)}%</dd>
          </dl>
        </div>
        <div className="col-sm-6 col-md-3">
          <dl>
            <dt>Quarterly breakdown</dt>
            <dd>
              <HoursSurveyedPerQuarter gridTileAnalysis={gridTileAnalysis} />
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

GridTileAnalysisItem.propTypes = {
  gridTileAnalysis: PropTypes.object.isRequired,
};

/**
  Obtain analyses for a given grid tile
 */
class GridTileAnalysis extends Component {
  render() {
    const { gridTileAnalysisFetch } = this.props;
    if (gridTileAnalysisFetch.pending) {
      return <Loader />;
    } else if (gridTileAnalysisFetch.rejected) {
      return <Error message="No data found for this grid tile" info />;
    } else if (gridTileAnalysisFetch.fulfilled) {
      return <GridTileAnalysisItem gridTileAnalysis={gridTileAnalysisFetch.value} />;
    }
  }
}

GridTileAnalysis.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(props => ({
  gridTileAnalysisFetch: `${API_URL}${props.id}/`,
}))(GridTileAnalysis);
