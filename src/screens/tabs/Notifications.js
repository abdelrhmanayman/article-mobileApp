import React, { Component } from 'react'
import { Container, Content, Text, List, ListItem, Left, Body, Right, Thumbnail, Icon, Col, Row } from 'native-base'
import { connect } from 'react-redux'
import { RefreshControl } from 'react-native'
import { loadNotificationsAction } from '../../redux/actions/tabsActions'
class Notifications extends Component {
    render() {
        const { loading, notifications } = this.props
        console.log(notifications, loading)
        return (
            <Container>
                <Content
                    contentContainerStyle={notifications.length === 0 ? { justifyContent: 'center', flex: 1 } : {}}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.props.loadNotificationsAction()} />}
                >
                    {loading ? null :
                        notifications.length > 0 ?
                            <List>
                                {notifications.map(notification =>
                                    <ListItem avatar>
                                        <Left>
                                            {notification.avatar ?
                                                <Thumbnail source={{ uri: notification.avatar }} /> :
                                                <Icon name="notifications" />}
                                        </Left>
                                        <Body>
                                            <Text>{notification.body.main}</Text>
                                            <Text note>{notification.body.note}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{notification.time}</Text>
                                        </Right>
                                    </ListItem>
                                )}
                            </List> :
                            <Text style={{ alignSelf: "center" }}>No Notifications</Text>
                    }
                </Content>
            </Container >
        )
    }
}

export default connect(
    state => state.tabs,
    { loadNotificationsAction }
)(Notifications)