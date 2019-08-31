import gql from "graphql-tag";

export default class Queries {
    static get login() {
        return gql`
        query login($username: String!, $password: String!){
            login(username: $username, password: $password){
                _id
                name{
                    first
                    last
                }
                role
                username
            }
        }
        `
    }
    static get getArticles() {
        return gql`
        query getArticles {
            getArticles {
                name
                picture
                _id
            }
        }
        `
    }
    static get register() {
        return gql`
        mutation register($user: INPUT_USER!){
            register(user: $user){
                _id
            }
        }
        `
    }
    static get logout() {
        return gql`
        query logout{
            logout
        }
        `
    }
    static get getArticleDetails() {
        return gql`
        query getArticleDetails($id: String) {
            getArticleDetails(id: $id) {
                name
                picture 
                text
                meta{
                    publishedBy
                }
            }
        }
        `
    }
    static get getComments() {
        return gql`
            query getComments($articleId: String){
                getComments(articleId: $articleId){
                    user
                    comment
                }
            }
        `
    }
    static get comment() {
        return gql`
        mutation comment($userId: String!, $articleId: String, $comment: String!){
            comment(userId: $userId, articleId: $articleId, comment: $comment)
        }
        `
    }
    static get createArticle() {
        return gql`
            mutation createArticle($article: INPUT_ARTICLE){
                createArticle(article: $article)
            }
        `
    }
    static get getWriterArticles() {
        return gql`
        query getWriterArticles($username: String){
            getWriterArticles(username: $username){
                name
                text
                picture
                _id
                meta{
                    published
                    publishedAt
                    publishedBy
                    createdAt
                }
            }
        }
        `
    }
    static get deleteArticle() {
        return gql`
        mutation deleteArticle($id: String){
            deleteArticle(id: $id)
        }
        `
    }
    static get publishArticle() {
        return gql`
        mutation publishArticle($id: String){
            publishArticle(id: $id)
        }
        `
    }
    static get editArticle() {
        return gql`
        mutation editArticle($id: String, $text: String){
            editArticle(id: $id, text: $text)
        }
        `
    }
}