import {
	BORROW,
	DASHBOARD,
	SWAP,
	TRANSACTIONS,
	SIDEBAR_HELP,
	AFFILIATE,
} from '../../assets/images'

const HEADER_TAB_ARRAY = [
	{
		id: 1,
		name: 'Dashboard',
		image: DASHBOARD,
		to: '/dashboard',
	},
	{
		id: 2,
		name: 'Transactions',
		image: TRANSACTIONS,
		to: '/transactions',
	},
	{
		id: 3,
		name: 'Borrow',
		image: BORROW,
		to: '/borrow',
	},
	{
		id: 4,
		name: 'Swap',
		image: SWAP,
		to: '/swap',
	},
	{
		id: 5,
		name: 'Affiliate',
		image: AFFILIATE,
		to: '/affiliate',
		role: 'user',
	},
	{
		id: 6,
		name: 'Help',
		image: SIDEBAR_HELP,
		to: '/help',
	},
]

export default HEADER_TAB_ARRAY
