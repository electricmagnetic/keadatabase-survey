import React, { Component } from 'react';
import { GeoJSON, ScaleControl } from 'react-leaflet';
import PropTypes from 'prop-types';

import BaseMap from '../../map/BaseMap';

import tiles from '../../../assets/geo/tiles.json';
import '../../map/GridTileMap.scss';

/**
  Generate colouring based on hours with/without kea.
 */
const analysisTileStyle = feature => {
  const hasKea = feature.hours_total.with_kea > 0;
  const manyHours = feature.hours_total.total > 10;

  const colour = hasKea ? '#df5206' : '#111111';

  const fillOpacity = hasKea
    ? 0.3 + (feature.hours_total.with_kea / feature.hours_total.total) * 0.4
    : manyHours
    ? 0.7
    : 0.3;

  return {
    color: colour,
    weight: 1,
    opacity: 0.6,
    fillOpacity: fillOpacity,
  };
};

/**
  Map component for analysis of tiles.
 */
class GridTileAnalysisMap extends Component {
  gridTileOnEachFeature(feature, layer) {
    layer.bindPopup(
      `
      <h2>${feature.id}</h2>
      <dl class="form-row mb-2">
        <dt class="col-8">Total</dt>
        <dd class="col-4">${feature.hours_total.total}</dd>
        <dt class="col-8">w/ kea</dt>
        <dd class="col-4">${feature.hours_total.with_kea}</dd>
      </dl>
      <a href="/grid/${feature.id}">View</a>
    `,
      { direction: 'center', className: 'tile-popup', closeButton: false }
    );
  }

  render() {
    const { gridTileAnalyses } = this.props;

    // Join the surveyedTiles with the stored tiles to obtain geospatial information
    const surveyedTiles = Object.assign({}, tiles, {
      features: gridTileAnalyses.map(gridTileAnalysis =>
        Object.assign(
          {},
          gridTileAnalysis,
          tiles.features.find(({ id }) => id === gridTileAnalysis.id)
        )
      ),
    });

    return (
      <div className="GridTileMap">
        <BaseMap>
          <GeoJSON
            data={surveyedTiles}
            onEachFeature={this.gridTileOnEachFeature}
            style={analysisTileStyle}
          />
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

GridTileAnalysisMap.propTypes = {
  gridTileAnalyses: PropTypes.array.isRequired,
};

export default GridTileAnalysisMap;
