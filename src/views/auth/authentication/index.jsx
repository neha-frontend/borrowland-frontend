import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ResendOTP } from 'otp-input-react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { ClipLoader } from 'react-spinners'

import {
	otpVerificationAction,
	resendOtpAction,
	resetOtpVerificationErrorMsg,
} from '../../../store/sagaActions'
import { AUTH_SVG, LOCK_ICON_SVG } from '../../../assets/images'
import {
	AuthHeaderCard,
	CustomOtpComponent,
	ErrorMessageCard,
	PrimaryButton,
} from '../../../components'
import { RenderIf } from '../../../utils'

import './index.css'

const Authentication = () => {
	const [otp, setOtp] = useState('')
	const [hideResend, setHideResend] = useState(false)
	const [headerData, setHeaderData] = useState({
		HEADER_LOGO: '',
		HEADER_NAME: '',
	})
	const [paragraphText, setParagraphText] = useState('')
	const [otpTypeValue, setOtpTypeValue] = useState('')
	const [screen, setScreen] = useState('')
	const [mobileVal, setMobileVal] = useState(null)
	const [emailVal, setEmailVal] = useState(null)
	const [countryCodeVal, setCountryCodeVal] = useState(null)

	const { isLoading, errorMsg } = useSelector(
		(state) => state.auth.otpVerification,
	)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const handleChange = useCallback(
		(otp) => {
			setOtp(otp)
			dispatch(resetOtpVerificationErrorMsg())
		},
		[otp],
	)

	const renderTime = (remainingTime) => {
		if (hideResend) return null

		return (
			<p className={`timer mt-4 ${remainingTime == 0 ? 'hide' : ''}`}>
				00:{remainingTime < 10 ? '0' + remainingTime : remainingTime}
			</p>
		)
	}

	const renderResentOtpButton = (props) => {
		if (hideResend) return null
		return (
			<div
				{...props}
				className={`d-flex justify-content-between mt-4 resent_link cursor_pointer ${
					props.disabled ? 'disabled-link' : 'text'
				}`}
			>
				Resend Code
			</div>
		)
	}

	const handleResend = () => {
		dispatch(resetOtpVerificationErrorMsg())
		setOtp('')
		setHideResend(false)
		renderTime(30)
		dispatch(
			resendOtpAction({
				data: {
					otpSendOn: 'mobile',
					otpType: otpTypeValue,
					countryCode: countryCodeVal,
					mobile: mobileVal,
					email: emailVal,
				},
			}),
		)
	}

	const handleOtpVerifyButton = () => {
		dispatch(
			otpVerificationAction({
				data: {
					otpSentOn: 'mobile',
					otpType: otpTypeValue,
					countryCode: countryCodeVal,
					mobile: mobileVal,
					email: emailVal,
					otp: parseInt(otp),
				},
				screen,
				navigate,
			}),
		)
	}

	useEffect(() => {
		if (location.pathname.includes('/otp-verification')) {
			setHeaderData({
				HEADER_LOGO: LOCK_ICON_SVG,
				HEADER_NAME: 'Reset Your Password',
			}),
				setParagraphText(
					`A OTP has been sent to your mobile number ********${location?.state?.number?.slice(
						-2,
					)}, Please enter the OTP to reset the password`,
				)
			setOtpTypeValue('forgotPassword')
			setScreen('FORGOT_PASSWORD')
		} else {
			setHeaderData({
				HEADER_LOGO: AUTH_SVG,
				HEADER_NAME: 'Authenticate Your Account',
			})
			setParagraphText(
				`Protecting your account is our priority. Please confirm your account by entering the code sent to *********${location?.state?.number?.slice(
					-2,
				)}`,
			)
			setOtpTypeValue('login')
			setScreen('SIGNUP')
		}
		return () => {
			dispatch(resetOtpVerificationErrorMsg())
		}
	}, [])

	useEffect(() => {
		setMobileVal(location?.state?.number)
		setEmailVal(location?.state?.email)
		setCountryCodeVal(location?.state?.countryCode)
	}, [location])

	return (
		<>
			<div className="auth_wrapper padding_50">
				<AuthHeaderCard
					logoImage={headerData.HEADER_LOGO}
					headerName={headerData.HEADER_NAME}
					logoClassName="mt-2"
					showBackIcon
				/>
				<p className="text_grey text-center mt-3 mb-3">
					{paragraphText}
				</p>
				<Formik
					initialValues={{ otp: '' }}
					onSubmit={() => {
						handleOtpVerifyButton()
					}}
				>
					<Form>
						<div className="custom_otp">
							<CustomOtpComponent
								otpType="number"
								value={otp}
								onChange={handleChange}
								name="otp"
								OTPLength={6}
								className="otp_input_container"
							/>
						</div>
						<ResendOTP
							onResendClick={handleResend}
							hideResend={hideResend}
							renderButton={renderResentOtpButton}
							renderTime={renderTime}
							maxTime={60}
							className="resend-container mt-3 d-flex align-items-center justify-content-between otp_input_container"
						/>

						{/* shows is otp is incorrect */}
						<RenderIf isTrue={errorMsg}>
							<ErrorMessageCard errorMsg={errorMsg} />
						</RenderIf>

						<PrimaryButton
							className="mt-3 w-100 verify_button"
							type="submit"
							text={
								isLoading ? (
									<ClipLoader
										color="#fff"
										size={30}
										aria-label="Loading Spinner"
										data-testid="loader"
									/>
								) : (
									'Verify'
								)
							}
							disabled={otp.length !== 6 || isLoading}
						/>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default Authentication
