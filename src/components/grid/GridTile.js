import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import GridTilePage from './GridTile/GridTilePage';
import GridTileItem from './GridTile/GridTileItem';
import GridTileCard from './GridTile/GridTileCard';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import tiles from '../../assets/geo/tiles.json';

const API_URL = `https://data.keadatabase.nz/surveys/grid_tiles/`;

/**
  Displays a grid tile using a local source, a fetch or a provided object.
*/
class GridTile extends Component {
  constructor(props) {
    super(props);
    this.renderGridTile = this.renderGridTile.bind(this);
  }

  renderGridTile(gridTile) {
    // Allowing for an invalid grid tile from local source
    if (!gridTile) return <Error message="Tile ID invalid" />;

    const { type, ...others } = this.props;

    switch (this.props.type) {
      case 'card':
        return <GridTileCard gridTile={gridTile} {...others} />;
      case 'item':
        return <GridTileItem gridTile={gridTile} {...others} />;
      default:
        return <GridTilePage gridTile={gridTile} {...others} />;
    }
  }

  componentDidMount() {
    if (this.props.api && this.props.id) this.props.lazyFetchGridTile(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.api && this.props.id !== prevProps.id)
      this.props.lazyFetchGridTile(this.props.id);
  }

  render() {
    if (this.props.gridTileFetch) {
      const { gridTileFetch } = this.props;
      if (gridTileFetch.pending) {
        return <Loader />;
      } else if (gridTileFetch.rejected) {
        return <Error message="Tile ID invalid" />;
      } else if (gridTileFetch.fulfilled) {
        return this.renderGridTile(gridTileFetch.value);
      }
    } else if (this.props.gridTile) {
      return this.renderGridTile(this.props.gridTile);
    } else if (!this.props.api) {
      return this.renderGridTile(tiles.features.find(tile => tile.id === this.props.id));
    } else return null;
  }
}

GridTile.propTypes = {
  id: PropTypes.string,
  gridTile: PropTypes.object,
  type: PropTypes.string.isRequired,
  api: PropTypes.bool.isRequired,
};

GridTile.defaultProps = {
  type: 'item',
  api: false,
};

export default connect(props => ({
  lazyFetchGridTile: id => ({
    gridTileFetch: `${API_URL}${props.id}/`,
  }),
}))(GridTile);
