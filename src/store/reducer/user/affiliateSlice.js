import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAffiliateCountLoading: false,
	affiliateDashoardCountErrorMsg: '',
	affiliateDashoardCountData: null,

	isAffiliateUserListLoading: false,
	affiliateUserListErrorMsg: '',
	affiliateDashoardListData: null,

	isAffiliateUserStaticsLoading: false,
	affiliateUserStaticsErrorMsg: '',
	affiliateUserStaticsData: null,
}

const affilicateSlice = createSlice({
	name: 'affiliate',
	initialState,
	reducers: {
		getAffiliateDashboardCountStart: (state) => {
			state.isAffiliateCountLoading = true
			state.affiliateDashoardCountErrorMsg = ''
		},
		getAffiliateDashboardCountSuccess: (state, { payload }) => {
			state.isAffiliateCountLoading = false
			state.affiliateDashoardCountErrorMsg = ''
			state.affiliateDashoardCountData = payload?.data?.items
		},
		getAffiliateDashboardCountFail: (state, { payload }) => {
			state.isAffiliateCountLoading = false
			state.affiliateDashoardCountErrorMsg = payload
		},

		getAffiliateUserListStart: (state) => {
			state.isAffiliateUserListLoading = true
			state.affiliateUserListErrorMsg = ''
		},
		getAffiliateUserListSuccess: (state, { payload }) => {
			state.isAffiliateUserListLoading = false
			state.affiliateUserListErrorMsg = ''
			state.affiliateDashoardListData = payload?.data?.items
		},
		getAffiliateUserListFail: (state, { payload }) => {
			state.isAffiliateUserListLoading = false
			state.affiliateUserListErrorMsg = payload
		},

		getAffiliateUserStaticsStart: (state) => {
			state.isAffiliateUserStaticsLoading = true
			state.affiliateUserStaticsErrorMsg = ''
		},
		getAffiliateUserStaticsSuccess: (state, { payload }) => {
			state.isAffiliateUserStaticsLoading = false
			state.affiliateUserStaticsErrorMsg = ''
			state.affiliateUserStaticsData = payload?.data?.items
		},
		getAffiliateUserStaticsFail: (state, { payload }) => {
			state.isAffiliateUserStaticsLoading = false
			state.affiliateUserStaticsErrorMsg = payload
		},

		resetAffiliateDashboardStatics: (state) => {
			state.affiliateUserStaticsData = null
		},
		resetAffiliateDashboardCount: (state) => {
			state.affiliateDashoardCountData = null
		},
		resetAffiliateDashboardList: (state) => {
			state.affiliateDashoardListData = null
		},
	},
})

export const {
	getAffiliateDashboardCountStart,
	getAffiliateDashboardCountSuccess,
	getAffiliateDashboardCountFail,

	getAffiliateUserListStart,
	getAffiliateUserListSuccess,
	getAffiliateUserListFail,

	getAffiliateUserStaticsStart,
	getAffiliateUserStaticsSuccess,
	getAffiliateUserStaticsFail,

	resetAffiliateDashboardStatics,
	resetAffiliateDashboardCount,
	resetAffiliateDashboardList,
} = affilicateSlice.actions

export const affiliateDashboardReducers = affilicateSlice.reducer
