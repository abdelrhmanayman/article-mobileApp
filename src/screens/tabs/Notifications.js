import React, { Component } from 'react'
import { Container, Button, Icon, Content, Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { loadNotificationsAction } from '../../redux/actions/tabsActions'
class Notifications extends Component {
    signUp(values) {
        this.props.signUpAction(values)
    }
    render() {
        const { loading, notifications } = this.props
        return (
            <Container>
                <Content>
                    {
                        // !isEmpty(listData)
                        //     ? map(listData, (data, i) => <ListItem key={i} {...data} />)
                        //     : 
                    }
                </Content>
            </Container >
        )
    }
}

export default connect(
    state => state.tabs
)(Notifications)