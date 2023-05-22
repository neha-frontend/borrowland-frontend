import React from 'react'
import { RenderIf } from 'utils'

const AffiliateCard = ({
	affiliate_icon,
	titleText,
	valueText,
	btnText,
	btnImg,
	affiliateClass,
	onClick,
	tooltip,
}) => {
	return (
		<div className={`affiliate_card_box ${affiliateClass}`}>
			<div className="d-flex align-items-sm-center justify-content-between flex-sm-row flex-column">
				<div className="d-flex align-items-stretch">
					<img
						src={affiliate_icon}
						alt="affiliate_icon"
						className="affiliate_icon"
					/>
					<div className="d-flex flex-column affiliate_text_container">
						<p className="affiliate_f16_text">{titleText}</p>
						<p className="affiliate_bold_text">{valueText}</p>
					</div>
				</div>
				<RenderIf isTrue={btnText}>
					<button
						data-tooltip={tooltip}
						className="btn-primary affiliate_btn mt-sm-0 mt-3 cursor-pointer"
						onClick={onClick}
					>
						{btnImg ? (
							<img
								src={btnImg}
								alt="copy"
								className="mr-2 copy_img"
							/>
						) : null}
						{btnText}
					</button>
				</RenderIf>
			</div>
		</div>
	)
}

export default AffiliateCard
