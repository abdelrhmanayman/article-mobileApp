import React from 'react'
import { Field } from 'redux-form'
import { renderInput } from '../renderer'
import { email, required } from '../validator'

export const fields = [
    <Field
        key="username"
        name="username"
        component={renderInput}
        labelText="Username"
        iconName="person"
        validate={[required]}
    />,
    <Field
        key="password"
        name="password"
        component={renderInput}
        labelText="Password"
        iconName="unlock"
        secureTextEntry={true}
        validate={required}
    />
]