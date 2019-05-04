import { all } from 'redux-saga/effects'
import { login, signUp, forgetPassword } from './authSagas'
import { loadNotifications } from './tabsSagas'

function* rootSaga() {
    yield all([
        login(),
        signUp(),
        forgetPassword(),
        loadNotifications()
    ])
}
export default rootSaga