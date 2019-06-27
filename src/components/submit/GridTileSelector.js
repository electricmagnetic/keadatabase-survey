import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Typeahead } from 'react-bootstrap-typeahead';

import { maximumGridTiles } from './schema/surveyParameters';
import GridTileDetail from '../grid/GridTileDetail';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import tiles from '../../assets/geo/tiles.json';

/**
  Enables user to select a set of gridTiles as specified in `tiles.json`.
  Submission results in an appropriately formatted query string pushed to same URL.
 */
class GridTileSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTiles: [],
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (this.state.gridTiles.length > maximumGridTiles) {
      this.setState({
        error: `You have selected too many grid tiles. The limit is ${maximumGridTiles}.`,
      });
    } else if (this.state.gridTiles.length === 0) {
      this.setState({ error: 'You must select at least one grid tile.' });
    } else {
      // As typeahead passes through the whole gridTile object, just get id
      const gridTilesById = this.state.gridTiles.map(gridTile => gridTile.id);

      // Format into a valid query string
      const qs = `?${queryString.stringify(
        { gridTiles: gridTilesById },
        { arrayFormat: 'bracket' }
      )}`;

      this.props.history.push(`${qs}`);
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="GridTileSelector">
        <form onSubmit={this.handleSubmit} className="form mb-3">
          <div className="form-group">
            <label htmlFor="id" className="sr-only">
              Grid ID:
            </label>
            <Typeahead
              options={tiles.features}
              labelKey={option => `${option.id}`}
              minLength={4}
              multiple
              selectHintOnEnter
              highlightOnlyResult
              name="gridTiles"
              placeholder="Grid ID (XXXX-XX)"
              id="gridTiles"
              ignoreDiacritics={false}
              maxResults={4}
              onChange={selected => this.setState({ gridTiles: selected })}
              autoFocus
            />
          </div>
          <input type="submit" value="I have selected all grid tiles" className="btn btn-primary" />
          {this.state.error && <div className="alert alert-primary mt-3">{this.state.error}</div>}
          {this.state.gridTiles.map(gridTile => (
            <GridTileDetail tile={gridTile} key={gridTile.id} />
          ))}
        </form>
      </div>
    );
  }
}

export default withRouter(GridTileSelector);
