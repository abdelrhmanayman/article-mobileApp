import { put, call, takeEvery } from 'redux-saga/effects'
import { GET_ARTICLES, GET_ARTICLE_DETAILS, COMMENT, ADD_ARTICLE, GET_WRITER_ARTICLES, DELETE_ARTICLE, PUBLISH_ARTICLE, UPDATE_ARTICLE } from '../actions/types'
import {
    getArticlesActionSuccess, getArticlesActionFailure,
    getArticleDetailsActionSuccess, getArticleDetailsActionFailure, commentActionSuccess,
    addArticleActionFailure, addArticleActionSuccess, getWriterArticlesActionSuccess, getWriterArticlesActionFailure,
    deleteArticleActionSuccess, publishArticleActionSuccess, updateArticleActionSuccess
} from '../actions/articlesActions'
import client from '../../graphql/client'
import queries from '../../graphql/queries'
import { Toast } from 'native-base'
import axios from 'axios'
import NavigationService from '../../services/NavigationService'
import {baseURL} from '../../graphql/client'

const getArticlesGraph = () =>
    client.query({
        fetchPolicy: "network-only",
        query: queries.getArticles
    }).then(({ data }) => data)

const getArticleDetailsgraph = id =>
    client.query({
        fetchPolicy: "network-only",
        query: queries.getArticleDetails,
        variables: { id }
    }).then(({ data }) => data)

const getCommentsgraph = articleId =>
    client.query({
        query: queries.getComments,
        fetchPolicy: "network-only",
        variables: { articleId }
    }).then(({ data }) => data)

const commentgraph = ({ userId, articleId, comment }) =>
    client.mutate({
        mutation: queries.comment,
        variables: { userId, articleId, comment }
    }).then(({ data }) => data)

const uploadImage = photo => {
    const picture = new FormData()
    picture.append('file', {
        name: photo.fileName,
        type: photo.type,
        uri:
            photo.uri
    })
    return axios.post(`${baseURL}/images`, picture).then(({ data }) => data)
}

const getWriterArticlesgraph = username =>
    client.query({
        query: queries.getWriterArticles,
        variables: { username },
        fetchPolicy: "network-only"
    }).then(({ data }) => data)

const addArticlegraph = ({ name, text, picture }) =>
    client.mutate({
        mutation: queries.createArticle,
        variables: { article: { name, text, picture } }
    }).then(({ data }) => data)

const deleteArticlegraph = id =>
    client.mutate({
        mutation: queries.deleteArticle,
        variables: { id }
    }).then(({ data }) => data)

const publishArticlegraph = id =>
    client.mutate({
        mutation: queries.publishArticle,
        variables: { id }
    }).then(({ data }) => data)

const updateArticlegraph = ({ id, text }) =>
    client.mutate({
        mutation: queries.editArticle,
        variables: { id, text }
    }).then(({ data }) => data)

function* getArticlesFunction() {
    try {
        let { getArticles } = yield call(getArticlesGraph)
        yield put(getArticlesActionSuccess({ data: getArticles }))
    } catch ({ message }) {
        yield put(getArticlesActionFailure({
            toast: {
                text: "Something went wrong please try again later!",
                type: "danger"
            }
        }))
    }
}


function* getArticleDetailsFuntion({ params }) {
    try {
        let { getArticleDetails } = yield call(getArticleDetailsgraph, params)
        let { getComments } = yield call(getCommentsgraph, params)
        yield put(getArticleDetailsActionSuccess({ data: { ...getArticleDetails, comments: getComments } }))
    } catch ({ message }) {
        yield put(getArticleDetailsActionFailure({
            toast: {
                text: "Something went wrong, Please try again later!",
                type: "danger"
            }
        }))
    }
}

function* commentFunction({ params }) {
    try {
        let { comment } = yield call(commentgraph, params)
        if (comment === true) {
            let { getComments } = yield call(getCommentsgraph, params.articleId)
            yield put(commentActionSuccess({ data: getComments }))
            Toast.show({
                text: "Comment Submitted!",
                type: "success",
                buttonText: "Okay",
                duration: 5000
            })
        } else {
            Toast.show({
                text: "Something went Wrong!, try again later!",
                type: "danger",
                buttonText: "Okay",
                duration: 5000
            })
        }
    } catch ({ message }) {
        Toast.show({
            text: message,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        })
    }
}

