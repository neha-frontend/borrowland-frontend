import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	signUpEmail: '',
	signUpNumber: '',
	signUpCountryCode: '',
	errorMsg: '',
	agentErrorMsg: '',
	agentSignUpData: '',
}

const signUpSlice = createSlice({
	name: 'signUp',
	initialState,
	reducers: {
		signUpStart: (state) => {
			state.isLoading = true
		},
		signUpSuccess: (state, { payload }) => {
			state.isLoading = false
			state.signUpCountryCode = payload?.items?.countryCode
			state.signUpEmail = payload?.items?.email
			state.signUpNumber = payload?.items?.mobile
		},
		signUpFail: (state, { payload }) => {
			state.isLoading = false
			state.errorMsg = payload
		},
		agentSignUpStart: (state) => {
			state.isLoading = true
		},
		agentSignUpSuccess: (state, { payload }) => {
			state.isLoading = false
			state.agentSignUpData = payload
		},
		agentSignUpFail: (state, { payload }) => {
			state.isLoading = false
			state.agentErrorMsg = payload
		},
		resetSignUpErrorMsg: (state) => {
			state.errorMsg = ''
			state.agentErrorMsg = ''
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	signUpStart,
	signUpSuccess,
	signUpFail,
	agentSignUpStart,
	agentSignUpSuccess,
	agentSignUpFail,
	resetSignUpErrorMsg,
} = signUpSlice.actions

export const signUpReducer = signUpSlice.reducer
