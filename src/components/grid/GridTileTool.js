import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GridTileDetail from './GridTileDetail';

class GridTileTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      id: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    // Disallow fetching without a value (so it doesn't try fetch all grid tiles)
    if (this.state.value) this.setState({ id: this.state.value });

    event.preventDefault();
  }

  render() {
    return (
      <div className="GridTileTool">
        <form onSubmit={this.handleSubmit} className="form-inline d-print-none mb-3">
          <div className="input-group">
            <label htmlFor="id" className="sr-only">
              Grid ID:
            </label>
            <input
              className="form-control"
              id="id"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              maxLength="7"
              placeholder="Grid ID (XXXX-XX)"
            />
            <div className="input-group-append">
              <input type="submit" value="Get Tile" className="btn btn-primary" />
            </div>
          </div>
        </form>
        <div className="result">{this.state.id && <GridTileDetail id={this.state.id} />}</div>
      </div>
    );
  }
}

GridTileTool.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
};

export default GridTileTool;
