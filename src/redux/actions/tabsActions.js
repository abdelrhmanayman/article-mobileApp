import {
    LOAD_NOTIFICATIONS_FAILURE, LOAD_NOTIFICATIONS_SUCCESS, LOAD_NOTIFICATIONS,
    LOAD_ACCOUNT, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE,
    LOAD_HOME,
    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_SUCCESS,
} from './types'

export const loadNotificationsAction = params => ({
    type: LOAD_NOTIFICATIONS,
    params
})
export const loadNotificationsActionSuccess = params => ({
    type: LOAD_NOTIFICATIONS_SUCCESS,
    params
})
export const loadNotificationsActionFailure = params => ({
    type: LOAD_NOTIFICATIONS_FAILURE,
    params
})

export const loadAccountAction = params => ({
    type: LOAD_ACCOUNT,
    params
})
export const loadAccountActionSuccess = params => ({
    type: LOAD_ACCOUNT_SUCCESS,
    params
})
export const loadAccountActionFailure = params => ({
    type: LOAD_ACCOUNT_FAILURE,
    params
})

export const updateAccountAction = params => ({
    type: UPDATE_ACCOUNT,
    params
})
export const updateAccountActionSuccess = params => ({
    type: UPDATE_ACCOUNT_FAILURE,
    params
})
export const updateAccountActionFailure = params => ({
    type: UPDATE_ACCOUNT_SUCCESS,
    params
})

export const loadHomeAction = params => ({
    type: LOAD_HOME,
    params
})