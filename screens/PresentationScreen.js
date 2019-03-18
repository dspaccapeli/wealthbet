import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class PresentationScreen extends Component {
    render () {
        return (
            <Container>
                <Header>
                    Presentation
                </Header>
                <Content>
                    <Text>
                        These are the funds that we selected for you.
                    </Text>

                    // FundsSlideShow
                    <FundsSlideShow>
                        // Fund image
                        // Fund info
                        // Fund why
                        // See more button
                    </FundsSlideShow>
                </Content>
            </Container>
        );
    }
}