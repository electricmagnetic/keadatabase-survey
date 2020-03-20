import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import GridTileAnalysisItem from './GridTileAnalysis/GridTileAnalysisItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/grid_tiles/`;

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
