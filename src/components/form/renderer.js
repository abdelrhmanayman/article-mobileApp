import React from 'react'
import { Icon, Item, Input, Text, Picker, Label } from 'native-base'

export const renderInput = ({ input, labelText, iconName, secureTextEntry, meta: { touched, error } }) =>
    <Item error={touched && error ? true : false}>
        <Icon name={iconName} />
        <Input {...input} secureTextEntry={secureTextEntry} placeholder={labelText} />
        {touched && error ? <Text>{error}</Text> : <Text />}
    </Item>
export const renderDropDown = ({ input, labelText, data, meta: { touched, error } }) => {
    // alert(JSON.stringify(data))
    return <Item error={touched && error ? true : false}>
        <Label>Gender</Label>
        <Picker
            {...input}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={input.value}
            selectedValue={2}
            onValueChange={(value) => input.onChange(value)}
        >
            {data.map(option =>
                <Picker.Item
                    key={option.value}
                    label={option.value}
                    value={option.value} />)}
        </Picker>
        {touched && error ? <Text>{error}</Text> : <Text />}
    </Item>
}