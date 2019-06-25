import moment from 'moment';

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

export const initialHourValues = {
  hour: '',
  activity: '',
  kea: false,
  grid_tile: '',
};
