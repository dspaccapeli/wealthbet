import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterTabsIconTextExample extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Presentation')}
                    >
                        <Icon name="ios-list" />
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Calculator')}
                    >
                        <Icon name="ios-calculator" />
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Quiz')}
                    >
                        <Icon name="md-help" />
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Portfolio')}
                    >
                        <Icon name="md-briefcase" />
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Fund')}
                    >
                        <Icon name="md-analytics" />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}