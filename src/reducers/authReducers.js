import {
    LOGIN, LOGIN_SUC, LOGIN_FAIL,
    SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUC,
    FORGET_PASS, FORGET_PASS_SUC, FORGET_PASS_FAIL
} from '../actions/types'
import { Toast } from 'native-base'

const initialState = {
    loading: false
}

const loginReducer = (state = initialState, action) => {
    if (action.params) {
        let { toast } = action.params
        if (toast)
            Toast.show({
                ...toast,
                buttonText: "Okay",
                duration: 5000
            })
    }
    switch (action.type) {
        case LOGIN:
            return { ...state, loading: true }
        case LOGIN_SUC:
            return { ...state, loading: false }
        case LOGIN_FAIL:
            return { ...state, loading: false }
        case SIGN_UP:
            return { ...state, loading: true }
        case SIGN_UP_FAIL:
            return { ...state, loading: false }
        case SIGN_UP_SUC:
            return { ...state, loading: false }
        case FORGET_PASS:
            return { ...state, loading: true }
        case FORGET_PASS_SUC:
            return { ...state, loading: false }
        case FORGET_PASS_FAIL:
            return { ...state, loading: false }
        default:
            return state
    }
}
export default loginReducer