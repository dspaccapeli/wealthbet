import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {styles} from "../styles/util";
import DevNavigationFooter from "./PortfolioScreen";

export default class CalculatorScreen extends Component {
    render () {
        return (
            <Container style={ styles.underStatusBar }>
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
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }
}