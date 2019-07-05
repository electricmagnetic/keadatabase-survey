import React from 'react';

import { getIn } from 'formik';
import { Typeahead, MenuItem, Menu } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import './GridTileSelectTypeahead.css';
import tiles from '../../assets/geo/tiles.json';

/**
  Field component for grid tile selection. Using react-bootstrap-typeahead.
 */
const GridTileSelectTypeahead = ({ field, form, values }) => {
  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const isInvalid = touched && error ? true : false;

  return (
    <div className="form-group">
      <label htmlFor="gridTiles" className="sr-only">
        Grid Tiles
      </label>
      <Typeahead
        {...field}
        options={tiles.features.map(feature => feature.id)}
        minLength={4}
        multiple
        selectHintOnEnter
        highlightOnlyResult
        placeholder="Grid ID (XXXX-XX)"
        id={field.name}
        ignoreDiacritics={false}
        maxResults={4}
        isInvalid={isInvalid}
        onChange={selected => form.setFieldValue(field.name, selected)}
        onBlur={event => form.setFieldTouched(field.name, true)}
        selected={values.gridTiles}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps}>
            {results.map((result, index) => (
              <MenuItem option={result} position={index} key={result}>
                <div className="MenuItemTileImage mr-3">
                  <img
                    src={tiles.features.find(tile => tile.id === result).properties.get_small_image}
                    alt={`Tile of ${result}`}
                  />
                </div>
                {result}
              </MenuItem>
            ))}
          </Menu>
        )}
      />
      {/* `d-inline` is used to force visibility due to incompatibility of Typeahead with BS4 */}
      {isInvalid && <span className="invalid-feedback d-inline">{error}</span>}
    </div>
  );
};

export default GridTileSelectTypeahead;
