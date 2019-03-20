import React, { Component } from 'react';
import { Container, View, Header, Button, Body, Content, Card, CardItem, Thumbnail, Left, Icon, Text, Image } from 'native-base';
import CardSilder from 'react-native-cards-slider';
import {styles} from "../styles/util";
import DevNavigationFooter from "../components/DevNavigationFooter"
import {FundChart, FundDescription} from "./FundScreen";

export default class PresentationScreen extends Component {
    render () {
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <Text>
                        These are the funds that we selected for you.
                    </Text>
                    <FundSlideshow/>
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }
}

class FundSlideshow extends Component{
    render() {
        return (
            <Container>
                <CardSilder style={{marginTop: 30}}>
                    <Card>
                        <CardItem>
                            <FundChart/>
                        </CardItem>
                        <CardItem>
                            <FundDescription/>
                        </CardItem>
                        <CardItem>
                            <FundWhy/>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <FundChart/>
                        </CardItem>
                        <CardItem>
                            <FundDescription/>
                        </CardItem>
                        <CardItem>
                            <FundWhy/>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <FundChart/>
                        </CardItem>
                        <CardItem>
                            <FundDescription/>
                        </CardItem>
                        <CardItem>
                            <FundWhy/>
                        </CardItem>
                    </Card>
                </CardSilder>
            </Container>
        );
    }
}

class FundWhy extends Component {
    render() {
        return (
            <View>
                <Text> Why? </Text>
                <Text note> This is a great fund! </Text>
            </View>
        );
    }
}