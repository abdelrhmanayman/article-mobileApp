import React from 'react'
import { Field } from 'redux-form'
import { renderInput, renderTextArea, renderAvatar } from '../renderer'
import { required } from '../validator'

export const fields = ({imageChooser}) => [
    <Field
        key="name"
        name="name"
        component={renderInput}
        labelText="Article Name"
        validate={[required]}
    />,
    <Field
        key="text"
        name="text"
        component={renderTextArea}
        labelText="Enter article content .."
        validate={required}
        bordered={false}
    />,
    <Field
        key="avatar"
        name="avatar"
        component={renderAvatar}
        controller={imageChooser}
        labelText="Upload Article Picture"
        iconName="ios-contact"
    />
]