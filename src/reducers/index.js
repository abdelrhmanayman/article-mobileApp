import { combineReducers } from 'redux'
import authReducers from './authReducers'
import { reducer } from 'redux-form'

const allReducers = combineReducers({
    auth: authReducers,
    form: reducer
})
export default allReducers