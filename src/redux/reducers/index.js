import { combineReducers } from 'redux'
import auth from './authReducers'
import { reducer } from 'redux-form'
import tabs from './tabsReducers'

const allReducers = combineReducers({
    form: reducer,
    auth,
    tabs
})
export default allReducers