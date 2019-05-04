import { put, call, takeEvery } from 'redux-saga/effects'
import { LOAD_NOTIFICATIONS } from '../actions/types'
// import firebase from 'react-native-firebase'
import {
    loadNotificationsActionSuccess, loadNotificationsActionFailure
} from '../actions/tabsActions'


function* loadNotificationsFunction({ params }) {
    try {
        const notifications = yield call(loadNotificationsFirebase, params)
        console.log(notifications)
        yield put(loadNotificationsActionSuccess({
            notifications
        }))
    } catch (error) {
        yield put(loadNotificationsActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

export function* loadNotifications() {
    yield takeEvery(LOAD_NOTIFICATIONS, loadNotificationsFunction)
}