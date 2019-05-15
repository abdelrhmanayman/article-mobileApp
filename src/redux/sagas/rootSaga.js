import { all } from 'redux-saga/effects'
import { login, signUp, forgetPassword } from './authSagas'
import { loadNotifications, loadAccount, updateUser, uploadImage } from './tabsSagas'

function* rootSaga() {
    yield all([
        login(),
        signUp(),
        forgetPassword(),
        loadNotifications(),
        loadAccount(),
        updateUser(),
        uploadImage(),
    ])
}
export default rootSaga