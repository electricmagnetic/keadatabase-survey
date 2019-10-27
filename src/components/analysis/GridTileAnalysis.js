import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import { calculateEncounterRate } from './calculations/gridTileCalculations';

const API_URL = `https://data.keadatabase.nz/analysis/grid_tiles/`;

/**
  Display analyses as an item
 */
const GridTileAnalysisItem = ({ gridTileAnalysis }) => {
  const encounterRate = calculateEncounterRate(gridTileAnalysis);

  return (
    <div className="GridTileAnalysisItem">
      <dl>
        <div className="row">
          <div className="col-md-2">
            <dt>Hours with kea</dt>
            <dd>{gridTileAnalysis.hours_with_kea}</dd>
          </div>
          <div className="col-md-2">
            <dt>Total hours</dt>
            <dd>{gridTileAnalysis.hours_total}</dd>
          </div>
          <div className="col-md-2">
            <dt>Encounter rate</dt>
            <dd>{encounterRate}%</dd>
          </div>
        </div>
      </dl>
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
