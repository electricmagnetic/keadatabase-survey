import React from 'react';
import { getIn } from 'formik';
import classnames from 'classnames';

export const RenderField = props => {
  // Use label if provided, otherwise default on OPTIONS label
  const { field, form, options, placeholder, type, addBlank, readOnly, hideLabel } = props;
  const label = props.label || options.label;
  const choices = props.choices || options.choices;
  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const status = getIn(form.status, field.name);
  const formLabelClasses = classnames('control-label', {
    'sr-only': hideLabel,
  });
  const formControlClasses = classnames({
    'form-control': !readOnly,
    'form-control-plaintext': readOnly,
    'is-invalid': (touched && error) || status,
  });

  return (
    <div className="form-group">
      <label className={formLabelClasses} htmlFor={field.name}>
        {label}
      </label>

      {type === 'choice' && (
        <select
          {...field}
          className={classnames(formControlClasses, 'custom-select')}
          id={field.name}
        >
          {/* Add blank to compulsory fields (requiring the user to make a selection) */}
          {addBlank && <option default value={''} />}
          {choices.map(option => (
            <option value={option.value} key={option.value}>
              {option.display_name}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          {...field}
          placeholder={placeholder}
          className={formControlClasses}
          id={field.name}
        />
      )}

      {type !== 'choice' && type !== 'textarea' && (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={formControlClasses}
          id={field.name}
          readOnly={readOnly}
        />
      )}

      {touched && error && <span className="invalid-feedback">{error}</span>}
      {status && <span className="invalid-feedback">{status}</span>}
    </div>
  );
};

RenderField.defaultProps = {
  options: {},
};
