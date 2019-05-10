import React, { Component } from 'react'
import { Container, ListItem, Text, Content, List, Body, Left, Button, Icon, Right, Spinner, Row } from 'native-base'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAccountAction } from '../../redux/actions/tabsActions'
import { AccountForm } from "../../components/form/Form"
class Account extends Component {
    componentDidMount() {
        console.log("Account")
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
                                <AccountForm />
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
                        <ListItem itemDivider>
                            <Text>App Settings</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Bradley Horowitz</Text>
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
    { updateAccountAction }
)(ProfileFormDecorated)

export default ProfileFormDecorated