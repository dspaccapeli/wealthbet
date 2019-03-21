import React, { Component } from 'react';
import {Container, Button, View, Content, Form, Item, Label, Text, Input, Grid, Col, Right } from 'native-base';
import {styles} from "../styles/util";
import {FundChart, FundHeader, FundDescription, defaultFund} from "./FundScreen"
import DevNavigationFooter from "../components/DevNavigationFooter"


export default class CalculatorScreen extends Component {
    render() {
        return (
            <Container style={styles.underStatusBar}>
                <Content>
                    <FundHeader fund = {defaultFund}/>
                    <FundChart/>
                    <FundDescription/>
                    <FundCalculator navigation={this.props.navigation}/>
                </Content>
                {/*<DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>*/}
            </Container>
        );
    }
}

class FundCalculator extends Component {
    setPeriod(value) {
        this.period = value;
    }

    setInvestment (value) {
        this.investment = value;
    }

    render () {
        return (
            <View>
                <Form>
                    <Item years>
                        <Label>How many years?</Label>
                        <Input
                            onChangeText={(text) => this.setPeriod({text})}
                            value={this.period}
                        />
                    </Item>
                    <Item investment>
                        <Label>Investment</Label>
                        <Input
                            onChangeText={(text) => this.setInvestment({text})}
                            value={this.investment}
                        />
                    </Item>
                </Form>
                <Grid style={{padding: 10}}>
                    <Col><Text>Expected Return:</Text></Col>
                    <Col><Text>100$</Text></Col>
                </Grid>
                <Right>
                    <Button add onPress={() => this.props.navigation.navigate("Portfolio") }>
                        <Text>Add</Text>
                    </Button>
                </Right>
            </View>
        );
    }
}