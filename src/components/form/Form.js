import React from 'react'
import styles from './styles'
import { Form } from 'native-base'


export const LoginForm = () =>
    <Form style={styles.line}>
        {require('./fields/login').fields}
    </Form >

export const SignUpForm = () =>
    <Form style={styles.line}>
        {require('./fields/signUp').fields}
    </Form >
export const ForgetPasswordFrom = () =>
    <Form style={styles.line}>
        {require('./fields/forgetPassword').fields}
    </Form>

export const AccountForm = () =>
    <Form style={styles.line}>
        {require('./fields/account').fields}
    </Form>