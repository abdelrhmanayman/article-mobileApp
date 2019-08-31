import React, { Component } from 'react'
import { Container, Content, Text, Header, Title, Body, Left, Icon, Button, Spinner } from 'native-base'
import { AddArticleForm } from '../../components/form/Form'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import ImagePicker from 'react-native-image-picker'
import { addArticleAction } from '../../redux/actions/articlesActions'
import { Image } from 'react-native'

class AddArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articlePicture: {}
        }
    }

    handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary(
            { noData: true },
            response => {
                if (response.uri) {
                    this.setState({ articlePicture: response })
                }

            })
    }

    submitArticle = values => {
        this.props.addArticleAction({ ...values, picture: this.state.articlePicture, username: this.props.navigation.state.params.username })
    }

    render() {
        const { handleSubmit, loading } = this.props

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
                        <Title>Add Article</Title>
                    </Body>
                </Header>
                <Content>
                    <AddArticleForm data={{ imageChooser: this.handleChoosePhoto }} />
                    {Object.keys(this.state.articlePicture).length > 0 && <Image source={this.state.articlePicture} style={{ height: 200, width: null, flex: 0.5, margin: 10 }} />}
                    <Body>
                        <Button rounded onPress={handleSubmit(this.submitArticle.bind(this))} style={{ marginTop: 20 }}>
                            <Text>Submit Article</Text>
                            {loading && <Spinner />}
                        </Button>
                    </Body>
                </Content>
            </Container>
        )
    }
}

let AddArticleFormDecorated = reduxForm({
    form: "add-article",
    enableReinitialize: true
})(AddArticle)

AddArticleFormDecorated =
    connect(state => state.articles, { addArticleAction })(AddArticleFormDecorated)

export default AddArticleFormDecorated

