import {
    LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_FAILURE, LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_HOME,
    LOAD_ACCOUNT
} from '../actions/types'
import { Toast } from 'native-base'

const initialState = {
    loading: false,
    notifications: [],
    showAccount: false,
    showNotifications: false,
    showHome: true
}

const toolbarReducer = (state = initialState, action) => {
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
        case LOAD_NOTIFICATIONS:
            return { ...state, loading: true, showNotifications: true, showHome: false, showAccount: false }
        case LOAD_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, notifications: action.params.notifications }
        case LOAD_NOTIFICATIONS_FAILURE:
            return { ...state, loading: false }
        case LOAD_ACCOUNT:
            return { ...state, showNotifications: false, showHome: false, showAccount: true }
        case LOAD_HOME:
            return { ...state, showNotifications: false, showHome: true, showAccount: false }
        default:
            return state
    }
}
export default toolbarReducer