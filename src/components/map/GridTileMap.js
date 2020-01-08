import React, { Component } from 'react';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';

import BaseMap from './BaseMap';
import { gridTileStyle } from './style';

import './GridTileMap.css';
import tiles from '../../assets/geo/tiles.json';

/**
  Map component for grid tile display. Using base map with added GeoJSON and popups.
 */
class GridTileMap extends Component {
  gridTileOnEachFeature(feature, layer) {
    layer.bindPopup(
      `
      <h2>${feature.id}</h2>
      <dl>
        <dt class="sr-only">Min</dt>
        <dd>${feature.properties.min.coordinates[0]}, ${feature.properties.min.coordinates[1]}</dd>
        <dt class="sr-only">Max</dt>
        <dd>${feature.properties.max.coordinates[0]}, ${feature.properties.max.coordinates[1]}</dd>
      </dl>
      <a href="/grid/${feature.id}">View details</a>
    `,
      { direction: 'center', className: 'tile-tooltip' }
    );
  }

  render() {
    return (
      <div className="GridTileMap">
        <BaseMap>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="<strong>Grid Tiles</strong>" checked>
              <GeoJSON
                data={tiles}
                onEachFeature={this.gridTileOnEachFeature}
                style={gridTileStyle}
              />
            </LayersControl.Overlay>
          </LayersControl>
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

export default GridTileMap;
