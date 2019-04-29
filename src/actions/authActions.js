import {
    LOGIN, LOGIN_SUC, LOGIN_FAIL,
    SIGN_UP, SIGN_UP_SUC, SIGN_UP_FAIL,
    FORGET_PASS, FORGET_PASS_FAIL, FORGET_PASS_SUC
} from './types'

export const loginAction = params => ({
    type: LOGIN,
    params
})
export const loginSuc = params => ({
    type: LOGIN_SUC,
    params
})
export const loginFail = params => ({
    type: LOGIN_FAIL,
    params
})
export const signUpAction = params => ({
    type: SIGN_UP,
    params
})
export const signUpActionSuc = params => ({
    type: SIGN_UP_SUC,
    params
})
export const signUpActionFail = params => ({
    type: SIGN_UP_FAIL,
    params
})

export const forgetPasswordAction = (params) => ({
    type: FORGET_PASS,
    params
})
export const forgetPasswordActionSuc = params => ({
    type: FORGET_PASS_SUC,
    params
})
export const forgetPasswordActionFail = params => ({
    type: FORGET_PASS_FAIL,
    params
})