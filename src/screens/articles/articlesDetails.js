import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text, Content, Tab, Tabs, TabHeading, List, ListItem, Body, Icon, Textarea, Form, Button, Spinner } from 'native-base'
import { Image, ScrollView, Keyboard } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { getArticlesDetailsAction, commentAction } from '../../redux/actions/articlesActions'
import { logoutAction } from '../../redux/actions/authActions'
import NavigationService from '../../services/NavigationService'
import Footer from '../../components/footer'
import { baseURL } from '../../graphql/client'


class ArticleDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: "",
            showFooter: true
        }
    }
    componentDidMount() {
        const { state: { params: { id } } } = this.props.navigation
        this.props.getArticlesDetailsAction(id)
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

    render() {
        const { articleDetails, loading } = this.props.articles

        return (
            <Container>
                <Content>
                    {articleDetails.name ?
                        <Tabs >
                            <Tab heading={<TabHeading><Text>Content</Text></TabHeading>}>
                                <ScrollView>
                                    <Grid>
                                        <Row>
                                            <Image style={{ height: 200, width: null, flex: 1 }} source={{ uri: `${baseURL}/images` + articleDetails.picture }} />
                                        </Row>
                                        <Row style={{ padding: 5 }}>
                                            <Col>
                                                <Text note>Published By : <Text>{articleDetails.meta.publishedBy}</Text></Text>
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: 20 }}>
                                            <Col>
                                                <Text>{articleDetails.text}</Text>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </ScrollView>
                            </Tab>
                            <Tab heading={<TabHeading><Text>Comments</Text></TabHeading>} >
                                {!loading ?
                                    <ScrollView>
                                        <List>
                                            {articleDetails.comments.map((comment, index) =>
                                                <ListItem key={index}>
                                                    <Body>
                                                        <Text style={{ padding: 5 }}><Icon name="person" />  {comment.user}</Text>
                                                        <Text note>{comment.comment}</Text>
                                                    </Body>
                                                </ListItem>
                                            )}
                                        </List >
                                        <Form style={{ padding: 20 }}>
                                            <Textarea rowSpan={5} value={this.state.comment} bordered placeholder="Write your Comment" onChangeText={text => { this.setState({ comment: text }) }} />
                                            <Button style={{ marginTop: 10 }} onPress={() => {
                                                this.props.commentAction({
                                                    articleId: this.props.navigation.state.params.id,
                                                    userId: this.props.navigation.state.params.userId,
                                                    comment: this.state.comment
                                                })
                                                this.setState({ comment: "" })
                                            }}><Text>Submit</Text></Button>
                                        </Form>
                                    </ScrollView>
                                    :
                                    <Content>
                                        <Spinner />
                                    </Content>
                                }
                            </Tab>
                        </Tabs>
                        :
                        <Spinner />
                    }
                </Content>
                {this.state.showFooter && <Footer
                    home={() => { NavigationService.navigate("Home") }}
                    myArticles={() => {
                        NavigationService.navigate('WriterArticles', {
                            username: this.props.navigation.state.params.username,
                            role: this.props.navigation.state.params.role
                        })
                    }}
                    logout={() => this.props.logoutAction()}
                    role={this.props.navigation.state.params.role}
                />
                }
            </Container>
        )
    }
}


export default connect(state => state, { getArticlesDetailsAction, logoutAction, commentAction })(ArticleDetails)
