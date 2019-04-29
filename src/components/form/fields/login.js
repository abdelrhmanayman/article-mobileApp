import React from 'react'
import { Field } from 'redux-form'
import { renderInput } from '../renderer'
import { email, required } from '../validator'

export const fields = [
    <Field
        key="email"
        name="email"
        component={renderInput}
        label="Email Address"
        icon="ios-person"
        validate={[required, email]}
    />,
    <Field
        key="password"
        name="password"
        component={renderInput}
        label="Password"
        icon="ios-unlock"
        secureTextEntry={true}
        validate={required}
    />
]