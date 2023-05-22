import * as Yup from "yup";

import { } from "../constants/regexConstants";
import {
  EMAIL_REQUIRED,
  VALID_EMAIL,
} from "../constants/validationMessages";

export const subscribeValidator = Yup.object().shape({
  email: Yup.string().email(VALID_EMAIL).required(EMAIL_REQUIRED),
//   password: Yup.string()
//     .trim()
//     .matches(PASSWORD_REGEX, VALID_PASSWORD)
//     .required(PASSWORD_REQUIRED),
});
