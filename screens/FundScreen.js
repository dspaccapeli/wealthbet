// React
import React, { Component } from 'react';
import { View } from 'react-native';

// Native Base
import { Text, Button, Container, Content, Card, CardItem, Body, Segment } from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// Chart
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// JS utils
import { loremIpsum } from "../constants/util"

// Api manger
import apiManager from "../data/DataModel"
import {devMode} from "../util";

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
    --- FundInfo
        |
        --- FundDescription
        |
        --- FundAlert
    |
    --- News
    |
    --- Sell
*/

export default class FundScreen extends Component {
    constructor () {
        super();
        this.state = {
            status: "LOADING",
        };
    }

    // Here we make the API call for fund information.
    componentDidMount() {
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
                <Content>
                    <FundHeader fund={fund} />
                    <FundChart fund={fund} />
                    <FundInfo fund={fund}/>
                    <FundStatistics fund={fund} />
                    <News fund={fund} />
                    <Sell symbol={fund.symbol}  navigation={this.props.navigation} />
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

export class FundHeader extends Component {
    constructor (props) {
        super (props);
        this.fund = defaultFund;
    }
    render() {
        if (this.props.fund) {
            this.fund = this.props.fund;
        }
        return (
            <View style={{padding: 10}}>
                <Text>{this.fund.symbol}</Text>
                <Text>{this.fund.companyName}</Text>
            </View>
        );
    }
}

export class FundChart extends  Component {
    render() {
        return (
            <View>
                <ChartArea symbol={this.props.fund.symbol}/>
                <TimeScale />
            </View>
        );
    }
}

class ChartArea extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            status: "LOADING",
            fundSymbol: this.props.symbol
        };
    }

    // Here we make the API call for historical data for the chart.
    componentDidMount() {
        apiManager
            .getHistoricalData(symbol = this.state.fundSymbol)
            .then(data => {
                this.setState({
                    status: "LOADED",
                    data: data,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    render() {
        let data;
        switch (this.state.status) {
            case "LOADING":
                data = [{value: 5}];
                // console.log("Data is loading");
                break;
            case "LOADED":
                data = this.state.data;
                break;
            case "ERROR":
                data = [{value: 10}, {value: 10}];
                // console.log("There is a problem in the data");
        }

        const colors = [ '#4D9E67', "#4D9E69", "#4D9E87" ];
        const keys   = [ 'value'];
        const svgs = [
            { onPress: () => console.log('apples') }
        ];

        return (
            <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={data}
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
            />
        )
    }
}

class TimeScale extends React.PureComponent {
    render() {
        return (
            <Segment style={{backgroundColor: '#4D9E67'}}>
                <Button first><Text>6 months</Text></Button>
                <Button><Text>YTD</Text></Button>
                <Button><Text>5 years</Text></Button>
                <Button last active><Text>All time</Text></Button>
            </Segment>
        )
    }
}

export class FundStatistics extends Component {
    computeGain = (fund) => {
        return ((fund.currentValue - fund.originalValue) / fund.originalValue) * 100;
    };

    render() {
        return (
            <Container>
                <Text>PUT</Text>
                <Text note>{this.props.fund.originalValue}</Text>
                <Text>VALUE</Text>
                <Text note>{this.props.fund.currentValue}</Text>
                <Text>GAIN</Text>
                <Text note>{apiManager.computeGain(this.props.fund)}%</Text>
            </Container>
        );
    }
}

export class FundInfo extends  Component {
    render() {
        return (
            <View>
                <FundDescription />
                <FundAlert />
            </View>
        );
    }
}

export class FundDescription extends  Component {
    render() {
        return (
            <View>
                <Text> Info </Text>
                <Text note> { loremIpsum } </Text>
            </View>
        );
    }
}

class FundAlert extends  Component {
    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>Important</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text note>
                            { loremIpsum }
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

class News extends  Component {
    render() {
        return (
            <View>
                <Text> News </Text>
                <Text note> { loremIpsum } </Text>
            </View>
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

export const defaultFund = {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    shares: 100,
    originalValue: 100,
    currentValue: 110,
};