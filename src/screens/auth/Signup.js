import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner } from 'native-base'
import styles from '../styles'
import { SignUpForm } from '../../components/form/Form'
import { signUpAction } from '../../actions/authActions'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

class SignUp extends Component {

    signUp(values) {
        this.props.signUpAction(values)
    }
    render() {
        const { loading, handleSubmit } = this.props
        return (
            <Container style={styles.upperLine}>
                <Content>
                    <SignUpForm />
                    <Button iconRight full rounded disabled={loading} style={styles.line} onPress={handleSubmit(this.signUp.bind(this))}>
                        <Text>Sign Up</Text>
                        {loading ? <Spinner /> : <Icon name='arrow-forward' />}
                    </Button>
                </Content>
            </Container>
        )
    }
}

let SignUpFormDecorated = reduxForm({
    form: "sign-up",
})(SignUp)

SignUpFormDecorated = connect(
    state => state.auth,
    { signUpAction }
)(SignUpFormDecorated)

export default SignUpFormDecorated