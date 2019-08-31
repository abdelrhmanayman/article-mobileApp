import {
    GET_ARTICLES, GET_ARTICLES_FAILURE, GET_ARTICLES_SUCCESS,
    GET_ARTICLE_DETAILS, GET_ARTICLE_DETAILS_SUCCESS, GET_ARTICLE_DETAILS_FAILURE,
    COMMENT, COMMENT_SUCCESS, ADD_ARTICLE, ADD_ARTICLE_FAILURE, ADD_ARTICLE_SUCCESS,
    GET_WRITER_ARTICLES, GET_WRITER_ARTICLES_FAILURE, GET_WRITER_ARTICLES_SUCCESS,
    DELETE_ARTICLE, DELETE_ARTICLE_SUCCESS, PUBLISH_ARTICLE, PUBLISH_ARTICLE_SUCCESS,
    UPDATE_ARTICLE, UPDATE_ARTICLE_SUCCESS
} from './types'

export const getArticlesAction = () => ({
    type: GET_ARTICLES
})
export const getArticlesActionSuccess = params => ({
    type: GET_ARTICLES_SUCCESS,
    params
})
export const getArticlesActionFailure = params => ({
    type: GET_ARTICLES_FAILURE,
    params
})
export const getArticlesDetailsAction = params => ({
    type: GET_ARTICLE_DETAILS,
    params
})
export const getArticleDetailsActionSuccess = params => ({
    type: GET_ARTICLE_DETAILS_SUCCESS,
    params
})
export const getArticleDetailsActionFailure = params => ({
    type: GET_ARTICLE_DETAILS_FAILURE,
    params
})
export const commentAction = params => ({
    type: COMMENT,
    params
})
export const commentActionSuccess = params => ({
    type: COMMENT_SUCCESS,
    params
})
export const addArticleAction = params => ({
    type: ADD_ARTICLE,
    params
})
export const addArticleActionSuccess = params => ({
    type: ADD_ARTICLE_SUCCESS,
    params
})
export const addArticleActionFailure = params => ({
    type: ADD_ARTICLE_FAILURE,
    params
})
export const getWriterArticlesAction = params => ({
    type: GET_WRITER_ARTICLES,
    params
})
export const getWriterArticlesActionSuccess = params => ({
    type: GET_WRITER_ARTICLES_SUCCESS,
    params
})
export const getWriterArticlesActionFailure = params => ({
    type: GET_WRITER_ARTICLES_FAILURE,
    params
})
export const deleteArticleAction = params => ({
    type: DELETE_ARTICLE,
    params
})
export const deleteArticleActionSuccess = params => ({
    type: DELETE_ARTICLE_SUCCESS,
    params
})
export const publishArticleAction = params => ({
    type: PUBLISH_ARTICLE,
    params
})
export const publishArticleActionSuccess = params => ({
    type: PUBLISH_ARTICLE_SUCCESS,
    params
})
export const updateArticleAction = params => ({
    type: UPDATE_ARTICLE,
    params
})
export const updateArticleActionSuccess = params => ({
    type: UPDATE_ARTICLE_SUCCESS,
    params
})