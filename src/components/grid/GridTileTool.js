import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

import GridTile from './GridTile';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import tiles from '../../assets/geo/tiles.json';

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
    return (
      <div className="GridTileTool">
        <form onSubmit={this.handleSubmit} className="form-inline d-print-none mb-3">
          <div className="form-group">
            <label htmlFor="gridTile" className="sr-only">
              Grid ID
            </label>
            <Typeahead
              options={tiles.features}
              labelKey={option => `${option.id}`}
              minLength={4}
              selectHintOnEnter
              highlightOnlyResult
              name="gridTile"
              placeholder="Grid ID (XXXX-XX)"
              id="gridTile"
              ignoreDiacritics={false}
              maxResults={4}
              onChange={selected => this.setState({ gridTile: selected })}
              autoFocus
            />
          </div>
        </form>
        <div className="result">
          {this.state.gridTile.map(gridTile => (
            <GridTile id={gridTile.id} key={gridTile.id} type="item" />
          ))}
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
