import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import GridTileAnalysis from './GridTileAnalysis';
import GridTileAnalysesMap from './GridTileAnalysis/GridTileAnalysesMap';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/grid_tiles/`;

/**
  GridTileAnalyses fetches a series of gridTileAnalyses using a given (optional) queryString and renders it using GridTileAnalysis.
  */
class GridTileAnalyses extends Component {
  render() {
    const { gridTileAnalysesFetch, ...others } = this.props;

    if (gridTileAnalysesFetch.pending) {
      return <Loader />;
    } else if (gridTileAnalysesFetch.rejected) {
      return <Error message="Error fetching gridTileAnalyses" />;
    } else if (gridTileAnalysesFetch.fulfilled) {
      const gridTileAnalyses = gridTileAnalysesFetch.value;

      // Intercept type 'map', as this needs rendering as a group on a single map
      if (this.props.type === 'map')
        return <GridTileAnalysesMap gridTileAnalyses={gridTileAnalyses} {...others} />;
      else
        return gridTileAnalyses.map(gridTileAnalysis => (
          <GridTileAnalysis
            gridTileAnalysis={gridTileAnalysis}
            key={gridTileAnalysis.id}
            {...others}
          />
        ));
    } else return null;
  }
}

GridTileAnalyses.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

GridTileAnalyses.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  gridTileAnalysesFetch: `${API_URL}${props.queryString ? props.queryString : ''}`,
}))(GridTileAnalyses);
