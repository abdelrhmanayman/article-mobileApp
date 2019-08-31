import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Button, Icon, Text, Left, Right, Spinner } from 'native-base'
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { getArticlesAction } from '../../redux/actions/articlesActions'
import { logoutAction } from '../../redux/actions/authActions'
import { AsyncStorage, ScrollView } from 'react-native'
import NavigationService from '../../services/NavigationService'
import Footer from '../../components/footer'
import { baseURL } from '../../graphql/client'


var role = null
var userId = null
var username = null

class Home extends Component {
    signOut = () => {
        this.props.logoutAction()
    }

    componentDidMount() {
        this.props.getArticlesAction()
    }

    render() {
        const { articles, loading } = this.props.articles
        AsyncStorage.getItem('user').then(user => {
            role = JSON.parse(user).role
            userId = JSON.parse(user)._id
            username = JSON.parse(user).username
        })
        return (
            <Container>
                {!loading ?
                    <ScrollView>
                        {articles.map((article, index) =>
                            <Content key={index}>
                                <Card style={{ flex: 0 }}>
                                    <CardItem>
                                        <Image source={{ uri: `${baseURL}/images` + article.picture }} style={{ height: 200, width: null, flex: 1 }} />
                                    </CardItem>
                                    <CardItem style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{(article.name).toUpperCase()}</Text>
                                    </CardItem>
                                    <CardItem style={{ justifyContent: "center" }}>
                                        <Left>
                                            <Icon name="person" />
                                            <Text note>Created by <Text>{article.meta.publishedBy}</Text></Text>
                                        </Left>
                                        <Right>
                                            <Button transparent onPress={() => { NavigationService.navigate('ArticleDetails', { id: article._id, role, userId, username }) }}>
                                                <Text>See Details</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Content>
                        )}
                    </ScrollView>
                    :
                    <Content>
                        <Spinner />
                    </Content>
                }
                <Footer
                    home={() => { }}
                    myArticles={() => NavigationService.navigate('WriterArticles', { username, role })}
                    role={role}
                    logout={() => this.props.logoutAction()}
                />
            </Container>
        )
    }
}

export default connect(
    state => state,
    {
        logoutAction,
        getArticlesAction
    }
)(Home)