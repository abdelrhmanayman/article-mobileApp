import React from 'react'
import { Field } from 'redux-form'
import { renderInput, renderDropDown } from '../renderer'
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
        key="firstName"
        name="firstName"
        component={renderInput}
        labelText="First Name"
        iconName="person"
        validate={[required]}
    />,
    <Field
        key="lastName"
        name="lastName"
        component={renderInput}
        labelText="Last Name"
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
    />,
    <Field
    key="role"
    name="role"
    component={renderDropDown}
    labelText="Choose your role"
    validate={required}
    data={["WRITER", "USER"]}
    
/>
]