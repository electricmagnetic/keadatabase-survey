import moment from 'moment';

/**
  Specifies initial values and shape for submission to API. Includes API challenge.
 */
export const initialValues = {
  observer: {
    name: '',
    email: '',
    purpose: '',
  },
  date: moment().format('YYYY-MM-DD'),
  hours: [],
  max_flock_size: '',
  comments: '',
  challenge: 'kea',
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
