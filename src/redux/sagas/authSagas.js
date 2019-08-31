import { put, call, takeEvery } from 'redux-saga/effects'
import { LOGIN, SIGN_UP, LOGOUT } from '../actions/types'
import {
    loginActionSuccess, loginActionFailure,
    signUpActionFailure, signUpActionSuccess, logoutActionFailure
} from '../actions/authActions'
import NavigationService from '../../services/NavigationService'
import client from '../../graphql/client'
import queries from '../../graphql/queries'
import { AsyncStorage } from 'react-native'

const logingraph = ({ username, password }) =>
    client.query({
        query: queries.login,
        fetchPolicy: "network-only",
        variables: { username, password }
    }).then(({ data }) => data)

const registergraph = ({ username, firstName: first, lastName: last, role, password }) =>
    client.mutate({
        mutation: queries.register,
        variables: { user: { username, role, password, name: { first, last } } }
    }).then(({ data }) => data)

const logoutgraph = () =>
    client.query({
        query: queries.logout
    }).then(({ data }) => data)

function* loginFunction({ params }) {
    try {
        const { login } = yield call(logingraph, params)
        if (login && login._id) {
            yield put(loginActionSuccess())
            AsyncStorage.setItem('user', JSON.stringify(login))
            NavigationService.navigate('Home')
        } else {
            yield put(loginActionFailure({
                toast: {
                    text: "Incorrect Username or Password",
                    type: "danger"
                }
            }))
        }
    } catch (error) {
        console.log(error)
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
        const { register } = yield call(registergraph, params)
        if (register && register._id) {
            yield put(signUpActionSuccess({
                toast: {
                    text: "You are now registered, Please login!",
                    type: "success"
                }
            }))
            NavigationService.navigate('Login')
        }
    } catch (error) {
        console.log(error)
        yield put(signUpActionFailure({
            toast: {
                text: "Please try another username, This one is taken!",
                type: "danger"
            }
        }))
    }
}


function* logoutFunction() {
    try {
        yield call(logoutgraph)
        AsyncStorage.removeItem('user', () => {
            NavigationService.navigate('Login')
        })
    } catch ({ message }) {
        yield put(logoutActionFailure({
            toast: {
                text: message,
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


export function* logout() {
    yield takeEvery(LOGOUT, logoutFunction)
}