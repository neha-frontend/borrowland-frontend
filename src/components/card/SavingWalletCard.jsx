import { QUESTION, WALLET_RIGHT_ARROW } from '../../assets/images'
import { RenderIf } from '../../utils'
// import { BTC_ICON_DROPDOWN } from "../../assets/images";
import PrimaryButton from '../buttons/primaryButton'

const SavingWalletCard = ({
	assetType = 'BTC',
	savingCreditTitle,
	icon,
	balanceAmount = 0,
	balanceSpanAmount = 0,
	apyPercentVal,
	apyPercentClassName,
	interest,
	btnText,
	handleInterestModal,
	handleTransferModal,
	handleWithdrawFundsModal,
	apyPercent = true
}) => {
	return (
		<div>
			<div className="d-flex align-items-center">
				<p className="saving_wallet_title mr_20">{savingCreditTitle}</p>
				<div data-tooltip="I am tooltip">
					<img
						src={QUESTION}
						width="16"
						height="16"
						alt="question_icon"
					/>
				</div>
			</div>
			<div className="balance_container saving_balance_container d-flex align-items-start">
				<div className="d-flex align-items-start">
					<img src={icon} className="mt-1 icon" alt="asset" />
					<div>
						<p className="balance_amount">
							{assetType} {balanceAmount}
						</p>
						<p className="balance_amount">
							<span className="mx-0">${balanceSpanAmount}</span>
						</p>
					</div>
				</div>
				<RenderIf isTrue={apyPercent} >
				<p className={`apy_percent ml_40 mr-0 ${apyPercentClassName}`}>
					{apyPercentVal}
				</p>

				</RenderIf>
				<RenderIf isTrue={!interest}>
					<PrimaryButton
						text={btnText}
						className="saving_btn"
						handleClick={handleWithdrawFundsModal}
					/>
				</RenderIf>
			</div>
			<div className="d-flex  justify-content-between interest_breakdown_container">
				<RenderIf isTrue={interest}>
					<p
						className="interest_breakdown cursor_pointer"
						onClick={handleInterestModal}
					>
						Interest Breakdown
						<span>
							<img src={WALLET_RIGHT_ARROW} alt="arrow" />
						</span>
					</p>
					<PrimaryButton
						text={btnText}
						className="saving_btn"
						handleClick={handleTransferModal}
					/>
				</RenderIf>
			</div>
			<hr />
		</div>
	)
}

export default SavingWalletCard
