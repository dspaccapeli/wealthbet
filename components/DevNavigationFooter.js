import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterTabsIconTextExample extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Quiz')}
                    >
                        <Icon name="md-help" />
                        <Text>Quiz</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Portfolio')}
                    >
                        <Icon name="md-briefcase" />
                        <Text>Portfolio</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('Fund')}
                    >
                        <Icon name="md-analytics" />
                        <Text>Fund</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}