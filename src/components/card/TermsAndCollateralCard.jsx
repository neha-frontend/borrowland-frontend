import React from 'react'

import { WALLET_RIGHT_ARROW_WHITE } from '../../assets/images'
import { RenderIf } from '../../utils'

const TermsAndCollateralCard = ({
	flexTitle,
	apyFlexPercent,
	icon,
	assetType = 'BTC',
	balanceAmount,
	balanceSpanAmount,
	flexTermsTitle,
	intersetPercent,
	intersetPara,
	interest_action,
	handleInterestActionClick,
}) => {
	return (
		<div>
			<p className="saving_wallet_title">{flexTitle}</p>
			<div className="balance_container d-flex align-items-start">
				<RenderIf isTrue={apyFlexPercent}>
					<p className="apy_percent apy_flex_percent">4%</p>
				</RenderIf>
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
			</div>
			<RenderIf isTrue={flexTermsTitle}>
				<p className="flex_terms_title">FLEX Terms</p>
			</RenderIf>
			<div className="flex_earn_div d-flex align-items-center justify-content-between">
				<div>
					<p className="balance_amount ml-0">
						<span className="mx-0">
							Earn up to {intersetPercent} interest
						</span>
					</p>
					<RenderIf isTrue={intersetPara}>
						<p className="intersetPara">
							Use more collateral for your loan and get our lowest
							borrow rates ever.
						</p>
					</RenderIf>
				</div>

				<p
					className="btn btn-primary saving_btn cursor_pointer"
					onClick={handleInterestActionClick}
				>
					{interest_action}
					<span className="mr-0">
						<img src={WALLET_RIGHT_ARROW_WHITE} alt="arrow" />
					</span>
				</p>
			</div>
		</div>
	)
}

export default TermsAndCollateralCard
