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
import apiManager from "../DataModel"
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
            .getFund()
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
            <Container style={ styles.underStatusBar }>
                <Content>
                    <FundHeader fund={fund} />
                    <FundChart />
                    <FundStatistics />
                    <FundInfo />
                    <News />
                    <Sell />
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

export class FundHeader extends Component {
    constructor () {
        super ();
        this.fund = defaultFund;
    }
    render() {
        if (this.props.fund) {
            this.fund = this.props.fund;
        }
        return (
            <View>
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
                <ChartArea />
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
        };
    }

    // Here we make the API call for historical data for the chart.
    componentDidMount() {
        apiManager
            .getHistoricalData()
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

        const colors = [ '#8800cc'];
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
            <Segment style={{backgroundColor: '#8800cc'}}>
                <Button first>
                    <Text>6 months</Text>
                </Button>
                <Button>
                    <Text>YTD</Text>
                </Button>
                <Button>
                    <Text>5 years</Text>
                </Button>
                <Button last active>
                    <Text>All time</Text>
                </Button>
            </Segment>
        )
    }
}

export class FundStatistics extends  Component {
    render() {
        return (
            <Body>
            <Text> PUT 100 VALUE 200 GAIN 3%</Text>
            </Body>
        )
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
    render() {
        return (
            <Body>
            <Button><Text>Sell</Text></Button>
            </Body>
        );
    }
}

export const defaultFund = {
    symbol: "FBIFXXX",
    companyName: "Freedom Index 2020"
};