import moment from 'moment';
/**
  Specifies initial values for Observer object.
  See also: observerValidationSchema.
 */
export const initialObserverValues = {
  name: '',
  email: '',
  purpose: '',
};

/**
  Specifics initial values for initial form.
  See also: initialValidationSchema, gridTileValidationSchema.
  */
export const initialInitialValues = {
  observer: initialObserverValues,
  gridTiles: [],
};

/**
  Specifies initial hour values (nested object).
 */
export const initialHourValues = {
  hour: '',
  activity: '',
  kea: false,
  grid_tile: '',
};

/**
  Specifies initial values and shape for submission to API. Includes API challenge.
  See also: fullValidationSchema.
 */
export const initialFullValues = {
  observer: initialObserverValues,
  date: moment().format('YYYY-MM-DD'),
  hours: [],
  max_flock_size: '',
  comments: '',
  challenge: 'kea',
};
