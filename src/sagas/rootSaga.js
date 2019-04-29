import { all } from 'redux-saga/effects'
import { login, signUp, forgetPassword } from './authSagas'

function* rootSaga() {
    yield all([
        login(),
        signUp(),
        forgetPassword()
    ])
}
export default rootSaga