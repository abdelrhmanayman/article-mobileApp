import React from 'react'
import { Field } from 'redux-form'
import { renderInput } from '../renderer'
import { email, required } from '../validator'

export const fields = [
    <Field
        key="email"
        name="email"
        component={renderInput}
        labelText="Email Address"
        iconName="person"
        validate={[required, email]}
    />
]