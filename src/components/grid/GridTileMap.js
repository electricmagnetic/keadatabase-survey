import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';

import Loader from '../helpers/Loader';
import Map from '../map/Map';

import './GridTileMap.css';

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
    const { gridTilesFetch } = this.props;

    if (gridTilesFetch.pending) {
      return <Loader />;
    } else if (gridTilesFetch.rejected) {
      return <span>Error</span>;
    } else if (gridTilesFetch.fulfilled) {
      const data = gridTilesFetch.value;
      return (
        <div className="GridTileMap">
          <Map>
            <LayersControl position="topright" collapsed={false}>
              <LayersControl.Overlay name="<strong>Grid Tiles</strong>" checked>
                <GeoJSON
                  data={data}
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
}

// https://geo.keadatabase.nz/grid/4326.geojson

export default connect(props => ({
  gridTilesFetch: `https://data.keadatabase.nz/geojson/grid_tiles/?page_size=6944`,
}))(GridTileMap);
