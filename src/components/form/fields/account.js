import React from 'react'
import { Field } from 'redux-form'
import { renderInput, renderDropDown } from '../renderer'

export const fields = [
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
        data={[{
            value: "Male",
            icon: "man"
        },
        {
            value: "Female",
            icon: "woman"
        }]}
    />
]