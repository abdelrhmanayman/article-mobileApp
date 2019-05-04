import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner } from 'native-base'

export default class Notifications extends Component {

    signUp(values) {
        this.props.signUpAction(values)
    }
    render() {
        const { loading, notifications } = this.props
        console.log(notifications)
        return (
            <Container>
                <Content>
                    {loading && <Spinner />}
                </Content>
            </Container>
        )
    }
}