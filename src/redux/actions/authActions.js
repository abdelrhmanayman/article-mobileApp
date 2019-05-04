import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FORGET_PASS, FORGET_PASS_FAILURE, FORGET_PASS_SUCCESS
} from './types'

export const loginAction = params => ({
    type: LOGIN,
    params
})
export const loginActionSuccess = params => ({
    type: LOGIN_SUCCESS,
    params
})
export const loginActionFailure = params => ({
    type: LOGIN_FAILURE,
    params
})
export const signUpAction = params => ({
    type: SIGN_UP,
    params
})
export const signUpActionSuccess = params => ({
    type: SIGN_UP_SUCCESS,
    params
})
export const signUpActionFailure = params => ({
    type: SIGN_UP_FAILURE,
    params
})

export const forgetPasswordAction = (params) => ({
    type: FORGET_PASS,
    params
})
export const forgetPasswordActionSuccess = params => ({
    type: FORGET_PASS_SUCCESS,
    params
})
export const forgetPasswordActionFailure = params => ({
    type: FORGET_PASS_FAILURE,
    params
})