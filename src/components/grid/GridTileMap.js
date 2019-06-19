import React, { Component } from 'react';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';

import Map from '../map/Map';

import './GridTileMap.css';

import gridTiles from '../../assets/geo/tiles.json';

class GridTileMap extends Component {
  gridTileOnEachFeature(feature, layer) {
    layer.bindTooltip(
      `
      <h2>${feature.id}</h2>
      <dl>
        <dt class="sr-only">Min</dt>
        <dd>${feature.properties.min.coordinates[0]}, ${feature.properties.min.coordinates[1]}</dd>
        <dt class="sr-only">Max</dt>
        <dd>${feature.properties.max.coordinates[0]}, ${feature.properties.max.coordinates[1]}</dd>
      </dl>
    `,
      { direction: 'center', className: 'tile-tooltip' }
    );
  }

  render() {
    return (
      <div className="GridTileMap">
        <Map>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="<strong>Grid Tiles</strong>" checked>
              <GeoJSON
                data={gridTiles}
                onEachFeature={this.gridTileOnEachFeature}
                style={{
                  color: '#222222',
                  weight: 2,
                  opacity: 0.6,
                  fillOpacity: 0,
                }}
              />
            </LayersControl.Overlay>
          </LayersControl>
          <ScaleControl />
        </Map>
      </div>
    );
  }
}

export default GridTileMap;
