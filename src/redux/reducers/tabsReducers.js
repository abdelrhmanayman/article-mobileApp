import {
    LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_FAILURE, LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_HOME,
    LOAD_ACCOUNT,
    LOAD_ACCOUNT_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_SUCCESS,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCESS,
    UPLOAD_IMAGE_FAILURE
} from '../actions/types'
import { Toast } from 'native-base'

const initialState = {
    loading: false,
    notifications: [],
    showAccount: false,
    showNotifications: true,
    showHome: false
}

const toolbarReducer = (state = initialState, action) => {
    if (action.params) {
        let { toast } = action.params
        if (toast)
            Toast.show({ ...toast, position: "top" })
    }
    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return { ...state, loading: true, showNotifications: true, showHome: false, showAccount: false }
        case LOAD_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, notifications: action.params.notifications }
        case LOAD_NOTIFICATIONS_FAILURE:
            return { ...state, loading: false }
        case LOAD_ACCOUNT:
            return { ...state, loading: true, showNotifications: false, showHome: false, showAccount: true }
        case LOAD_HOME:
            return { ...state, loading: true, showNotifications: false, showHome: true, showAccount: false }
        case LOAD_ACCOUNT_SUCCESS:
            return { ...state, loading: false, initialValues: action.params.account }
        case LOAD_ACCOUNT_FAILURE:
            return { ...state, loading: false }
        case UPDATE_ACCOUNT:
            return { ...state, loading: true }
        case UPDATE_ACCOUNT_FAILURE:
            return { ...state, loading: false }
        case UPDATE_ACCOUNT_SUCCESS:
            return { ...state, loading: false }
        case UPLOAD_IMAGE:
            return { ...state, loading: true }
        case UPLOAD_IMAGE_SUCESS:
            let { initialValues } = state
            initialValues.avatar = action.params.avatar
            return { ...state, initialValues, loading: false }
        case UPLOAD_IMAGE_FAILURE:
            return { ...state, loading: false }
        default:
            return state
    }
}
export default toolbarReducer