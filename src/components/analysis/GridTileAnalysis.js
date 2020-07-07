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
  constructor(props) {
    super(props);
    this.renderGridTileAnalysis = this.renderGridTileAnalysis.bind(this);
  }

  renderGridTileAnalysis(gridTileAnalysis) {
    const { type, ...others } = this.props;
    switch (type) {
      default:
        return <GridTileAnalysisItem gridTileAnalysis={gridTileAnalysis} {...others} />;
    }
  }

  componentDidMount() {
    if (this.props.id) this.props.lazyFetchGridTileAnalysis(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) this.props.lazyFetchGridTileAnalysis(this.props.id);
  }

  render() {
    if (this.props.gridTileAnalysisFetch) {
      const { gridTileAnalysisFetch } = this.props;
      if (gridTileAnalysisFetch.pending) {
        return <Loader />;
      } else if (gridTileAnalysisFetch.rejected) {
        if (gridTileAnalysisFetch.meta.response.status === 404)
          return <Error message="No analyses found" info />;
        else return <Error message="Error fetching analyses" />;
      } else if (gridTileAnalysisFetch.fulfilled) {
        return this.renderGridTileAnalysis(gridTileAnalysisFetch.value);
      }
    } else if (this.props.gridTileAnalysis) {
      return this.renderGridTileAnalysis(this.props.gridTileAnalysis);
    } else return null;
  }
}

GridTileAnalysis.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  gridTileAnalysis: PropTypes.object,
};

GridTileAnalysis.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  lazyFetchGridTileAnalysis: id => ({
    gridTileAnalysisFetch: `${API_URL}${props.id}/`,
  }),
}))(GridTileAnalysis);
