import React from 'react'
import { Icon, Item, Input, Text, Picker, Label, Thumbnail, Body, Button } from 'native-base'
import { TouchableOpacity } from 'react-native'

export const renderInput = ({ input, labelText, keyboardType, iconName, secureTextEntry, meta: { touched, error } }) =>
    <Item error={touched && error ? true : false}>
        <Icon name={iconName} />
        <Input {...input} secureTextEntry={secureTextEntry} placeholder={labelText} keyboardType={keyboardType} />
        {touched && error ? <Text>{error}</Text> : <Text />}
    </Item>
export const renderDropDown = ({ input, labelText, data, meta: { touched, error } }) =>
    <Item error={touched && error ? true : false}>
        <Icon name="transgender" />
        <Label>{labelText}</Label>
        <Picker
            {...input}
            mode="dropdown"
            selectedValue={input.value}
            onValueChange={value => input.onChange(value)}
        >
            {data.map(option =>
                <Picker.Item
                    key={option}
                    label={option}
                    value={option} />
            )}
        </Picker>
        {touched && error ? <Text>{error}</Text> : <Text />}
    </Item>

export const renderAvatar = ({ input, labelText, controller }) =>
    <Body>
        <TouchableOpacity onPress={controller}>
            {input.value.length > 1 ?
                <Thumbnail large source={{ uri: input.value }} /> :
                <Button rounded iconLeft onPress={controller}>
                    <Icon name="ios-contact" />
                    <Text>{labelText}</Text>
                </Button>
            }
        </TouchableOpacity>
    </Body>