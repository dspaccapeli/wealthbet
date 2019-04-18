import apiManager from "../data/DataModel";
import {Linking, TouchableHighlight, View} from "react-native";
import {Body, Card, CardItem, Text} from "native-base";
import React from "react";
import {styles} from "../styles/Common";

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
        if(prevProps.fund.symbol !== this.props.fund.symbol) {
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

        let backColor = {};
        let whiteText = {};

        if(this.props.screen === 'Fund'){
            backColor = {backgroundColor: styles.dimmerColor.color};
            whiteText = {color: "#ffffff"};
        }

        let title = {
            marginHorizontal: 25,
            marginTop: 5,
            fontFamily: "pp-medium",
            fontSize: 14
        };

        let heading = {
            marginHorizontal: 25,
            marginTop: 5,
            fontFamily: "pp-regular",
            fontSize: 14
        };

        let content = {
            marginHorizontal: 25,
            marginTop: 10,
            fontFamily: "pp-regular",
            fontSize: 13
        };

        return (
            <View style={backColor}>
                <Text style={Object.assign({}, title, whiteText)}>LATEST NEWS</Text>
                <Text onPress={this.goToURL} style={Object.assign({}, heading, whiteText)}>{headline}</Text>
                <Text note style={Object.assign({}, content, whiteText)}>{news} [...]</Text>
            </View>
        );
    }
}
/*
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
</TouchableHighlight>*/