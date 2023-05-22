import * as Yup from "yup";

import { PASSWORD_REGEX } from "../constants/regexConstants";
import {
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  VALID_EMAIL,
  VALID_PASSWORD,
} from "../constants/validationMessages";

export const loginValidator = Yup.object().shape({
  email: Yup.string().email(VALID_EMAIL).required(EMAIL_REQUIRED),
  password: Yup.string()
    .trim()
    .matches(PASSWORD_REGEX, VALID_PASSWORD)
    .required(PASSWORD_REQUIRED),
});
