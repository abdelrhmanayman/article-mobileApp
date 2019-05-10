import { put, call, takeEvery } from 'redux-saga/effects'
import { LOGIN, SIGN_UP, FORGET_PASS } from '../actions/types'
import firebase from 'react-native-firebase'
import {
    loginActionSuccess, loginActionFailure,
    signUpActionFailure, signUpActionSuccess,
    forgetPasswordActionFailure, forgetPasswordActionSuccess
} from '../actions/authActions'
import NavigationService from '../../services/NavigationService'

const loginFirebase = ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(done => done.user)

const signUpFirebase = ({ email, password }) =>
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(done => done.user)

const sendEmailVerification = () =>
    firebase.auth().currentUser.sendEmailVerification()

const forgetPasswordFirebase = ({ email }) =>
    firebase.auth().sendPasswordResetEmail(email)

function* loginFunction({ params }) {
    try {
        yield call(loginFirebase, params)
        if (firebase.auth().currentUser.emailVerified) {
            yield put(loginActionSuccess())
            NavigationService.navigate('Home')
        } else {
            yield call(sendEmailVerification)
            yield put(loginActionFailure({
                toast: {
                    text: "Please check your Email inbox for verification.",
                    type: "danger"
                }
            }))
        }
    } catch (error) {
        yield put(loginActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

function* signUpFunction({ params }) {
    try {
        yield call(signUpFirebase, params)
        yield call(sendEmailVerification)
        yield put(signUpActionSuccess({
            toast: {
                text: "Verification Email was sent to you.",
                type: "success"
            }
        }))
        NavigationService.navigate('Login')
    } catch (error) {
        yield put(signUpActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

function* forgetPasswordFunction({ params }) {
    try {
        yield call(forgetPasswordFirebase, params)
        yield put(forgetPasswordActionSuccess({
            toast: {
                text: "We have sent you an Email to reset your password.",
                type: "success"
            }
        }))
        NavigationService.reset('Login')
    } catch (error) {
        yield put(forgetPasswordActionFailure({
            toast: {
                text: error.message,
                type: "danger"
            }
        }))
    }
}

export function* login() {
    yield takeEvery(LOGIN, loginFunction)
}

export function* signUp() {
    yield takeEvery(SIGN_UP, signUpFunction)
}

export function* forgetPassword() {
    yield takeEvery(FORGET_PASS, forgetPasswordFunction)
}