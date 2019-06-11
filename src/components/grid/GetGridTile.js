import React, { Component } from 'react';
import PropTypes from 'prop-types';

import tile_placeholder from './tile_placeholder.png';

class GetGridTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tile: tile_placeholder,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    var url = `https://geo.keadatabase.nz/tiles/${this.state.value}.png`;

    this.setState({
      tile: url,
    });
    event.preventDefault();
  }

  defaultToPlaceholder(event) {
    event.target.src = tile_placeholder;
  }

  render() {
    return (
      <div className="GetGridTile">
        <div className="row">
          <div className="col-lg-7 order-lg-2 mb-3">
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
                  placeholder="Grid ID"
                />
                <div className="input-group-append">
                  <input type="submit" value="Get Tile" className="btn btn-primary" />
                </div>
              </div>
            </form>
            <dl>
              <dt className="d-none d-print-block">Grid ID</dt>
              <dd className="d-none d-print-block">{this.state.value}</dd>
              <dt>Source</dt>
              <dd>Land Information New Zealand, licensed for reuse under the CC BY 4.0.</dd>
            </dl>
          </div>
          <div className="col-lg-5 order-lg-1">
            <img
              onError={this.defaultToPlaceholder}
              src={this.state.tile}
              alt="Map tile"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    );
  }
}

GetGridTile.propTypes = {
  value: PropTypes.string,
  tile: PropTypes.string,
};

export default GetGridTile;
