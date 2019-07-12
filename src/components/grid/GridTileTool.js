import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GridTileTypeahead from './GridTileTypeahead';
import GridTileMap from '../map/GridTileMap';
import GridTile from './GridTile';
import Error from '../helpers/Error';

/**
  Provides a typeahead interface, returning a single GridTile.
*/
class GridTileTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTile: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const hasTile = this.state.gridTile.length > 0 ? true : false;

    return (
      <div className="GridTileTool">
        <div className="container">
          <h2>Quick Search</h2>
          <div className="row">
            <div className="col-md-3">
              <form onSubmit={this.handleSubmit} className="form d-print-none mb-3">
                <div className="form-group">
                  <label htmlFor="gridTile" className="sr-only">
                    Grid ID
                  </label>
                  <GridTileTypeahead
                    onChange={selected => this.setState({ gridTile: selected })}
                    autoFocus
                  />
                </div>
              </form>
              <div className="result">
                {hasTile ? (
                  this.state.gridTile.map(gridTile => (
                    <GridTile id={gridTile} key={gridTile} type="card" />
                  ))
                ) : (
                  <Error message="No grid tile selected" info />
                )}
              </div>
            </div>
            <div className="col-md-9">
              <GridTileMap />
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
