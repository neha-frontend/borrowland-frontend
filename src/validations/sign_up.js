import * as Yup from 'yup'

import {
	CANNOT_EMPTY_REGEX,
	ONLY_CONTAN_ALPHABET_AND_SPACES_REGEX,
	PASSWORD_REGEX,
} from '../constants/regexConstants'
import {
	CONFIRM_PASSWORD_REQUIRED,
	EMAIL_REQUIRED,
	MOBILE_NUMBER_REQUIRED,
	NAME_DIGIT_CHECK,
	NAME_REQUIRED,
	PASSWORD_REQUIRED,
	REQUIRED,
	TNC_REQUIRED,
	VALID_CONFIRM_PASSWORD,
	VALID_EMAIL,
	VALID_PASSWORD,
} from '../constants/validationMessages'

export const SignUpValidatior = Yup.object().shape({
	fullName: Yup.string()
		.matches(CANNOT_EMPTY_REGEX, REQUIRED)
		.matches(ONLY_CONTAN_ALPHABET_AND_SPACES_REGEX, NAME_DIGIT_CHECK)
		.required(NAME_REQUIRED),
	countryCode: Yup.string().required(MOBILE_NUMBER_REQUIRED),
	mobile: Yup.string().required(MOBILE_NUMBER_REQUIRED),
	email: Yup.string().email(VALID_EMAIL).required(EMAIL_REQUIRED),
	password: Yup.string()
		.trim()
		.matches(PASSWORD_REGEX, VALID_PASSWORD)
		.required(PASSWORD_REQUIRED),
	confirmPassword: Yup.string()
		.trim()
		.oneOf([Yup.ref('password'), null], VALID_CONFIRM_PASSWORD)
		.required(CONFIRM_PASSWORD_REQUIRED),
	TnC: Yup.bool().oneOf([true], TNC_REQUIRED),
	// TnC: Yup.string().equals(['true'], TNC_REQUIRED).required(TNC_REQUIRED),
})
