import * as Yup from "yup";

import { PASSWORD_REGEX } from "../constants/regexConstants";

import {
  NEW_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  VALID_PASSWORD,
  VALID_CONFIRM_PASSWORD,
  REQUIRED,
  MOBILE_NUMBER_REQUIRED,
} from "../constants/validationMessages";

export const resetPasswordValidator = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .matches(PASSWORD_REGEX, VALID_PASSWORD)
    .required(NEW_PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword"), null], VALID_CONFIRM_PASSWORD)
    .required(CONFIRM_PASSWORD_REQUIRED),
});

export const forgotPasswordValidator = Yup.object().shape({
  countryCode: Yup.string().required(MOBILE_NUMBER_REQUIRED),
  mobile: Yup.string().required(MOBILE_NUMBER_REQUIRED),
});

export const securityChangePasswordValidator = Yup.object().shape({
  currentPassword: Yup.string().required(REQUIRED),
  newPassword: Yup.string()
    .trim()
    .matches(PASSWORD_REGEX, VALID_PASSWORD)
    .required(NEW_PASSWORD_REQUIRED),
  repeatNewPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword"), null], VALID_CONFIRM_PASSWORD)
    .required(CONFIRM_PASSWORD_REQUIRED),
});
