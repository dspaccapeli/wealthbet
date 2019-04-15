// React
import React, { Component } from 'react';
import {TouchableHighlight, View, Linking} from 'react-native';

// Native Base
import { Text, Button, Container, Content, Card, CardItem, Body, Segment } from 'native-base';

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