import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class CalculatorScreen extends Component {
    render () {
        return (
            <Container>
                <Header>
                    Calculator
                </Header>
                <Content>
                    <Text>
                        Found 1 description
                    </Text>

                    <FundGraph>
                        // Graph image
                        // Time period navigator
                    </FundGraph>
                    <FundInfo>
                        // Info text
                        // Years input
                        // Investment input
                        // Expected return output
                        // * explanation
                    </FundInfo>
                    // Add to portofolio button


                </Content>
            </Container>
        );
    }
}