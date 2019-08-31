import { combineReducers } from 'redux'
import auth from './authReducers'
import { reducer } from 'redux-form'
import articlesReducer from './articlesReducers'

const allReducers = combineReducers({
    form: reducer,
    auth,
    articles: articlesReducer
})
export default allReducers