import { maximumGridTiles } from './surveyParameters';
import * as yup from 'yup';

/**
  Specifies validation of nested object gridTiles in URL parameters.
 */
const gridTileValidationSchema = yup
  .array()
  .of(yup.string().max(7))
  .max(maximumGridTiles)
  .required();
/**
  Specifies validation of SubmissionForm URL parameters. Any unknown parameters will raise an error.
 */
const queryStringValidationSchema = yup
  .object({
    observer: yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      purpose: yup.string(),
    }),
    date: yup.date(),
    gridTiles: gridTileValidationSchema,
  })
  .noUnknown()
  .required();

export default queryStringValidationSchema;
