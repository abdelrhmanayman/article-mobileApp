import { all } from 'redux-saga/effects'
import { login, signUp, forgetPassword } from './authSagas'
import { loadNotifications, loadAccount,updateUser } from './tabsSagas'

function* rootSaga() {
    yield all([
        login(),
        signUp(),
        forgetPassword(),
        loadNotifications(),
        loadAccount(),
        updateUser(),
    ])
}
export default rootSaga