import { useState, useEffect } from 'react'
import Persona from 'persona'

import PrimaryButton from '../../buttons/primaryButton'
import CustomModal from '../CustomModal'
import {
	PERSONA_TEMPLATE_ID,
	PERSONA_ENV,
	PERSONA_ENV_ID,
} from 'constants/envConstants'
import '../user/index.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateKycAction } from 'store/sagaActions'
import { getVerificationAction } from 'store/sagaActions'

const AlertModal = ({ showModal, closeModal }) => {
	const dispatch = useDispatch()

	const { userData } = useSelector((state) => state.user.userDetails)

	const [client, setClient] = useState()
	const handleGetVerification = () => {
		dispatch(getVerificationAction())
	}
	useEffect(() => {
		const personaClient = new Persona.Client({
			templateId: PERSONA_TEMPLATE_ID,
			environment: PERSONA_ENV,
			environmentId: PERSONA_ENV_ID,
			referenceId: userData?._id,
			onComplete: ({ inquiryId, status }) => {
				dispatch(updateKycAction({ handleGetVerification }))
				// Inquiry completed. Optionally tell your server about it.
				console.log('inquiryId, status ', inquiryId, status)
				// dispatch(saveInquiryIdAction({ data: { inqId: inquiryId } }));
			},
			onCancel: () => console.log('canceled KYC verification'),
			onError: (error) => console.log(error),
		})
		setClient(personaClient)
	}, [])
	const handleVerifyKYC = () => {
		client?.open()
		closeModal()
	}
	return (
		<CustomModal
			showModal={showModal}
			closeModal={closeModal}
			showCloseButton
		>
			<div>
				<p className="auth_title pt-4 mt-4">
					Your KYC verification is pending!
					<p style={{ fontSize: 14 }}>
						Please complete KYC to use all features.
					</p>
				</p>
				<div className="d-flex justify-content-center">
					<PrimaryButton
						className="mt-3 w-25 mb-5 ml-3"
						text="Verify KYC"
						handleClick={handleVerifyKYC}
					/>
				</div>
			</div>
		</CustomModal>
	)
}

export default AlertModal
