import React, { Component } from 'react';
import {
  GeoJSON,
  LayersControl,
  ScaleControl,
  Polygon,
  Tooltip,
  FeatureGroup,
} from 'react-leaflet';
import { latLngBounds, GeoJSON as LeafletGeoJSON } from 'leaflet';

import BaseMap from '../map/BaseMap';

import './GridTileSelectMap.css';

import tiles from '../../assets/geo/tiles.json';

/**
  Map component for grid tile selection. Using base map with some added logic.
 */
class GridTileSelectMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: latLngBounds,
    };

    this.baseGridTileOnEachFeature = this.baseGridTileOnEachFeature.bind(this);
    this.gridTileSelected = this.gridTileSelected.bind(this);
  }

  /**
    Add a grid tile to gridTiles if a feature is selected from the base GeoJSON layer (target.feature).
    Remove a grid tile from gridTiles if a selectedGridTile polygon is selected (target.options).
  */
  gridTileSelected(event) {
    const { target } = event;

    const currentGridTiles = this.props.values.gridTiles;
    const selectedGridTile =
      (target.feature && target.feature.id) || (target.options && target.options.id);

    if (currentGridTiles.includes(selectedGridTile))
      this.props.setFieldValue(
        'gridTiles',
        currentGridTiles.filter(gridTile => gridTile !== selectedGridTile)
      );
    else this.props.setFieldValue('gridTiles', currentGridTiles.concat([selectedGridTile]));
  }

  /**
    Add a click handler for each feature on the base GeoJSON layer.
  */
  baseGridTileOnEachFeature = (feature, layer) => layer.on('click', this.gridTileSelected);

  /**
    Create a Polygon for each selected gridTile. Retrieve coordinates from raw GeoJSON, then convert (due to differing conventions).
  */
  createSelectedGridTile = selectedTile => (
    <Polygon
      positions={tiles.features
        .find(tile => tile.id === selectedTile)
        .geometry.coordinates.map(coordinate => LeafletGeoJSON.coordsToLatLngs(coordinate))}
      key={selectedTile}
      color="red"
      onClick={this.gridTileSelected}
      id={selectedTile}
    >
      <Tooltip permanent direction="center">
        {selectedTile}
      </Tooltip>
    </Polygon>
  );

  /**
    Render map with base GeoJSON and selected tiles as a FeatureGroup.
  */
  render() {
    return (
      <div className="GridTileMap">
        <BaseMap>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="<strong>Grid Tiles</strong>" checked>
              <GeoJSON
                data={tiles}
                onEachFeature={this.baseGridTileOnEachFeature}
                style={{
                  color: '#222222',
                  weight: 2,
                  opacity: 0.6,
                  fillOpacity: 0,
                }}
              />
            </LayersControl.Overlay>
          </LayersControl>
          {this.props.values.gridTiles && (
            <FeatureGroup>
              {this.props.values.gridTiles.map(selectedTile =>
                this.createSelectedGridTile(selectedTile)
              )}
            </FeatureGroup>
          )}
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

export default GridTileSelectMap;