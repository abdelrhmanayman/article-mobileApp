import React, { Component } from 'react'
import { Container, Tab, Tabs, TabHeading, Icon, Text, Button, Footer, FooterTab, Badge } from 'native-base'
import Private from '../tabs/Private'
import Public from '../tabs/Public'
import Shared from '../tabs/Shared'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { loadNotificationsAction, loadAccountAction, loadHomeAction } from '../../redux/actions/tabsActions'
import Notifications from '../tabs/Notifications'
import Account from '../tabs/Account'

class Home extends Component {
    signOut = () => {
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }
    renderHome = () =>
        <Tabs>
            <Tab heading={
                <TabHeading>
                    <Icon name="globe" />
                    <Text>Public</Text>
                </TabHeading>
            }>
                <Public />
            </Tab>
            <Tab heading={
                <TabHeading>
                    <Icon name="people" />
                    <Text>Shared</Text>
                </TabHeading>
            }>
                <Shared />
            </Tab>
            <Tab heading={
                <TabHeading>
                    <Icon name="lock" />
                    <Text>Private</Text>
                </TabHeading>
            }>
                <Private />
            </Tab>
        </Tabs>

    render() {
        const { showAccount, showNotifications, showHome } = this.props
        return (
            <Container>
                {showHome && this.renderHome()}
                {showNotifications && <Notifications />}
                {showAccount && <Account />}
                <Footer>
                    <FooterTab>
                        <Button vertical active={showHome} onPress={() => this.props.loadHomeAction()}>
                            <Icon active={showHome} name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical badge active={showNotifications} onPress={() => this.props.loadNotificationsAction()}>
                            <Badge><Text>2</Text></Badge>
                            <Icon active={showNotifications} name='notifications' />
                            <Text>Updates</Text>
                        </Button>
                        <Button vertical active={showAccount} onPress={() => this.props.loadAccountAction()}>
                            <Icon active={showAccount} name='person' />
                            <Text>Account</Text>
                        </Button>
                        <Button vertical onPress={() => this.signOut()}>
                            <Icon name='log-out' />
                            <Text>Log out</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

export default connect(
    state => state.tabs,
    {
        loadNotificationsAction,
        loadHomeAction,
        loadAccountAction
    }
)(Home)