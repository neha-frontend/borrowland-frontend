import {
	BORROW_OPTION,
	REFER_OPTION,
	REPAY_OPTION,
	SWAP_OPTION,
} from '../../assets/images'

const OPTION_ARRAY = [
	{
		id: 1,
		icon: BORROW_OPTION,
		title: 'Borrow',
		text: 'Cash or Stablecoins',
		redirection: '/borrow',
	},
	{
		id: 2,
		icon: REPAY_OPTION,
		title: 'Repay',
		text: 'With Crypto, Cash or Stablecoins',
		redirection: '/my-loans',
	},
	{
		id: 3,
		icon: SWAP_OPTION,
		title: 'Swap',
		text: 'Swap',
		redirection: '/swap',
	},
	{
		id: 4,
		icon: REFER_OPTION,
		title: 'Refer',
		text: 'Refer a Friend',
		redirection: '/affiliate',
	},
]

export default OPTION_ARRAY
