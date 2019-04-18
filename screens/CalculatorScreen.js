import React, { Component } from 'react';
import {Container, Content, View, Text} from 'native-base';
import {styles} from "../styles/Common";
import {defaultFund} from "./FundScreen";
import {FundChart} from "../components/FundChart";
import {FundHeader} from "../components/FundHeader";
import DevNavigationFooter from "../components/DevNavigationFooter";
import {devMode} from "../util";
import apiManager from "../data/DataModel";
import {fundStyle} from "../styles/FundScreenStyle";
import FundCalculator from "../components/FundCalculator";

export default class CalculatorScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
        };
    }

    updateFund () {
        apiManager
            .getCurrentFund()
            .then(fund => {
                this.setState({
                    status: "LOADED",
                    fund: {
                        symbol: fund.symbol,
                        companyName: fund.companyName
                    }
                })
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    // Here we make the API call for fund information.
    componentDidMount() {
        this.updateFund();
        apiManager.addObserver(this);
    }

    componentWillUnmount() {
        apiManager.removeObserver(this);
    }

    update (observer, changeDetails) {
        if(changeDetails === "fund") {
            this.updateFund();
        }
    }

    render() {
        let fund = defaultFund;
        if (this.state.status === "LOADED") {
            fund = this.state.fund;
        }

        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content style={styles.backgroundColor}>
                    <FundHeader fund={fund} screen={"Calculator"} navigation={this.props.navigation}/>
                    <FundChart fund={fund} screen={"Calculator"}/>
                    <View style={Object.assign({},{backgroundColor: styles.dimmerColor.color},{height: '100%'})}>
                        <View style={Object.assign({}, fundStyle.card, {paddingHorizontal: 20, paddingTop: 20})}>
                            <FundCalculator fund={fund} navigation={this.props.navigation}/>
                        </View>
                    </View>
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}