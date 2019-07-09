import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import tiles from '../../assets/geo/tiles.json';
import './GridTileDetail.css';

const API_URL = `https://data.keadatabase.nz/geojson/grid_tiles/`;

/**
  Presents a nicely formatted card for a given tile.

  Accepts:
  * `id` (will fetch details from tiles.json)
  * `id` and `api` (will fetch details from API)
  * `tile` (will display provided tile)
 */
export const GridTileDetailCard = ({ tile, hideDetails, children }) => {
  /* GeoJSON has tile data in properties, regular API endpoint does not */
  const tileData = tile.properties || tile;

  return (
    <div className={['GridTileDetailCard', 'card', 'my-3', hideDetails && 'hideDetails'].join(' ')}>
      <img src={tileData.get_large_image} alt="Map tile" className="card-img-top img-full" />
      <div className="card-body">
        <h2 className="card-title">{tile.id}</h2>
        {children && children}
        {!hideDetails && (
          <div className="card-text">
            <div className="row">
              <div className="col-6">
                <dl>
                  <dt>
                    SW <small>NZTM</small>
                  </dt>
                  <dd>
                    {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
                  </dd>
                </dl>
              </div>
              <div className="col-6">
                <dl>
                  <dt>
                    NE <small>NZTM</small>
                  </dt>
                  <dd>
                    {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
                  </dd>
                </dl>
              </div>
            </div>
            <p className="m-0">
              <small>Source: LINZ (CC BY 4.0)</small>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
  Displays a grid tile (if one given), or downloads information from API (if ID provided).
 */
class GridTileDetail extends Component {
  componentDidMount() {
    if (this.props.api && this.props.id) this.props.lazyFetchGridTile(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && this.props.id)
      if (this.props.id !== prevProps.id) this.props.lazyFetchGridTile(this.props.id);
  }

  render() {
    const { hideDetails, api, children } = this.props;

    if (this.props.gridTileFetch) {
      const { gridTileFetch } = this.props;

      if (gridTileFetch.pending) {
        return <Loader />;
      } else if (gridTileFetch.rejected) {
        return <Error message="Tile ID invalid" />;
      } else if (gridTileFetch.fulfilled) {
        return (
          <GridTileDetailCard
            tile={gridTileFetch.value}
            hideDetails={hideDetails}
            children={children}
          />
        );
      }
    } else if (this.props.tile) {
      return (
        <GridTileDetailCard tile={this.props.tile} hideDetails={hideDetails} children={children} />
      );
    } else if (this.props.id && !api) {
      return (
        <GridTileDetailCard
          tile={tiles.features.find(tile => tile.id === this.props.id)}
          hideDetails={hideDetails}
          children={children}
        />
      );
    } else return null;
  }
}

GridTileDetail.propTypes = {
  id: PropTypes.string,
  tile: PropTypes.object,
  api: PropTypes.bool.isRequired,
  hideDetails: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

GridTileDetail.defaultProps = {
  api: false,
  hideDetails: false,
};

export default connect(props => ({
  lazyFetchGridTile: id => ({
    gridTileFetch: `${API_URL}${props.id}/`,
  }),
}))(GridTileDetail);
