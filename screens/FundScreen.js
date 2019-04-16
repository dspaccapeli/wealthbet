// React
import React, { Component } from 'react';
import {TouchableHighlight, View, Linking} from 'react-native';

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
                    <FundDescription fund={fund}/>
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
        this.state = {
            fund: this.props.fund
        }
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>{this.state.fund.symbol}</Text>
                <Text>{this.state.fund.companyName}</Text>
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
                break;
            case "LOADED":
                data = this.state.data;
                /* temp work
                let i;
                let percentageBreadth = 0.2;
                let dataMin = data[0].value;
                for(i=0; i<data.length; i++){
                    if(data[i].value<dataMin){
                        dataMin = data[i].value;
                    }
                }
                let dataMax = data[0].value;
                for(i=0; i<data.length; i++){
                    if(data[i].value>dataMax){
                        dataMax = data[i].value;
                    }
                }
                let dataInterval = dataMax - dataMin;

                if(!(dataMin - (dataInterval*percentageBreadth))<=0){
                    dataMin -= (dataInterval*percentageBreadth);
                }

                dataMax += (dataInterval*percentageBreadth);
                this.setState({
                   dataMin = dataMin;
                   dataMax = dataMax
                });
                // end of temp work
                */
                break;
            case "ERROR":
                data = [{value: 10}, {value: 10}];
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

export class FundDescription extends  Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            description: "",
        }
    }

    componentDidMount() {
        apiManager
            .getDescription(this.props.fund.symbol)
            .then(data => {
                let description = "";
                if (data.description) {
                    description = data.description;
                }
                this.setState({
                    status: "LOADED",
                    description: description,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    render() {
        return (
            <View>
                <Text> Info </Text>
                <Text note> {this.state.description} </Text>
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
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            news: "",
        }
    }

    componentDidMount() {
        apiManager
            .getNews(this.props.fund.companyName)
            .then(data => {
                let currentNews = "No current news for you today!";
                let newsLink = "";
                if (data["articles"][0]["description"]) {
                    currentNews = data["articles"][0]["description"];
                    newsLink = data["articles"][0]["url"]
                }
                this.setState({
                    status: "LOADED",
                    news: currentNews,
                    newsLink: newsLink,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    goToURL = () => {
        let url = this.state.newsLink;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    };

    render() {
        let news;
        switch (this.state.status) {
            case "LOADING":
                news = loremIpsum;
                break;
            case "LOADED":
                news = this.state.news;
                break;
            case "ERROR":
                news = loremIpsum;
        }
        return (
            <TouchableHighlight onPress={this.onPress} underlayColor="white">
                <Card>
                    <CardItem header>
                        <Text>News</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text note>
                                { news }
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Text>Follow more </Text>
                        <Text onPress={this.goToURL} style={ {
                            color: '#0000EE',
                            fontWeight: 'bold'
                        }}>here.</Text>
                    </CardItem>
                </Card>
            </TouchableHighlight>
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