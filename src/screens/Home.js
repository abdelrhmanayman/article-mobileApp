import React, { Component } from 'react'
import { Text } from 'native-base'
import firebase from 'react-native-firebase'
export default class Home extends Component {
    componentDidMount(){
        firebase.auth().signOut()
    }
    render() {
        return (
            <Text>Home</Text>
        )
    }
}
