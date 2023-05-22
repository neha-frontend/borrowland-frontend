import { createAction } from '@reduxjs/toolkit'

export const signUpAction = createAction('SIGNUP_ACTION')
export const agentSignUp = createAction('AGENT_SIGNUP_ACTION')

export const otpVerificationAction = createAction('OTP_VERIFICATION_ACTION')

export const resendOtpAction = createAction('RESEND_OTP_ACTION')

export const loginAction = createAction('LOGIN_ACTION')

export const forgotPasswordAction = createAction('FORGOT_PASSWORD_ACTION')

export const resetPasswordAction = createAction('RESET_PASSWORD_ACTION')

export const logoutAction = createAction('LOGOUT_ACTION')
