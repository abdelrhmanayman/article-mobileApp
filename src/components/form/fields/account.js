import React from 'react'
import { Field } from 'redux-form'
import { renderInput, renderDropDown, renderAvatar } from '../renderer'

export const fields = ({ imageChooser }) => [
    <Field
        key="avatar"
        name="avatar"
        component={renderAvatar}
        controller={imageChooser}
        labelText="Upload your avatar"
        iconName="ios-contact"
    />,
    <Field
        key="firstname"
        name="firstname"
        component={renderInput}
        labelText="First Name"
        iconName="person"
    />,
    <Field
        key="lastname"
        name="lastname"
        component={renderInput}
        labelText="Last Name"
        iconName="person"
    />,
    <Field
        key="gender"
        name="gender"
        labelText="Gender"
        component={renderDropDown}
        data={["Male", "Female"]}
    />,
    <Field
        key="age"
        name="age"
        labelText="Age"
        keyboardType="numeric"
        iconName="clock"
        component={renderInput}
    />
]