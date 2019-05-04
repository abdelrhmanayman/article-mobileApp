import React, { Component } from 'react'
import { Container, Tab, Tabs, TabHeading, Icon, Text, Header, Right, Button, ActionSheet, Left, Footer, FooterTab } from 'native-base'
import Private from '../tabs/Private'
import Public from '../tabs/Public'
import Shared from '../tabs/Shared'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { loadNotificationsAction, loadAccountAction, loadHomeAction } from '../../redux/actions/tabsActions'
import Notifications from '../tabs/Notifications'
import Account from '../tabs/Account'

class Home extends Component {
    actionTaken = (index) => {
        switch (index) {
            case 0:
                this.props.loadAccountAction()
                break
            case 1:
                firebase.auth().signOut()
                this.props.navigation.navigate('Login')
                break
        }
    }

    showMenu = () =>
        ActionSheet.show(
            {
                options: [
                    { text: "Account", icon: "contact" },
                    { text: "Sign out", icon: "log-out" },
                ]
            },
            this.actionTaken
        )
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
        const { notifications, showAccount, showNotifications, showHome } = this.props
        return (
            <Container>
                {showHome && this.renderHome()}
                {showNotifications && <Notifications />}
                {showAccount && <Account />}
                <Footer>
                    <FooterTab>
                        <Button active={showHome} onPress={() => this.props.loadHomeAction()}>
                            <Icon active={showHome} name="home" />
                        </Button>
                        <Button active={showNotifications} onPress={() => this.props.loadNotificationsAction()}>
                            <Icon active={showNotifications} name='notifications' />
                        </Button>
                        <Button active={showAccount} onPress={this.showMenu}>
                            <Icon active={showAccount} name='person' />
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