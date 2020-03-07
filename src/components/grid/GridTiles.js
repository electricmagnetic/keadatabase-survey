import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import GridTile from './GridTile';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/grid_tiles/`;

class GridTiles extends Component {
  render() {
    const { gridTilesFetch, ...others } = this.props;

    if (gridTilesFetch.pending) {
      return <Loader />;
    } else if (gridTilesFetch.rejected) {
      return <Error message="Error fetching grid tiles" />;
    } else if (gridTilesFetch.fulfilled) {
      return gridTilesFetch.value.results.map(gridTile => (
        <GridTile gridTile={gridTile} key={gridTile.id} {...others} />
      ));
    } else return null;
  }
}

GridTiles.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

GridTiles.defaultProps = {
  type: 'item',
};

export default connect(props => ({
  gridTilesFetch: `${API_URL}${props.queryString ? props.queryString : ''}`,
}))(GridTiles);
