// React
import React, { Component } from 'react';
import {TouchableHighlight, View, Linking} from 'react-native';

// Native Base
import { Text, Button, Container, Content, Card, CardItem, Body } from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// JS utils
import { loremIpsum } from "../constants/util"

// Api manger
import apiManager from "../data/DataModel"
import {devMode} from "../util";
import {FundHeader} from "../components/FundHeader";
import {FundChart} from "../components/FundChart";
import {FundDescription} from "../components/FundDescription";
import {News} from "../components/News";

/* Structure

    FundScreen
    |
    --- FundHeader
    |
    --- FundChart
        |
        --- ChartArea
        |
        --- TimeScale
    |
    --- FundStatistics
    |
    --- FundDescription
    |
    --- News
    |
    --- Sell
*/

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
        console.log("FUND SCREEN");
        console.log(this.state);
        console.log(fund);

        // Dev footer
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }

        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content>
                    <View style={{padding: 10}}>
                        <Text>{fund.symbol}</Text>
                        <Text>{fund.companyName}</Text>
                    </View>

                    <FundChart fund={fund} />
                    <FundDescription fund={fund}/>
                    <News fund={fund} />
                    <Sell symbol={fund.symbol}  navigation={this.props.navigation} />
                    <BackToPortofolio navigation={this.props.navigation}/>
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
      this.props.navigation.navigate("Portfolio");
    };

    render() {
        return (
            <Body>
                <Button title="Sell fund" onPress={this.sellFund} style={{backgroundColor: "#4D9E67"}}><Text>Sell</Text></Button>
            </Body>
        );
    }
}

class BackToPortofolio extends React.Component {
    back = () => {
        this.props.navigation.navigate("Portfolio");
    };

    render() {
        return (
            <Body>
                <Button title="Sell fund" onPress={this.back} style={{backgroundColor: "#4D9E67"}}><Text>Back</Text></Button>
            </Body>
        );
    }
}

export const defaultFund = {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    shares: 100,
    originalValue: 100,
    currentValue: 110,
};