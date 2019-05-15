import { put, call, takeEvery } from 'redux-saga/effects'
import { LOAD_NOTIFICATIONS, LOAD_ACCOUNT, UPDATE_ACCOUNT, UPLOAD_IMAGE } from '../actions/types'
import {
    loadNotificationsActionSuccess, loadNotificationsActionFailure,
    loadAccountActionFailure, loadAccountActionSuccess,
    updateAccountActionFailure, updateAccountActionSuccess,
    uploadImageActionFailure, uploadImageActionSuccess
} from '../actions/tabsActions'
import firebase from 'react-native-firebase'
import ImageResizer from 'react-native-image-resizer'

const storageRef = firebase.storage().ref('users/avatars/')
const userRef = firebase.firestore().collection('users')
const notificationsRef = firebase.firestore().collection('notifications')
const getUser = () => firebase.auth().currentUser.uid

const loadNotificationsFirebase = () => notificationsRef.doc(getUser()).get().then(doc => doc.data())

const loadAccountFirebase = () => userRef.doc(getUser()).get().then(doc => doc.data())

const updateAccountFirebase = (params) => userRef.doc(getUser()).update(params)

const firebaseUploadImage = ({ uri, width, height }) =>
    new Promise(resolve => {
        ImageResizer.createResizedImage(uri, width, height, "JPEG", 10)
            .then(({ uri, type }) => {
                let uploadTask = storageRef.child(getUser())
                    .put(uri, { contentType: type })
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => { },
                    () => { },
                    () => resolve(uploadTask.ref.getDownloadURL()))
            })
    })

function* loadNotificationsFunction() {
    try {
        let notifications = yield call(loadNotificationsFirebase)
        yield put(loadNotificationsActionSuccess({ notifications: notifications ? notifications : [] }))
    } catch (error) {
        yield put(loadNotificationsActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

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

function* uploadImageFunction({ params }) {
    try {
        const response = yield call(firebaseUploadImage, params)
        yield call(updateAccountFirebase, { avatar: response })
        yield put(uploadImageActionSuccess({ avatar: response }))
    } catch (error) {
        yield put(uploadImageActionFailure({
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

export function* uploadImage() {
    yield takeEvery(UPLOAD_IMAGE, uploadImageFunction)
}