function* addArticleFunction({ params }) {
    try {
        let picture = yield call(uploadImage, params.picture)
        yield call(addArticlegraph, { ...params, picture })
        let { getWriterArticles } = yield call(getWriterArticlesgraph, params.username)
        yield put(addArticleActionSuccess({
            toast: {
                text: "Article Added Succesfully!",
                type: "success"
            },
            data: getWriterArticles
        }))
        NavigationService.navigate('WriterArticles')
    } catch ({ message }) {
        yield put(addArticleActionFailure({
            toast: {
                text: "Article name is taken!",
                type: "danger"
            }
        }))
    }
}

function* getWriterArticlesFunction({ params }) {
    try {
        let { getWriterArticles } = yield call(getWriterArticlesgraph, params)
        yield put(getWriterArticlesActionSuccess({ data: getWriterArticles }))
    } catch ({ message }) {
        yield put(getWriterArticlesActionFailure({
            toast: {
                text: "Something went wrong!",
                type: "danger"
            }
        }))
    }
}

function* deleteArticleFunction({ params }) {
    try {
        let { deleteArticle } = yield call(deleteArticlegraph, params.id)
        if (deleteArticle === true) {
            let { getWriterArticles } = yield call(getWriterArticlesgraph, params.username)
            yield call(getArticlesFunction)
            yield put(deleteArticleActionSuccess({ data: getWriterArticles, toast: { type: "success", text: "Article Deleted!" } }))
        } else {
            Toast.show({
                text: "Something went wrong!",
                type: "danger",
                buttonText: "Okay",
                duration: 5000
            })
        }
    } catch ({ message }) {
        Toast.show({
            text: message,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        })
    }
}

function* publishArticleFunction({ params }) {
    try {
        let { publishArticle } = yield call(publishArticlegraph, params.id)
        if (publishArticle === true) {
            let { getWriterArticles } = yield call(getWriterArticlesgraph, params.username)
            yield call(getArticlesFunction)
            yield put(publishArticleActionSuccess({ data: getWriterArticles, toast: { type: "success", text: "Article Published!" } }))
        } else {
            Toast.show({
                text: "Something went wrong!",
                type: "danger",
                buttonText: "Okay",
                duration: 5000
            })
        }
    } catch ({ message }) {
        Toast.show({
            text: message,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        })
    }
}

function* updateArticleFunction({ params }) {
    try {
        let { editArticle } = yield call(updateArticlegraph, { id: params.id, text: params.text })
        if (editArticle) {
            let { getWriterArticles } = yield call(getWriterArticlesgraph, params.username)
            yield call(getArticlesFunction)
            yield put(updateArticleActionSuccess({ data: getWriterArticles, toast: { type: "success", text: "Article Published!" } }))
        } else {
            Toast.show({
                text: "Something went wrong!",
                type: "danger",
                buttonText: "Okay",
                duration: 5000
            })
        }
    } catch ({ message }) {
        Toast.show({
            text: message,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        })
    }
}


export function* getarticles() {
    yield takeEvery(GET_ARTICLES, getArticlesFunction)
}
export function* getArticleDetails() {
    yield takeEvery(GET_ARTICLE_DETAILS, getArticleDetailsFuntion)
}
export function* comment() {
    yield takeEvery(COMMENT, commentFunction)
}
export function* addArticle() {
    yield takeEvery(ADD_ARTICLE, addArticleFunction)
}
export function* getWriterArticles() {
    yield takeEvery(GET_WRITER_ARTICLES, getWriterArticlesFunction)
}
export function* deleteArticle() {
    yield takeEvery(DELETE_ARTICLE, deleteArticleFunction)
}
export function* publishArticle() {
    yield takeEvery(PUBLISH_ARTICLE, publishArticleFunction)
}
export function* updateArticle() {
    yield takeEvery(UPDATE_ARTICLE, updateArticleFunction)
}