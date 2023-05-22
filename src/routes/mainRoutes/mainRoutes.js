import { lazy } from 'react'
export const userRoutes = [
	{
		path: '/dashboard',
		exact: true,
		name: 'Dashboard',
		component: lazy(() => import('../../views/user/dashboard/Dashboard')),
	},
	{
		path: '/transactions',
		exact: true,
		name: 'Transactions',
		component: lazy(() =>
			import('../../views/user/transactions/Transactions'),
		),
	},
	{
		path: '/borrow',
		exact: true,
		name: 'Borrow',
		component: lazy(() => import('../../views/user/borrow/Borrow')),
	},
	{
		path: '/swap',
		exact: true,
		name: 'Swap',
		component: lazy(() => import('../../views/user/swap/Swap')),
	},
	{
		path: '/affiliate',
		exact: true,
		name: 'Affiliate',
		component: lazy(() => import('../../views/user/affiliate/Affiliate')),
	},

	{
		path: '/profile/identity-verification',
		exact: true,
		name: 'ProfileVerification',
		component: lazy(() => import('../../views/user/profile/Profile')),
	},
	{
		path: '/wallet/:walletId',
		exact: true,
		name: 'Wallet',
		component: lazy(() =>
			import('../../views/user/dashboard/wallet/Wallet'),
		),
	},
	{
		path: '/wallet/:walletId/fixed-terms',
		exact: true,
		name: 'FixedTerms',
		component: lazy(() =>
			import('../../views/user/dashboard/wallet/FixedTerms'),
		),
	},
	{
		path: '/profile/settings',
		exact: true,
		name: 'ProfileSettings',
		component: lazy(() => import('../../views/user/profile/Profile')),
	},
	{
		path: '/security',
		exact: true,
		name: 'Security',
		component: lazy(() => import('../../views/user/security/Security')),
	},
	{
		path: '/security/change-password',
		exact: true,
		name: 'ChangePassword',
		component: lazy(() =>
			import('../../views/user/security/changePassword/ChangePassword'),
		),
	},
	{
		path: '/security/close-account',
		exact: true,
		name: 'CloseAccount',
		component: lazy(() =>
			import('../../views/user/security/closeAccount/CloseAccount'),
		),
	},
	{
		path: '/my-loans',
		exact: true,
		name: 'MyLoans',
		component: lazy(() => import('../../views/user/myLoans/MyLoans')),
	},
	{
		path: '*',
		name: '404',
		component: lazy(() => import('../../components/404')),
	},
	{
		redirectRoute: true,
		name: 'dashboardRedirect',
		path: '/dashboard',
	},
]
export const guestRoutes = [
	{
		exact: true,
		path: '/',
		name: 'login',
		component: lazy(() => import('../../views/auth/login')),
		guestpage: true,
	},
	{
		exact: true,
		path: '/signup',
		name: 'SignUp',
		component: lazy(() => import('../../views/auth/signUp')),
		guestpage: true,
	},
	{
		exact: true,
		path: '/authentication',
		name: 'Authentication',
		component: lazy(() => import('../../views/auth/authentication')),
		guestpage: true,
	},
	{
		exact: true,
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: lazy(() =>
			import('../../views/auth/password/ForgotPassword'),
		),
		guestpage: true,
	},
	{
		exact: true,
		path: '/reset-password',
		name: 'ResetPassword',
		component: lazy(() =>
			import('../../views/auth/password/ResetPassword'),
		),
		guestpage: true,
	},
	{
		exact: true,
		path: '/otp-verification',
		name: 'OtpVerification',
		component: lazy(() => import('../../views/auth/authentication')),
		guestpage: true,
	},
	{
		redirectRoute: true,
		name: 'login',
		path: '/',
	},
]
