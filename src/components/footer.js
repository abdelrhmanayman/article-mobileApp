import React from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'

const FooterComponent = ({ home, role, logout, myArticles }) =>
    <Footer>
        <FooterTab>
            <Button vertical onPress={() => home()}>
                <Icon name="home" />
                <Text>Home</Text>
            </Button>
            {role === "WRITER" && <Button vertical onPress={() => myArticles()}>
                <Icon name='person' />
                <Text>My Articles</Text>
            </Button>}
            <Button vertical onPress={() => logout()}>
                <Icon name='log-out' />
                <Text>Log out</Text>
            </Button>
        </FooterTab>
    </Footer>

export default FooterComponent