import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Text, Header, Title, Body, Left, Icon, Button, Right, Textarea, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { Image, ScrollView, Alert, Keyboard } from 'react-native'
import NavigationService from '../../services/NavigationService';
import { getWriterArticlesAction, deleteArticleAction, publishArticleAction, updateArticleAction } from '../../redux/actions/articlesActions'
import { logoutAction } from '../../redux/actions/authActions'
import { Grid, Col, Row } from 'react-native-easy-grid'
import Footer from '../../components/footer'
import { baseURL } from '../../graphql/client'


class WriterArticles extends Component {

    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            showFooter: true
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow() {
        this.setState({ showFooter: false });
    }

    _keyboardDidHide() {
        this.setState({ showFooter: true });
    }

    componentDidMount() {
        this.props.getWriterArticlesAction(this.props.navigation.state.params.username)
    }

    render() {
        const { writerArticles, loading } = this.props
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' />
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Your Articles</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            NavigationService.navigate('AddArticle', {
                                username: this.props.navigation.state.params.username
                            })
                        }}>
                            <Icon name="add" />
                            <Text>Add Article</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {!loading ?
                        <ScrollView>
                            {writerArticles.map((article, index) => (
                                <Card style={{ flex: 0 }} key={index}>
                                    <CardItem>
                                        <Left>
                                            <Icon name="paper" />
                                            <Body>
                                                <Text>{article.name}</Text>
                                                <Text note>{new Date(article.meta.createdAt).toLocaleDateString()}</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Button transparent textStyle={{ color: '#87838B' }} onPress={() => { this.setState({ [index]: true }) }}>
                                                <Icon name="cog" />
                                                <Text>Edit Article</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Image source={{ uri: `${baseURL}/images` + article.picture }} style={{ height: 200, width: 350, flex: 1 }} />
                                            {!this.state[index] ?
                                                <Text style={{ padding: 10 }} >
                                                    {article.text}
                                                </Text> : (
                                                    <Grid>
                                                        <Row>
                                                            <Textarea rowSpan={5} bordered value={this.state['value' + index] || article.text} style={{ width: "100%" }} onChangeText={text => {
                                                                this.setState({ ['value' + index]: text })
                                                            }} />
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Button transparent onPress={() => {
                                                                    this.setState({ [index]: false }, () => {
                                                                        this.props.updateArticleAction({
                                                                            id: article._id,
                                                                            text: this.state['value' + index],
                                                                            username: this.props.navigation.state.params.username
                                                                        })
                                                                    })
                                                                }}><Text>Save</Text></Button>
                                                            </Col>
                                                            <Col>
                                                                <Button transparent onPress={() => { this.setState({ [index]: false, ['value' + index]: "" }) }}><Text>Cancel</Text></Button>
                                                            </Col>
                                                        </Row>
                                                    </Grid>
                                                )
                                            }
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button disabled={article.meta.published === true ? true : false} transparent textStyle={{ color: '#87838B' }} onPress={() => {
                                                Alert.alert(
                                                    'Are you sure?',
                                                    'Article will be Published!',
                                                    [
                                                        {
                                                            text: 'Cancel',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel',
                                                        },
                                                        { text: 'Yes', onPress: () => { this.props.publishArticleAction({ id: article._id, username: this.props.navigation.state.params.username }) } },
                                                    ],
                                                    { cancelable: false },
                                                )
                                            }}>
                                                {!article.meta.published && <Icon name="paper-plane" />}
                                                <Text>{!article.meta.published ? "Publish Article" : "Published!"}</Text>
                                            </Button>
                                        </Left>
                                        <Right>
                                            <Button transparent textStyle={{ color: '#87838B' }} onPress={() => {
                                                Alert.alert(
                                                    'Are you sure?',
                                                    'Article will be deleted!',
                                                    [
                                                        {
                                                            text: 'Cancel',
                                                            style: 'cancel',
                                                        },
                                                        { text: 'Yes', onPress: () => { this.props.deleteArticleAction({ id: article._id, username: this.props.navigation.state.params.username }) } },
                                                    ],
                                                    { cancelable: false },
                                                )
                                            }}>
                                                <Icon name="flame" />
                                                <Text>Delete Article</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                </Card>
                            ))}
                        </ScrollView>
                        :
                        <Content>
                            <Spinner />
                        </Content>
                    }
                </Content>
                {this.state.showFooter && <Footer
                    home={() => this.props.navigation.navigate('Home')}
                    myArticles={() => { }}
                    logout={() => this.props.logoutAction()}
                    role={this.props.navigation.state.params.role}
                />}
            </Container>
        )
    }
}

export default connect(state => state.articles, { getWriterArticlesAction, logoutAction, deleteArticleAction, publishArticleAction, updateArticleAction })(WriterArticles)