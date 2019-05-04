import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS,
    FORGET_PASS, FORGET_PASS_SUCCESS, FORGET_PASS_FAILURE
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
        case LOGIN_SUCCESS:
            return { ...state, loading: false }
        case LOGIN_FAILURE:
            return { ...state, loading: false }
        case SIGN_UP:
            return { ...state, loading: true }
        case SIGN_UP_FAILURE:
            return { ...state, loading: false }
        case SIGN_UP_SUCCESS:
            return { ...state, loading: false }
        case FORGET_PASS:
            return { ...state, loading: true }
        case FORGET_PASS_SUCCESS:
            return { ...state, loading: false }
        case FORGET_PASS_FAILURE:
            return { ...state, loading: false }
        default:
            return state
    }
}
export default loginReducer