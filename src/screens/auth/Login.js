import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner, Body } from 'native-base'
import { LoginForm } from '../../components/form/Form'
import styles from '../styles'
import { loginAction } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Image } from 'react-native'

const logo = require('../../assets/logo.png')

class Login extends Component {

    login(values) {
        this.props.loginAction({ params: values, props: this.props })
    }

    render() {
        const { loading, handleSubmit } = this.props
        return (
            <Container style={styles.upperLine}>
                <Content>
                    <Body>
                        <Image source={logo} style={{ height: 200, width: 200 }} />
                    </Body>
                    <LoginForm />
                    <Button iconRight full rounded disabled={loading} style={styles.line} onPress={handleSubmit(this.login.bind(this))}>
                        <Text>Sign In</Text>
                        {loading ? <Spinner /> : <Icon name='log-in' />}
                    </Button>
                    <Button iconRight full rounded disabled={loading} style={styles.line} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text>Sign Up</Text>
                        <Icon name='person-add' />
                    </Button>
                </Content>
            </Container>
        )
    }
}

let LoginFormDecorated = reduxForm({
    form: "sign-in",
    enableReinitialize: true
})(Login)

LoginFormDecorated = connect(
    state => state.auth,
    { loginAction }
)(LoginFormDecorated)

export default LoginFormDecorated