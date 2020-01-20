import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON as LeafletGeoJSON } from 'leaflet';
import { FeatureGroup, ScaleControl, Polygon, Tooltip } from 'react-leaflet';

import BaseMap from './BaseMap';
import { DEFAULT_BOUNDS } from '../map/defaults';

import './SelectedGridTilesMap.css';
import tiles from '../../assets/geo/tiles.json';

/**
  Non-interactive map component for displaying a given set of grid tiles.
  Sets bounds of BaseMap component to whatever given by FeatureGroup (via updateGridBounds)
 */
class SelectedGridTilesMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridBounds: DEFAULT_BOUNDS,
    };

    this.updateGridBounds = this.updateGridBounds.bind(this);
  }

  /**
    Update the gridBounds in state
  */
  updateGridBounds(event) {
    this.setState({ gridBounds: event.target.getBounds() });
  }

  /**
    Create a Polygon for each selected gridTileId. Retrieve coordinates from raw GeoJSON, then convert (due to differing conventions).
  */
  createSelectedGridTile = gridTileId => (
    <Polygon
      positions={tiles.features
        .find(tile => tile.id === gridTileId)
        .geometry.coordinates.map(coordinate => LeafletGeoJSON.coordsToLatLngs(coordinate))}
      key={gridTileId}
      color="black"
      id={gridTileId}
      interactive={false}
    >
      <Tooltip permanent direction="center">
        {gridTileId}
      </Tooltip>
    </Polygon>
  );

  render() {
    const { gridTileIds } = this.props;

    const disableInteractivity = {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      tap: false,
    };
    const boundsOptions = {
      maxZoom: 12,
    };

    return (
      <div className="SelectedGridTilesMap">
        <BaseMap
          boundsOptions={boundsOptions}
          bounds={this.state.gridBounds}
          {...disableInteractivity}
        >
          <FeatureGroup onAdd={event => this.updateGridBounds(event)}>
            {gridTileIds.map(gridTileId => this.createSelectedGridTile(gridTileId))}
          </FeatureGroup>
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

SelectedGridTilesMap.propTypes = {
  gridTileIds: PropTypes.array.isRequired,
};

export default SelectedGridTilesMap;
