import { all } from 'redux-saga/effects'
import { login, signUp, logout } from './authSagas'
import { getarticles, getArticleDetails, comment, addArticle, getWriterArticles, deleteArticle, publishArticle, updateArticle } from './articlesSagas'

function* rootSaga() {
    yield all([
        login(),
        signUp(),
        logout(),
        getarticles(),
        getArticleDetails(),
        comment(),
        addArticle(),
        getWriterArticles(),
        deleteArticle(),
        publishArticle(),
        updateArticle()
    ])
}
export default rootSaga