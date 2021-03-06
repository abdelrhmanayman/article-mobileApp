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
    
export const AddArticleForm = ({ data }) =>
    <Form style={styles.line} >
        {require('./fields/addArticle').fields(data)}
    </Form>