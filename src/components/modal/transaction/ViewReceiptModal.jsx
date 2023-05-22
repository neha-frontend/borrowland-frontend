import { Modal } from 'react-bootstrap'
import { CLOSE } from '../../../assets/images'
import {
	formatTime,
	formatDate,
	handleSetDropDown,
} from 'components/reusableFunctions/reusableFuctions'
import GenericPdfDownloader from 'utils/generatePDF'
import { RenderIf } from 'utils'

const ViewReceiptModal = ({
	onHide,
	modalWidth,
	show,
	handlePreviewClick,
	viewReceiptData,
}) => {
	return (
		<>
			<Modal
				className={modalWidth}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={show}
			>
				<img
					src={CLOSE}
					alt="close"
					className="close_icon_modal"
					onClick={onHide}
				/>
				<div className="withdraw_modal transaction_modal">
					<p className="modal_title">View Receipt</p>
					<div className="withdraw_preview_container" id="receipt">
						<p className="preview_title font-weight-bold">
							Preview
						</p>
						{/* Timestamp */}
						<div className="d-flex justify-content-between align-items-center">
							<p className="preview_left">Tx. ID</p>
							<p className="preview_right preview_right_bold">
								{viewReceiptData._id}
							</p>
						</div>

						{/* Timestamp */}
						<div className="d-flex justify-content-between align-items-center">
							<p className="preview_left">Timestamp</p>
							<p className="preview_right preview_right_bold">
								{formatDate(
									viewReceiptData?.createdAt,
									'DD-MM-YYYY',
								)}{' '}
								{formatTime(viewReceiptData?.createdAt)}
							</p>
						</div>

						{/* type - !Swap --> token & token Qty */}
						<RenderIf isTrue={viewReceiptData?.type !== 'Swap'}>
							<div className="d-flex justify-content-between align-items-center">
								<p className="preview_left">Token</p>
								<p className="preview_right preview_right_bold d-flex align-items-center">
									<img
										src={handleSetDropDown(
											viewReceiptData?.token,
										)}
										width="24"
										height="24"
										alt="asset"
									/>
									<span className="mr-0 d-block">
										{viewReceiptData?.token}
									</span>
								</p>
							</div>

							<div className="d-flex justify-content-between align-items-center">
								<p className="preview_left">Token Qty</p>
								<p className="preview_right preview_right_bold">
									{viewReceiptData?.amount &&
										parseFloat(
											viewReceiptData?.amount,
										).toFixed(8)}
								</p>
							</div>
						</RenderIf>

						{/* type - Swap --> From & To */}
						<RenderIf isTrue={viewReceiptData?.type === 'Swap'}>
							<div className="d-flex justify-content-between align-items-center">
								<p className="preview_left">From</p>
								<p className="preview_right preview_right_bold d-flex align-items-center">
									<img
										src={handleSetDropDown(
											viewReceiptData?.from,
										)}
										width="24"
										height="24"
										alt="asset"
									/>
									<span className="mr-0 d-block">
										{' '}
										{viewReceiptData?.amount &&
											parseFloat(
												viewReceiptData?.amount,
											).toFixed(8)}{' '}
										{viewReceiptData?.from}
									</span>
								</p>
							</div>
							<div className="d-flex justify-content-between align-items-center">
								<p className="preview_left">To</p>
								<p className="preview_right preview_right_bold d-flex align-items-center">
									<img
										src={handleSetDropDown(
											viewReceiptData?.to,
										)}
										width="24"
										height="24"
										alt="asset"
									/>

									<span className="mr-0 d-block">
										{viewReceiptData?.swapAmount &&
											parseFloat(
												viewReceiptData?.swapAmount,
											).toFixed(8)}{' '}
										{viewReceiptData?.to}
									</span>
								</p>
							</div>
						</RenderIf>

						{/* Action */}
						<div className="d-flex justify-content-between align-items-center">
							<p className="preview_left">Action</p>
							<p className="preview_right font-weight-bold">
								{viewReceiptData?.type}
							</p>
						</div>

						{/* status */}
						<div className="d-flex justify-content-between align-items-center">
							<p className="preview_left">Status</p>
							<p
								className={`preview_right status_btn_view ${
									viewReceiptData?.status === 'Success'
										? 'success_status'
										: viewReceiptData?.status === 'Pending'
										? 'pending_status'
										: viewReceiptData?.status === 'Failed'
										? 'failed_status'
										: viewReceiptData?.status === 'Rejected'
										? 'reject_status'
										: 'pending_status'
								}`}
							>
								{viewReceiptData?.status}
							</p>
						</div>
					</div>

					<div className="preview_fund_modal">
						<GenericPdfDownloader
							downloadFileName="receipt"
							rootElementId="receipt"
							handleClick={handlePreviewClick}
							isDisable={viewReceiptData?.status !== 'Success'}
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default ViewReceiptModal
