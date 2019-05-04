import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner } from 'native-base'
import { LoginForm } from '../../components/form/Form'
import styles from '../styles'
import { loginAction } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

class Login extends Component {

    login(values) {
        this.props.loginAction(values)
    }

    render() {
        const { loading, handleSubmit } = this.props
        return (
            <Container style={styles.upperLine}>
                <Content>
                    <LoginForm />
                    <Button iconRight full rounded disabled={loading} style={styles.line} onPress={handleSubmit(this.login.bind(this))}>
                        <Text>Sign In</Text>
                        {loading ? <Spinner /> : <Icon name='log-in' />}
                    </Button>
                    <Button iconRight full rounded disabled={loading} style={styles.line} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text>Sign Up</Text>
                        <Icon name='person-add' />
                    </Button>
                    <Text style={{ padding: 10, alignSelf: "flex-end" }}
                        onPress={() => this.props.navigation.navigate('ForgetPassword')}>Forgot your password?</Text>
                </Content>
            </Container>
        )
    }
}

let LoginFormDecorated = reduxForm({
    form: "sign-in",
})(Login)

LoginFormDecorated = connect(
    state => state.auth,
    { loginAction }
)(LoginFormDecorated)

export default LoginFormDecorated