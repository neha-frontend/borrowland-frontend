export const EMAIL_REGEX =
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const NUMBER_REGEX = /^[0-9]{10}$/;
export const CANNOT_EMPTY_REGEX = /[^\s+$]/;
export const ONLY_CONTAN_ALPHABET_AND_SPACES_REGEX = /^((?![0-9]).)*$/;
