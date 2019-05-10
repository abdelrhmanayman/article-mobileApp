import { put, call, takeEvery } from 'redux-saga/effects'
import { LOAD_NOTIFICATIONS, LOAD_ACCOUNT, UPDATE_ACCOUNT } from '../actions/types'
import {
    loadNotificationsActionSuccess, loadNotificationsActionFailure,
    loadAccountActionFailure,
    loadAccountActionSuccess,
    updateAccountActionFailure,
    updateAccountActionSuccess
} from '../actions/tabsActions'
import firebase from 'react-native-firebase'


function* loadNotificationsFunction({ params }) {
    try {
        let notifications = yield call(loadNotificationsFirebase, params)
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

const loadAccountFirebase = () =>
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then(doc => doc.data())

const updateAccountFirebase = (params) =>
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set(params)

function* loadAccountFunction({ params }) {
    try {
        let account = yield call(loadAccountFirebase, params)
        if (!account) throw new Error("Coun't fetch user")
        yield put(loadAccountActionSuccess({
            account
        }))
    } catch (error) {
        yield put(loadAccountActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

function* updateAccountFucnction({ params }) {
    try {
        yield call(updateAccountFirebase, params)
        yield put(updateAccountActionSuccess({
            toast: {
                text: "Details updated",
                type: "success"
            },
            account: params
        }))
    } catch (error) {
        yield put(updateAccountActionFailure({
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

export function* loadAccount() {
    yield takeEvery(LOAD_ACCOUNT, loadAccountFunction)
}

export function* updateUser() {
    yield takeEvery(UPDATE_ACCOUNT, updateAccountFucnction)
}