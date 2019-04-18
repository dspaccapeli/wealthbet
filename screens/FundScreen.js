// React
import React, { Component } from 'react';
import {View} from 'react-native';

// Native Base
import {Text, Button, Container, Content, Body} from 'native-base';

// Styles
import { styles } from "../styles/Common";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// Api manger
import apiManager from "../data/DataModel"
import {devMode} from "../util";
import {FundHeader} from "../components/FundHeader";
import {FundChart} from "../components/FundChart";
import {FundDescription} from "../components/FundDescription";
import {News} from "../components/News";
import {fundStyle} from "../styles/FundScreenStyle";

export const defaultFund = {
    symbol: "MSFT",
    companyName: "Microsoft Inc.",
    shares: 100,
    originalValue: 100,
    currentValue: 110,
};

//TODO: test the passing fund problems
export default class FundScreen extends Component {
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

        // Dev footer
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content style={styles.backgroundColor}>
                    <FundHeader fund={fund} screen={'Fund'} navigation={this.props.navigation}/>
                    <FundChart fund={fund} screen={'Fund'}/>
                    <View style={Object.assign({},{backgroundColor: styles.dimmerColor.color},{height: '100%'})}>
                        <View style={fundStyle.card}>
                            <FundDescription fund={fund} />
                            <News fund={fund} />
                        </View>
                        <Sell symbol={fund.symbol} navigation={this.props.navigation} />
                    </View>
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

class Sell extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.symbol
        }
    }

    sellFund = () => {
      apiManager.deleteFundFromPortfolio(this.state.symbol);
      apiManager.updateScreen('Calculator');
      this.props.navigation.navigate("Calculator");
    };

    render() {
        return (
            <Body>
                <Button seeMore
                        onPress={this.sellFund}
                        style={styles.seeMoreButton}>
                    <Text style={styles.seeMoreText}>BUY</Text>
                </Button>
            </Body>
        );
    }
}