import React, { useState, useEffect } from 'react';
import { gpx } from '@tmcw/togeojson';
import { point, polygon, tag, featureCollection } from '@turf/turf';
import { GeoJSON } from 'react-leaflet';
import moment from 'moment';

import GridTile from '../grid/GridTile';
import BaseMap from '../map/BaseMap';
import tiles from '../../assets/geo/tiles.json';

import './GPXConvert.scss';

/**
  GPX conversion tool.
  */
const GPXConvert = () => {
  // TODO: auto-zoom map to correct location
  // TODO: verify effects to ensure no race conditions
  // TODO: enable processing of multilinestring GPXs
  // TODO: feature: check start time and end time, discard if not 55 mins of whole hour
  // TODO: feature: approximate duration spent in each grid tile (step through points?)
  // TODO: tests: (1) invalid GPX (2) multi-part GPX (3) GPX greater than a day (4) less than an hour (5) less than a whole hour (e.g. 15:30 to 16:30)

  const [gpxInput, setGpxInput] = useState('');
  const [geoJSONOutput, setGeoJSONOutput] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [hours, setHours] = useState([]);
  const [gridTileIds, setGridTileIds] = useState([]);
  const [trackPoints, setTrackPoints] = useState({});
  const [gridTilesByHour, setGridTilesByHour] = useState([]);

  useEffect(() => {
    if (geoJSONOutput.features && geoJSONOutput.features[0] && !isProcessing) {
      setIsProcessing(true);

      const feature = geoJSONOutput.features[0];

      const initialTrackPoints = featureCollection(
        feature.geometry.coordinates.map((coordinates, index) => {
          const time = moment(feature.properties.coordTimes[index]);
          return point(coordinates, { time: time, hour: parseInt(time.format('HH')) });
        })
      );

      const initialTilePolygons = featureCollection(
        tiles.features.map(tile => polygon(tile.geometry.coordinates, { id: tile.id }))
      );

      setTrackPoints(tag(initialTrackPoints, initialTilePolygons, 'id', 'gridTileId'));
      setIsProcessing(false);
    }
  }, [geoJSONOutput, isProcessing]);

  useEffect(() => {
    if (trackPoints && trackPoints.features) {
      setHours([...new Set(trackPoints.features.map(feature => feature.properties.hour))]);
      setGridTileIds([
        ...new Set(trackPoints.features.map(feature => feature.properties.gridTileId)),
      ]);
    }
  }, [trackPoints]);

  useEffect(() => {
    if (trackPoints && trackPoints.features) {
      setGridTilesByHour(
        hours.map(hour => {
          return Object.assign({
            hour: hour,
            gridTileIds: [
              ...new Set(
                trackPoints.features
                  .filter(feature => feature.properties.hour === hour)
                  .map(feature => feature.properties.gridTileId)
              ),
            ],
          });
        })
      );
    }
  }, [hours, trackPoints]);

  const handleSubmit = event => {
    event.preventDefault();
    setGeoJSONOutput(gpx(new DOMParser().parseFromString(gpxInput, 'text/xml')));
  };

  return (
    <div className="GPXConvert">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <label htmlFor="gpxInput">GPX</label>
          <textarea
            className="form-control"
            id="gpxInput"
            name="gpxInput"
            value={gpxInput}
            onChange={event => setGpxInput(event.target.value)}
          />
          <small id="gpxInputHelpBlock" className="form-text text-muted">
            Please paste the contents of a valid GPX file.
          </small>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
      {gridTilesByHour && gridTilesByHour.length > 0 && (
        <>
          <h2>Results</h2>
          {gridTilesByHour.map(gridTileByHour => (
            <div key={gridTileByHour.hour} className="card mb-2">
              <div className="card-body">
                <h3 className="card-title">{`${gridTileByHour.hour}:00`}</h3>

                <div className="form-row my-n3">
                  {gridTileByHour.gridTileIds.map(gridTileId => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={gridTileId}>
                      <GridTile key={gridTileId} id={gridTileId} type="card" hideDetails addLink />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="TrackMap">
            <BaseMap>
              <GeoJSON data={geoJSONOutput} />
              <GeoJSON data={tiles.features.filter(feature => gridTileIds.includes(feature.id))} />
            </BaseMap>
          </div>
        </>
      )}
    </div>
  );
};

export default GPXConvert;
