import React, { Component } from 'react';
import {Container, Button, View, Content, Item, Label, Text, Input, Left, Right, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Slider} from "react-native"
import {styles} from "../styles/util";
import {FundChart, FundHeader, defaultFund} from "./FundScreen"
import DevNavigationFooter from "../components/DevNavigationFooter"
import {devMode} from "../util";
import apiManager from "../data/DataModel";

export default class CalculatorScreen extends Component {
    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <View style={ styles.statusBar } />
                <H1 style={{textAlign: 'center', alignSelf: 'center'}}>Calculator</H1>
                <FundHeader fund={defaultFund}/>
                <FundChart fund={defaultFund}/>
                <FundCalculator fund={defaultFund} navigation={this.props.navigation}/>
                {NavigationFooter}
            </Container>
        );
    }
}

class FundCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fund: this.props.fund,
            yearsPeriod: 3,
            initialDeposit: 500,
            monthlyDeposit: 25
        }
    }

    getReturn = () => {
      return this.state.yearsPeriod * (this.state.initialDeposit + this.state.monthlyDeposit * 12);
    };

    buyFund = () => {
        let originalValue = this.state.initialDeposit;
        let currentValue = originalValue + 10; // simulate an increase of value
        let shares = 10; // simulate the number of shares
        console.log("bought fund:" ,this.state.fund.symbol);
        apiManager.addFundToPortfolio(symbol =this.state.fund.symbol, shares=shares, originalValue=originalValue, currentValue=currentValue);
        this.props.navigation.navigate("Portfolio");
    };


    render () {
        return (
            <Container style={{ flex: 1, alignItems: 'stretch', justifyContent: "center" }}>
                <Grid style={{padding: 30}}>
                    <Row>
                        <Col><Left><Text>Years</Text></Left></Col>
                        <Col><Right><Text>{this.state.yearsPeriod}</Text></Right></Col>
                    </Row>
                    <Row style={{padding: 10, justifyContent: "center"}}>
                        <Slider
                            style={styles.slider}
                            step={1}
                            maximumValue={20}
                            onValueChange={(value) => this.setState({yearsPeriod: parseFloat(value)})}
                            value={this.state.yearsPeriod}
                        />
                    </Row>
                    <Row>
                        <Col><Left><Text>Initial deposit</Text></Left></Col>
                        <Col><Right><Text>{this.state.initialDeposit}$</Text></Right></Col>
                    </Row>
                    <Row  style={{padding: 10, justifyContent: "center"}}>
                        <Slider
                            style={styles.slider}
                            step={100}
                            maximumValue={5000}
                            onValueChange={(value) => this.setState({initialDeposit: parseFloat(value)})}
                            value={this.state.initialDeposit}
                        />
                    </Row>
                    <Row>
                        <Col><Left><Text>Monthly deposit</Text></Left></Col>
                        <Col><Right><Text>{this.state.monthlyDeposit}$</Text></Right></Col>
                    </Row>
                    <Row  style={{padding: 10, justifyContent: "center"}}>
                        <Slider
                            style={styles.slider}
                            step={10}
                            maximumValue={100}
                            onValueChange={(value) => this.setState({monthlyDeposit: parseFloat(value)})}
                            value={this.state.monthlyDeposit}
                        />
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col><Left><Text style={{fontWeight: 'bold'}}>Expected returns</Text></Left></Col>
                        <Col><Right><Text style={{fontWeight: 'bold'}}>{this.getReturn()}$</Text></Right></Col>
                    </Row>
                </Grid>
                <Right>
                    <Button style={{backgroundColor: "#4D9E67"}} onPress={this.buyFund} title="Buy fund">
                        <Text>Buy</Text>
                    </Button>
                </Right>
            </Container>
        );
    }
}