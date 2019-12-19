import * as yup from 'yup';
import { maximumGridTiles } from './surveyParameters';

const requiredMessage = 'This field is required.';
const notNumber = 'This field must be a number.';
const emailInvalid = 'Invalid email address.';
const dateInvalid = 'Date format invalid. Must be YYYY-MM-DD.';
const maxDateInvalid = 'Date must be today or earlier.';
const hourRequired = 'At least one survey hour is required.';
const gridTileMinMessage = 'Please select at least one grid tile.';
const gridTileMaxMessage = 'Too many grid tiles have been selected.';

/**
  Specifies validation of nested object gridTiles in URL parameters.
 */
export const gridTileValidationSchema = yup
  .array()
  .of(yup.string().max(7))
  .min(1, gridTileMinMessage)
  .max(maximumGridTiles, gridTileMaxMessage)
  .required();

/**
  Specifies validation of observer.
  */
export const observerValidationSchema = yup
  .object({
    name: yup.string().required(requiredMessage),
    email: yup
      .string()
      .email(emailInvalid)
      .required(requiredMessage),
    purpose: yup.string(),
  })
  .required()
  .strict()
  .noUnknown();

/**
  Specifies validation of SubmissionForm URL parameters. Any unknown parameters will raise an error.
 */
export const initialValidationSchema = yup
  .object({
    observer: observerValidationSchema.required(),
    gridTiles: gridTileValidationSchema.required(),
  })
  .required()
  .strict()
  .noUnknown();

/**
  Specifies full validation schema for form. Values are verified by API, yup is used to provide immediate (async) feedback to users.
 */
export const fullValidationSchema = yup
  .object({
    observer: observerValidationSchema.required(requiredMessage),
    date: yup
      .date()
      .max(new Date(), maxDateInvalid)
      .required(requiredMessage)
      .typeError(dateInvalid),
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
  })
  .noUnknown();
