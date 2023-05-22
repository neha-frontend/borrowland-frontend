/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify'
import { put } from 'redux-saga/effects'

import {
	AGENT_SIGN_UP,
	FORGOT_PASSWORD_URL,
	LOGIN_URL,
	LOGOUT_URL,
	RESEND_OTP_URL,
	RESET_PASSWORD_URL,
	SIGNUP_URL,
	VERIFY_OTP_URL,
} from '../../../apis'
import { errorHandler } from '../../../utils'

import {
	agentSignUpFail,
	agentSignUpStart,
	agentSignUpSuccess,
	forgotPasswordFail,
	forgotPasswordStart,
	forgotPasswordSuccess,
	getVerificationAction,
	loginFail,
	loginStart,
	loginSuccess,
	logoutFail,
	logoutStart,
	logoutSuccess,
	otpVerificationFail,
	otpVerificationStart,
	otpVerificationSuccess,
	resendOTPFail,
	resendOTPStart,
	resendOTPSuccess,
	resetAuthToken,
	resetPasswordFail,
	resetPasswordStart,
	resetPasswordSuccess,
	resetUserDetails,
	signUpFail,
	signUpStart,
	signUpSuccess,
} from '../../sagaActions'

// signup saga
export function* signUpSaga(action) {
	yield put(signUpStart())
	const { data, navigate } = action.payload
	yield errorHandler({
		endpoint: SIGNUP_URL,
		successHandler: yield function* (response) {
			yield put(
				signUpSuccess({
					...response.data,
				}),
			)
			if (navigate)
				navigate('/authentication', {
					state: {
						number: response?.data?.items?.mobile,
						countryCode: response?.data?.items?.countryCode,
						email: response?.data?.items?.email,
						data: response?.data?.items,
					},
				})
		},
		failHandler: yield function* (response) {
			yield put(signUpFail(response))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// OTP Verification Saga
export function* otpVerificationSaga(action) {
	yield put(otpVerificationStart())
	const {
		data,
		screen = '',
		navigate,
		notify,
		dispatch,
		closeModal,
		notifyMessage,
		type,
	} = action.payload
	yield errorHandler({
		endpoint: VERIFY_OTP_URL,
		successHandler: yield function* (response) {
			const { data: responseData } = response
			yield put(otpVerificationSuccess({ data: responseData }))
			if (closeModal) {
				closeModal()
			}
			if (notify) {
				if (type === 'CHANGE_PASSWORD') {
					notify(notifyMessage)
				} else {
					notify('Email is verified successfully')
				}
			}
			if (dispatch) {
				dispatch(getVerificationAction())
			}
			if (responseData?.items?.isRecoveredAccount) {
				toast.success('Welcome Back!')
			}
			if (screen) {
				if (screen === 'SIGNUP') {
					yield sessionStorage.setItem(
						'authToken',
						responseData?.items?.authToken,
					)
					navigate('/dashboard')
					// setTimeout(() => {
					//   navigate("/");
					// }, 4000);
				} else {
					navigate('/reset-password', {
						state: {
							otp: action?.payload?.data?.otp,
						},
					})
				}
			}
		},
		failHandler: yield function* (response) {
			yield put(otpVerificationFail(response))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// Resend OTP Saga
export function* resendOTPSaga(action) {
	yield put(resendOTPStart())
	const { data, notify } = action.payload
	yield errorHandler({
		endpoint: RESEND_OTP_URL,
		successHandler: yield function* (response) {
			yield put(resendOTPSuccess({ msg: response.message }))
			if (notify) {
				notify('OTP is resent successfully.')
			}
		},
		failHandler: yield function* (response) {
			yield put(resendOTPFail(response))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// login saga
export function* loginSaga(action) {
	yield put(loginStart())
	const { data, navigate } = action.payload
	yield errorHandler({
		endpoint: LOGIN_URL,
		successHandler: yield function* (response) {
			navigate('/authentication', {
				state: {
					number: response?.data?.items?.mobile,
					countryCode: response?.data?.items?.countryCode,
					email: response?.data?.items?.email,
					data: response?.data?.items,
				},
			})

			yield put(
				loginSuccess({
					...response.data,
				}),
			)
		},
		failHandler: yield function* (data) {
			yield put(loginFail({ data }))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// forgot password saga
export function* forgotPasswordSaga(action) {
	yield put(forgotPasswordStart())
	const { data, navigate } = action.payload

	yield errorHandler({
		endpoint: FORGOT_PASSWORD_URL,
		successHandler: yield function* (response) {
			yield put(forgotPasswordSuccess({ ...response.data }))
			navigate('/otp-verification', {
				state: {
					number: response?.data?.items?.mobile,
					countryCode: response?.data?.items?.countryCode,
				},
			})
		},
		failHandler: yield function* (response) {
			yield put(forgotPasswordFail(response))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// reset password saga
export function* resetPasswordSaga(action) {
	yield put(resetPasswordStart())
	const { data, navigate } = action.payload

	yield errorHandler({
		endpoint: RESET_PASSWORD_URL,
		successHandler: yield function* (response) {
			yield put(resetPasswordSuccess(response.data))
			navigate('/')
		},
		failHandler: yield function* (response) {
			yield put(resetPasswordFail(response))
		},
		failHandlerType: 'CUSTOM',
		payload: data,
		apiType: 'post',
	})
}

// logout saga
export function* logoutSaga(action) {
	const { navigate, closeModal } = action.payload
	yield put(logoutStart())
	yield errorHandler({
		endpoint: LOGOUT_URL,
		successHandler: yield function* () {
			yield sessionStorage.clear()
			yield put(logoutSuccess())
			yield put(resetUserDetails())
			yield put(resetAuthToken())
			navigate('/')
			closeModal()
		},
		failHandler: yield function* (response) {
			yield put(logoutFail(response))
		},
		failHandlerType: 'CUSTOM',
		apiType: 'post',
	})
}

// login saga
export function* agentSignUpSaga(action) {
	yield put(agentSignUpStart())
	const { setIsLoading } = action.payload
	yield errorHandler({
		endpoint: AGENT_SIGN_UP,
		successHandler: yield function* (response) {
			yield put(
				agentSignUpSuccess({
					...response.data,
				}),
			)
			toast.success(response?.data.message)
			setIsLoading(false)
		},
		failHandler: yield function* (data) {
			yield put(agentSignUpFail({ data }))
		},
		failHandlerType: 'CUSTOM',
		// payload: data,
		apiType: 'post',
	})
}
