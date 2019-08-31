import {
    GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLE_DETAILS,
    GET_ARTICLE_DETAILS_SUCCESS, COMMENT_SUCCESS, ADD_ARTICLE, ADD_ARTICLE_FAILURE, ADD_ARTICLE_SUCCESS,
    GET_WRITER_ARTICLES, GET_WRITER_ARTICLES_SUCCESS, GET_WRITER_ARTICLES_FAILURE, DELETE_ARTICLE_SUCCESS, PUBLISH_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_SUCCESS, DELETE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE, COMMENT
} from "../actions/types"
import { Toast } from 'native-base'

const initialState = {
    loading: false,
    articles: [],
    articleDetails: {},
    writerArticles: []
}

const articlesReducer = (state = initialState, action) => {
    if (action.params) {
        let { toast } = action.params
        if (toast)
            Toast.show({
                ...toast,
                buttonText: "Okay",
                duration: 5000
            })
    }

    switch (action.type) {
        case GET_ARTICLES:
            return { ...state, loading: true }

        case GET_ARTICLES_SUCCESS:
            return { ...state, articles: action.params.data, loading: false }

        case GET_ARTICLE_DETAILS:
            return { ...state, loading: true }
        case GET_ARTICLE_DETAILS_SUCCESS:
            return { ...state, loading: false, articleDetails: action.params.data }
        case COMMENT:
            return { ...state, loading: true }
        case COMMENT_SUCCESS:
            return { ...state, articleDetails: { ...state.articleDetails, comments: action.params.data }, loading: false }
        case ADD_ARTICLE:
            return { ...state, loading: true }
        case ADD_ARTICLE_SUCCESS:
            return { ...state, loading: false, writerArticles: action.params.data }
        case ADD_ARTICLE_FAILURE:
            return { ...state, loading: false }
        case GET_WRITER_ARTICLES:
            return { ...state, loading: true }
        case GET_WRITER_ARTICLES_SUCCESS:
            return { ...state, loading: false, writerArticles: action.params.data }
        case GET_WRITER_ARTICLES_FAILURE:
            return { ...state, loading: false }
        case DELETE_ARTICLE:
            return { ...state, loading: true }
        case DELETE_ARTICLE_SUCCESS:
            return { ...state, writerArticles: action.params.data, loading: false }
        case PUBLISH_ARTICLE:
            return { ...state, loading: true }
        case PUBLISH_ARTICLE_SUCCESS:
            return { ...state, writerArticles: action.params.data, loading: false }
        case UPDATE_ARTICLE:
            return { ...state, loading: true }
        case UPDATE_ARTICLE_SUCCESS:
            return { ...state, writerArticles: action.params.data, loading: false }
        default:
            return { ...state }
    }
}

export default articlesReducer