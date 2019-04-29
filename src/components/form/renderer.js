import React from 'react'
import { Icon, Item, Input, Label } from 'native-base'
import styles from './styles'

export const renderInput = ({ input, label, icon, secureTextEntry, meta: { touched, error } }) =>
    <Item floatingLabel style={[styles.line, touched && error ? styles.error : {}]}>
        <Icon name={icon} />
        <Label style={touched && error ? { color: "red" } : {}}>{touched && error ? error : label}</Label>
        <Input {...input} secureTextEntry={secureTextEntry} />
    </Item>