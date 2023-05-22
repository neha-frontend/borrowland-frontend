import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../../../store/sagaActions'
import PrimaryButton from '../../buttons/primaryButton'
import CustomModal from '../CustomModal'

import './index.css'

const LogoutModal = ({ showModal, closeModal }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutAction({ navigate, closeModal }))
	}

	return (
		<CustomModal
			showModal={showModal}
			closeModal={closeModal}
			showCloseButton
		>
			<div>
				<p className="auth_title pt-4 mt-4">
					Are you sure you want to logout?
				</p>
				<div className="d-flex justify-content-center">
					<PrimaryButton
						className="mt-3 w-25 mb-5 mr-3 curser-pointer"
						primaryClassName="logout_cancel_button"
						text="No"
						handleClick={() => {
							closeModal()
						}}
					/>
					<PrimaryButton
						className="mt-3 w-25 mb-5 ml-3"
						text="Yes"
						handleClick={handleLogout}
					/>
				</div>
			</div>
		</CustomModal>
	)
}

export default LogoutModal
