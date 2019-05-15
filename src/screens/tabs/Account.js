import React, { Component } from 'react'
import { Container, ListItem, Text, Content, List, Body, Left, Button, Icon, Right, Spinner, Row } from 'native-base'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAccountAction } from '../../redux/actions/tabsActions'
import { AccountForm } from "../../components/form/Form"
import { uploadImageAction } from '../../redux/actions/tabsActions'
import ImagePicker from 'react-native-image-picker'

class Account extends Component {

    handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary(
            { noData: true },
            response => {
                if (response.uri)
                    this.props.uploadImageAction(response)
            })
    }
    update(value) {
        this.props.updateAccountAction(value)
    }
    render() {
        let { handleSubmit, loading } = this.props
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider icon>
                            <Left>
                                <Icon name="ios-contact" />
                            </Left>
                            <Body>
                                <Text>Profile Details</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Content>
                                <AccountForm data={{ imageChooser: this.handleChoosePhoto }} />
                                <Row>
                                    <Right>
                                        <Button
                                            iconRight rounded disabled={loading}
                                            onPress={handleSubmit(this.update.bind(this))}>
                                            <Text>Update</Text>
                                            {loading ? <Spinner /> : <Icon name='cloud-upload' />}
                                        </Button>
                                    </Right>
                                </Row>
                            </Content>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
let ProfileFormDecorated = reduxForm({
    form: "profile",
    enableReinitialize: true
})(Account)

ProfileFormDecorated = connect(
    state => state.tabs,
    { updateAccountAction, uploadImageAction }
)(ProfileFormDecorated)

export default ProfileFormDecorated