import React, { Component } from 'react';
import { Container, View, DeckSwiper,  Header, Button, Body, Content, Card, CardItem, Thumbnail, Left, Icon, Text, Image, Right } from 'native-base';
import {styles} from "../styles/util";
import DevNavigationFooter from "../components/DevNavigationFooter"
import {FundChart, FundDescription, FundHeader} from "./FundScreen";

export default class PresentationScreen extends Component {
    render () {
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <PresentationHeader/>
                    <FundSlideshow navigation={this.props.navigation}/>
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }
}

class PresentationHeader extends Component {
    render () {
        return (
            <View style={{padding: 10}}>
                <Text>These are the funds that we selected for you. You can swipe through them. Click on one if you want to find out more.</Text>
            </View>
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
                                    <FundHeader/>
                                </CardItem>
                                <CardItem>
                                    <FundChart/>
                                </CardItem>
                                <CardItem>
                                    <FundDescription/>
                                </CardItem>
                                <CardItem>
                                    <FundWhy/>
                                </CardItem>
                                <CardItem footer>
                                    <SeeMoreButton navigation = {this.props.navigation}/>
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

class SeeMoreButton extends Component {
    render () {
        return (
            <Right>
                <Button seeMore onPress={() => this.props.navigation.navigate("Calculator") }>
                    <Text>See more</Text>
                    <Icon name="arrow-forward" />
                </Button>
            </Right>
        );
    }
}
