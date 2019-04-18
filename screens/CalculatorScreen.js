import React, { Component } from 'react';
import {Container, Button, View, Text, Left, Right, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Slider} from "react-native"
import {styles} from "../styles/Common";
import {defaultFund} from "./FundScreen";
import {FundChart} from "../components/FundChart";
import {FundHeader} from "../components/FundHeader";
import DevNavigationFooter from "../components/DevNavigationFooter";
import {devMode} from "../util";
import apiManager from "../data/DataModel";
import {CalculatorStyle} from "../styles/CalculatorScreenStyle";
import FundCalculator from "../components/FundCalculator";

export default class CalculatorScreen extends Component {
    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container style={CalculatorStyle.fundContainer}>
                <View style={ styles.statusBar } />
                <H1 style={styles.screenTitle}>Calculator</H1>
                <FundHeader fund={defaultFund}/>
                <FundChart fund={defaultFund} screen={"Calculator"}/>
                <FundCalculator fund={defaultFund} navigation={this.props.navigation}/>
                {NavigationFooter}
            </Container>
        );
    }
}