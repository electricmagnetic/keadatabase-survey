import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GridTileTypeahead from './GridTileTypeahead';
import GridTileSelectMap from '../map/GridTileSelectMap';
import GridTile from './GridTile';
import Error from '../helpers/Error';

/**
  Provides a typeahead interface, returning a single GridTile.
*/
class GridTileTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTiles: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setGridTiles = this.setGridTiles.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setGridTiles(name, value) {
    // Name does not have an effect, just retained for compatibility with GridTileSelectMap.
    this.setState({ gridTiles: value });
  }

  render() {
    const hasTile = this.state.gridTiles.length > 0 ? true : false;

    return (
      <div className="GridTileTool">
        <div className="container">
          <section className="d-print-none">
            <h2>Browse Grid Tiles</h2>
            <p>
              Grid tiles are 5km by 5km and are at regular intervals on the standard Topo50 map
              grid.
            </p>
          </section>
          {this.state.gridTiles && (
            <h2 className="d-none d-print-block my-5">
              Grid Tiles: {this.state.gridTiles.join(' ')}
            </h2>
          )}
          <div className="row">
            <div className="col-md-3">
              <form onSubmit={this.handleSubmit} className="form d-print-none mb-3">
                <div className="form-group">
                  <label htmlFor="gridTile" className="sr-only">
                    Grid ID
                  </label>
                  <GridTileTypeahead
                    onChange={selected => this.setGridTiles('gridTiles', selected)}
                    autoFocus
                    selected={this.state.gridTiles}
                    multiple
                  />
                </div>
              </form>
              <div className="result">
                {hasTile ? (
                  this.state.gridTiles.map(gridTileId => (
                    <GridTile id={gridTileId} key={gridTileId} type="card" hideImage addLink />
                  ))
                ) : (
                  <Error message="No grid tiles selected" info />
                )}
              </div>
            </div>
            <div className="col-md-9">
              <GridTileSelectMap
                {...this.props}
                values={{ gridTiles: this.state.gridTiles }}
                setFieldValue={this.setGridTiles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GridTileTool.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
};

export default GridTileTool;
