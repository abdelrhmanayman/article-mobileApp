import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner } from 'native-base'
import { ForgetPasswordFrom } from '../../components/form/Form'
import styles from '../styles'
import { forgetPasswordAction } from '../../actions/authActions'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

class ForgetPassword extends Component {

    forgetPassword(values) {
        this.props.forgetPasswordAction(values)
    }

    render() {
        const { loading, handleSubmit } = this.props
        return (
            <Container style={styles.upperLine}>
                <Content>
                    <ForgetPasswordFrom style={[styles.line, styles.upperLine]} />
                    <Button iconRight full rounded disabled={loading}
                        style={[styles.line, styles.upperLine]}
                        onPress={handleSubmit(this.forgetPassword.bind(this))}>
                        <Text>Send Verification Email</Text>
                        {loading ? <Spinner /> : <Icon name='arrow-forward' />}
                    </Button>
                </Content>
            </Container>
        )
    }
}

let forgetPasswordFormDecorated = reduxForm({
    form: "forget-password",
})(ForgetPassword)

forgetPasswordFormDecorated = connect(
    state => state.auth,
    { forgetPasswordAction }
)(forgetPasswordFormDecorated)

export default forgetPasswordFormDecorated