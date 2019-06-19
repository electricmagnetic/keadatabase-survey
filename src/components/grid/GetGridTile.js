import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './GetGridTile.css';

const GridTileView = ({ data }) => {
  return (
    <div className="row">
      <div className="col-lg-7 order-lg-2 mb-3">
        <dl>
          <dt>Grid ID</dt>
          <dd>{data.id}</dd>
          <dt>Lower Left (NZTM)</dt>
          <dd>
            {data.min.coordinates[0]}, {data.min.coordinates[1]}
          </dd>
          <dt>Upper Right (NZTM)</dt>
          <dd>
            {data.max.coordinates[0]}, {data.max.coordinates[1]}
          </dd>
          <dt>Source</dt>
          <dd>Land Information New Zealand, licensed for reuse under the CC BY 4.0.</dd>
        </dl>
      </div>
      <div className="col-lg-5 order-lg-1">
        <img src={data.get_image} alt="Map tile" className="img-fluid img-full" />
      </div>
    </div>
  );
};

class GetGridTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    // Disallow fetching without a value (so it doesn't try fetch all grid tiles)
    if (this.state.value) this.props.lazyFetchGridTile(this.state.value);

    event.preventDefault();
  }

  render() {
    const gridTileFetch = this.props.gridTileFetch;

    return (
      <div className="GetGridTile">
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
        <div className="result">
          {gridTileFetch.pending ? (
            <Loader />
          ) : gridTileFetch.rejected ? (
            <Error message="Tile ID invalid" />
          ) : (
            gridTileFetch.fulfilled && <GridTileView data={gridTileFetch.value} />
          )}
        </div>
      </div>
    );
  }
}

GetGridTile.propTypes = {
  value: PropTypes.string,
  gridTileFetch: PropTypes.object,
};

GetGridTile.defaultProps = {
  gridTileFetch: {},
};

export default connect(props => ({
  lazyFetchGridTile: id => ({
    gridTileFetch: `https://data.keadatabase.nz/surveys/grid_tiles/${id}/`,
  }),
}))(GetGridTile);
