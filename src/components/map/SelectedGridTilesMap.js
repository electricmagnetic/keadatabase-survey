import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { latLngBounds, GeoJSON as LeafletGeoJSON } from 'leaflet';
import { FeatureGroup, ScaleControl, Polygon, Tooltip } from 'react-leaflet';

import BaseMap from './BaseMap';
import { DEFAULT_ZOOM, DEFAULT_BOUNDS, SURVEY_ZOOM } from '../map/defaults';

import './SelectedGridTilesMap.css';
import tiles from '../../assets/geo/tiles.json';

/**
  Non-interactive map component for displaying a given set of grid tiles.
 */
class SelectedGridTilesMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridBounds: latLngBounds,
      viewport: {
        center: DEFAULT_BOUNDS.getCenter(),
        zoom: DEFAULT_ZOOM,
      },
    };

    this.updateGridBounds = this.updateGridBounds.bind(this);
    this.onViewportChanged = this.onViewportChanged.bind(this);
  }

  /**
    On viewport changed
  */
  onViewportChanged(viewport) {
    this.setState({ viewport: viewport });
  }

  /**
    Update the gridBounds in state
  */
  updateGridBounds(event) {
    this.setState({ gridBounds: event.target.getBounds() });
  }

  /**
    Changes viewport on selection of object if viewport is at defaults.
  */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.gridBounds !== prevState.gridBounds) {
      const isValid = this.state.gridBounds.isValid();
      const zoom =
        this.state.viewport.zoom === DEFAULT_ZOOM ? SURVEY_ZOOM : this.state.viewport.zoom;
      const center = isValid ? this.state.gridBounds.getCenter() : this.state.viewport.center;

      this.setState({ viewport: { center: center, zoom: zoom } });
    }
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
    >
      <Tooltip permanent direction="center">
        {gridTileId}
      </Tooltip>
    </Polygon>
  );

  render() {
    const { gridTileIds } = this.props;

    return (
      <div className="SelectedGridTilesMap">
        <BaseMap viewport={this.state.viewport} onViewportChanged={this.onViewportChanged}>
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
