import * as yup from 'yup';

const requiredMessage = 'This field is required.';
const notNumber = 'This field must be a number.';
const emailInvalid = 'Invalid email address.';
const hourRequired = 'At least one survey hour is required.';

const validationSchema = yup.object().shape({
  observer: yup.object().shape({
    name: yup.string().required(requiredMessage),
    email: yup
      .string()
      .email(emailInvalid)
      .required(requiredMessage),
    purpose: yup.string(),
  }),
  date: yup.date().required(requiredMessage),
  hours: yup
    .array()
    .of(
      yup.object().shape({
        hour: yup
          .number()
          .min(0)
          .max(23)
          .required(requiredMessage)
          .typeError(notNumber),
        activity: yup.string().required(requiredMessage),
        kea: yup.boolean().when('activity', {
          is: value => value !== 'X',
          then: yup.boolean().required(requiredMessage),
        }),
        grid_tile: yup.string().when('activity', {
          is: value => value !== 'X',
          then: yup.string().required(requiredMessage),
        }),
      })
    )
    .required(hourRequired),
  max_flock_size: yup
    .number()
    .min(0)
    .typeError(notNumber),
  comments: yup.string(),
  challenge: yup.string().required(),
});

export default validationSchema;
