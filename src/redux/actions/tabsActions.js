import {
    LOAD_NOTIFICATIONS_FAILURE, LOAD_NOTIFICATIONS_SUCCESS, LOAD_NOTIFICATIONS,
    LOAD_ACCOUNT,
    LOAD_HOME
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
export const loadHomeAction = params => ({
    type: LOAD_HOME,
    params
})