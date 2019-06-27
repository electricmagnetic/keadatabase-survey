import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './GetGridTile.css';

const API_URL = `https://data.keadatabase.nz/geojson/grid_tiles/`;

/**
  Presents a nicely formatted card for a given tile.
 */
const GridTileDetailView = ({ tile }) => {
  return (
    <div className="card mt-3">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img src={tile.properties.get_image} alt="Map tile" className="card-img img-full" />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h2 className="card-title">{tile.id}</h2>
            <dl className="card-text">
              <dt>Lower Left (NZTM)</dt>
              <dd>
                {tile.properties.min.coordinates[0]}, {tile.properties.min.coordinates[1]}
              </dd>
              <dt>Upper Right (NZTM)</dt>
              <dd>
                {tile.properties.max.coordinates[0]}, {tile.properties.max.coordinates[1]}
              </dd>
              <dt>Source</dt>
              <dd>
                <small>Land Information New Zealand, licensed for reuse (CC BY 4.0).</small>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
  Displays a grid tile (if one given), or downloads information from API (if ID provided).
 */
class GridTileDetail extends Component {
  componentDidMount() {
    if (this.props.id) this.props.lazyFetchGridTile(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id)
      if (this.props.id !== prevProps.id) this.props.lazyFetchGridTile(this.props.id);
  }

  render() {
    if (this.props.gridTileFetch) {
      const { gridTileFetch } = this.props;

      if (gridTileFetch.pending) {
        return <Loader />;
      } else if (gridTileFetch.rejected) {
        return <Error message="Tile ID invalid" />;
      } else if (gridTileFetch.fulfilled) {
        return <GridTileDetailView tile={gridTileFetch.value} />;
      }
    } else if (this.props.tile) {
      return <GridTileDetailView tile={this.props.tile} />;
    } else return null;
  }
}

GridTileDetail.propTypes = {
  id: PropTypes.string,
  tile: PropTypes.object,
};

export default connect(props => ({
  lazyFetchGridTile: id => ({
    gridTileFetch: `${API_URL}${props.id}/`,
  }),
}))(GridTileDetail);
