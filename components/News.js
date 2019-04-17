import apiManager from "../data/DataModel";
import {Linking, TouchableHighlight} from "react-native";
import {Body, Card, CardItem, Text} from "native-base";
import React from "react";

export class News extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            fundSymbol: this.props.fund.symbol,
            news: "",
            newsLink: ""
        }
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

    updateNews () {
        apiManager
            .getNews(this.props.fund.symbol)
            .then(data => {
                this.setState({
                    status: "LOADED",
                    fundSymbol: this.props.fund.symbol,
                    headline: data[0]["headline"],
                    news: data[0]["summary"],
                    newsLink: data[0]["url"],
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    componentDidMount() {
        this.updateNews();
    }

    componentWillReceiveProps(prevProps, prevState, snapshot) {
        if(prevProps.fundSymbol !== this.props.fund.symbol) {
            this.updateNews();
        }
    }

    render() {
        let news;
        let headline = "";
        switch (this.state.status) {
            case "LOADING":
                news = "...";
                break;
            case "LOADED":
                news = this.state.news;
                headline = this.state.headline;
                break;
            default:
                news = " ";
        }

        return (
            <TouchableHighlight onPress={this.onPress} underlayColor="white">
                <Card>
                    <CardItem header>
                        <Text>News {headline} </Text>
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
