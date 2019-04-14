import React, { Component } from 'react';
import {Container, Button, View, Content, Item, Label, Text, Input, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Slider} from "react-native"
import {styles} from "../styles/util";
import {FundChart, FundHeader, defaultFund} from "./FundScreen"
import DevNavigationFooter from "../components/DevNavigationFooter"
import {devMode} from "../util";

export default class CalculatorScreen extends Component {
    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <View style={ styles.statusBar } />
                <FundHeader fund = {defaultFund}/>
                <FundChart/>
                <FundCalculator navigation={this.props.navigation}/>
                {NavigationFooter}
            </Container>
        );
    }
}

class FundCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yearsPeriod: 3,
            initialDeposit: 500,
            monthlyDeposit: 25
        }
    }

    getReturn = () => {
      return this.state.yearsPeriod * (this.state.initialDeposit + this.state.monthlyDeposit * 12);
    };


    render () {
        return (
            <Container style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Grid>
                    <Row>
                        <Col><Text>Years</Text></Col>
                        <Col><Text>{this.state.yearsPeriod}</Text></Col>
                    </Row>
                    <Row>
                        <Slider
                            style={styles.slider}
                            step={1}
                            maximumValue={20}
                            onValueChange={(value) => this.setState({yearsPeriod: parseFloat(value)})}
                            value={this.state.yearsPeriod}
                        />
                    </Row>
                    <Row>
                        <Col><Text>Initial deposit:</Text></Col>
                        <Col><Text>{this.state.initialDeposit}</Text></Col>
                    </Row>
                    <Row>
                        <Slider
                            style={styles.slider}
                            step={100}
                            maximumValue={5000}
                            onValueChange={(value) => this.setState({initialDeposit: parseFloat(value)})}
                            value={this.state.initialDeposit}
                        />
                    </Row>
                    <Row>
                        <Col><Text>Monthly deposit</Text></Col>
                        <Col><Text>{this.state.monthlyDeposit}</Text></Col>
                    </Row>
                    <Row>
                        <Slider
                            style={styles.slider}
                            step={10}
                            maximumValue={100}
                            onValueChange={(value) => this.setState({monthlyDeposit: parseFloat(value)})}
                            value={this.state.monthlyDeposit}
                        />
                    </Row>
                    <Row>
                        <Col style={{ backgroundColor: '#00CE9F'}}><Text>Expected returns</Text></Col>
                        <Col style={{ backgroundColor: '#00FFFF'}}><Text>{this.getReturn()}</Text></Col>
                    </Row>
                </Grid>
                <Right>
                    <Button add onPress={() => this.props.navigation.navigate("Portfolio") }>
                        <Text>Buy</Text>
                    </Button>
                </Right>
            </Container>
        );
    }
}