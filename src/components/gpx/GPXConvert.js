import React, { useState, useEffect } from 'react';
import { gpx } from '@tmcw/togeojson';
import { point, polygon, booleanPointInPolygon, tag, featureCollection } from '@turf/turf';
import moment from 'moment';

import GridTile from '../grid/GridTile';
import Loader from '../helpers/Loader';
import tiles from '../../assets/geo/tiles.json';

/**
  GPX conversion tool.
  */
const GPXConvert = () => {
  const [gpxInput, setGpxInput] = useState('');
  const [geoJSONOutput, setGeoJSONOutput] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [gridTilesByHour, setGridTilesByHour] = useState([]);

  useEffect(() => {
    if (geoJSONOutput.features && geoJSONOutput.features[0] && !isProcessing) {
      setIsProcessing(true);

      const feature = geoJSONOutput.features[0];

      const parsedTrackPoints = featureCollection(
        feature.geometry.coordinates.map((coordinates, index) => {
          const time = moment(feature.properties.coordTimes[index]);
          return point(coordinates, { time: time, hour: parseInt(time.format('HH')) });
        })
      );

      const parsedTilePolygons = featureCollection(
        tiles.features.map(tile => polygon(tile.geometry.coordinates, { id: tile.id }))
      );

      const trackPointsWithGridTileIds = tag(
        parsedTrackPoints,
        parsedTilePolygons,
        'id',
        'gridTileId'
      );

      const hours = trackPointsWithGridTileIds.features.reduce((acc, obj) => {
        if (!acc.includes(obj.properties.hour)) {
          acc.push(obj.properties.hour);
        }
        return acc;
      }, []);

      setGridTilesByHour(
        hours.map(hour => {
          return Object.assign({
            hour: hour,
            gridTileIds: [
              ...new Set(
                trackPointsWithGridTileIds.features
                  .filter(
                    trackPointWithGridTileId => trackPointWithGridTileId.properties.hour === hour
                  )
                  .map(trackPointWithGridTileId => trackPointWithGridTileId.properties.gridTileId)
              ),
            ],
          });
        })
      );

      setIsProcessing(false);
    }
  }, [geoJSONOutput, isProcessing]);

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
        </>
      )}
    </div>
  );
};

export default GPXConvert;
