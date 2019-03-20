import React, { Component } from 'react';
import {Container, Button, Content, Form, Item, Label, Text, Input, Grid, Col } from 'native-base';
import {styles} from "../styles/util";
import {FundChart, FundHeader, FundDescription} from "./FundScreen"
import DevNavigationFooter from "../components/DevNavigationFooter"

export default class CalculatorScreen extends Component {
    render() {
        return (
            <Container style={styles.underStatusBar}>
                <Content>
                    <FundHeader/>
                    <FundChart/>
                    <FundDescription/>
                    <FundCalculator />
                    <Button><Text>Add to portofolio</Text></Button>
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }
}

class FundCalculator extends Component {
    render () {
        return (
            <Form>
                <Item years>
                    <Label>How many years?</Label>
                    <Input/>
                </Item>
                <Item investment>
                    <Label>Investment</Label>
                    <Input/>
                </Item>
                <Item>
                    <Grid>
                        <Col><Text>Expected Return:</Text></Col>
                        <Col><Text>100$</Text></Col>
                    </Grid>
                </Item>
            </Form>
        );
    }
}