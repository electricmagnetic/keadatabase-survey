import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './GetGridTile.css';

const GridTileDetailView = ({ value }) => {
  return (
    <div className="row">
      <div className="col-lg-8 order-lg-2 mb-3">
        <dl>
          <dt>Grid ID</dt>
          <dd>{value.id}</dd>
          <dt>Lower Left (NZTM)</dt>
          <dd>
            {value.min.coordinates[0]}, {value.min.coordinates[1]}
          </dd>
          <dt>Upper Right (NZTM)</dt>
          <dd>
            {value.max.coordinates[0]}, {value.max.coordinates[1]}
          </dd>
          <dt>Source</dt>
          <dd>Land Information New Zealand, licensed for reuse under the CC BY 4.0.</dd>
        </dl>
      </div>
      <div className="col-lg-4 order-lg-1">
        <img src={value.get_image} alt="Map tile" className="img-fluid img-full" />
      </div>
    </div>
  );
};

class GridTileDetail extends Component {
  render() {
    const { gridTileFetch } = this.props;

    if (gridTileFetch.pending) {
      return <Loader />;
    } else if (gridTileFetch.rejected) {
      return <Error message="Tile ID invalid" />;
    } else if (gridTileFetch.fulfilled) {
      return <GridTileDetailView value={gridTileFetch.value} />;
    }
  }
}

GridTileDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(props => ({
  gridTileFetch: `https://data.keadatabase.nz/surveys/grid_tiles/${props.id}/`,
}))(GridTileDetail);
