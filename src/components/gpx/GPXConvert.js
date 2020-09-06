import React, { useState, useEffect } from 'react';
import { gpx } from '@tmcw/togeojson';
import { point, polygon, booleanPointInPolygon } from '@turf/turf';
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
    if (geoJSONOutput.features && !isProcessing) {
      setIsProcessing(true);

      const feature = geoJSONOutput.features[0];

      const parsedCoordinates = feature.geometry.coordinates.map((coordinates, index) => {
        const time = moment(feature.properties.coordTimes[index]);
        const gridTile = tiles.features.reduce(
          (accumulator, tile) =>
            booleanPointInPolygon(point(coordinates), polygon(tile.geometry.coordinates))
              ? tile
              : accumulator,
          null
        );

        return Object.assign(
          {},
          { coordinates: coordinates },
          { time: time },
          { hour: parseInt(time.format('HH')) },
          { gridTile: gridTile }
        );
      });

      const hours = parsedCoordinates.reduce((acc, obj) => {
        if (!acc.includes(obj.hour)) {
          acc.push(obj.hour);
        }
        return acc;
      }, []);

      setGridTilesByHour(
        hours.map(hour => {
          return Object.assign({
            hour: hour,
            gridTiles: [
              ...new Set(
                parsedCoordinates
                  .filter(coordinates => coordinates.hour === hour)
                  .map(coordinates => coordinates.gridTile)
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
                <h3 class="card-title">{`${gridTileByHour.hour}:00`}</h3>

                <div className="form-row my-n3">
                  {gridTileByHour.gridTiles.map(gridTile => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                      <GridTile
                        key={gridTile.id}
                        gridTile={gridTile}
                        type="card"
                        hideDetails
                        addLink
                      />
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
