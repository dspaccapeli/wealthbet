import apiManager from "../data/DataModel";
import {Button, View, Left, Right, Text} from "native-base";
import {CalculatorStyle} from "../styles/CalculatorScreenStyle";
import {styles} from "../styles/Common";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Slider} from "react-native";
import React from "react";

export default class FundCalculator extends React.Component {
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

    buyFund = () => {
        let originalValue = this.state.initialDeposit;
        let currentValue = originalValue + 10; // simulate an increase of value
        let shares = 10; // simulate the number of shares
        apiManager.updateScreen('Portfolio');
        apiManager.addFundToPortfolio(symbol = this.props.fund.symbol, shares=shares, originalValue=originalValue, currentValue=currentValue);
        this.props.navigation.navigate("Portfolio");
    };


    render () {
        return (
            <View style={CalculatorStyle.fundContainer}>
                <Text style={{textAlign: "center"}}>Configure how much you want to buy from this stock!</Text>
                <Grid style={CalculatorStyle.gridStyle}>
                    <Row style={CalculatorStyle.infoRow}>
                        <Col><Left><Text>Years</Text></Left></Col>
                        <Col><Right><Text>{this.state.yearsPeriod}</Text></Right></Col>
                    </Row>
                    <Row style={CalculatorStyle.sliderRow}>
                        <Slider
                            style={CalculatorStyle.slider}
                            step={1}
                            minimumValue={minVals.year}
                            maximumValue={maxVals.year}
                            onValueChange={(value) => this.setState({yearsPeriod: parseFloat(value)})}
                            value={this.state.yearsPeriod}
                        />
                    </Row>
                    <Row style={CalculatorStyle.infoRow}>
                        <Col><Left><Text>Initial deposit</Text></Left></Col>
                        <Col><Right><Text>{this.state.initialDeposit}$</Text></Right></Col>
                    </Row>
                    <Row  style={CalculatorStyle.sliderRow}>
                        <Slider
                            style={CalculatorStyle.slider}
                            step={100}
                            minimumValue={minVals.initialDeposit}
                            maximumValue={maxVals.initialDeposit}
                            onValueChange={(value) => this.setState({initialDeposit: parseFloat(value)})}
                            value={this.state.initialDeposit}
                        />
                    </Row>
                    <Row style={CalculatorStyle.infoRow}>
                        <Col><Left><Text>Monthly deposit</Text></Left></Col>
                        <Col><Right><Text>{this.state.monthlyDeposit}$</Text></Right></Col>
                    </Row>
                    <Row  style={CalculatorStyle.sliderRow}>
                        <Slider
                            style={CalculatorStyle.slider}
                            step={10}
                            minimumValue={minVals.monthlyDeposit}
                            maximumValue={maxVals.monthlyDeposit}
                            onValueChange={(value) => this.setState({monthlyDeposit: parseFloat(value)})}
                            value={this.state.monthlyDeposit}
                        />
                    </Row>
                    <Row style={CalculatorStyle.sliderRow}>
                        <Col><Left><Text style={{fontWeight: 'bold'}}>Expected returns</Text></Left></Col>
                        <Col><Right><Text style={{fontWeight: 'bold'}}>{this.getReturn()}$</Text></Right></Col>
                    </Row>
                </Grid>
                <Right>
                    <Button style={styles.seeMoreButton} onPress={ this.buyFund} title="Buy fund">
                        <Text style={styles.seeMoreText}>Add to Portfolio</Text>
                    </Button>
                </Right>
            </View>
        );
    }
}

const maxVals = {
    year: 40,
    initialDeposit: 5000,
    monthlyDeposit: 250,
};

const minVals = {
    year: 1,
    initialDeposit: 100,
    monthlyDeposit: 10,
};