import React, { Component } from 'react';
import { Container, View, DeckSwiper,  Header, Button, Body, Content, Card, CardItem, Thumbnail, Left, Icon, Text, Image } from 'native-base';
import {styles} from "../styles/util";
import DevNavigationFooter from "../components/DevNavigationFooter"
import {FundChart, FundDescription} from "./FundScreen";

export default class PresentationScreen extends Component {
    render () {
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <PresentationHeader/>
                    <FundSlideshow/>
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }
}

class PresentationHeader extends Component {
    render () {
        return (
            <Text>These are the fund that we selected for you.</Text>
        );
    }
}

// TODO: replace this with the list of the selected funds
let cards = [1];

class FundSlideshow extends Component {
    render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
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
                        }
                    />
                </View>
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