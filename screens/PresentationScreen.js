import React, { Component } from 'react';
import { Container, View, DeckSwiper, Button, Content, Card, CardItem, Icon, Text, Right } from 'native-base';
import {styles} from "../styles/Common";
import {swiper} from "../styles/PresentationScreenStyle";
import DevNavigationFooter from "../components/DevNavigationFooter"
import { devMode } from '../util.js';

import Swiper from 'react-native-deck-swiper'

import StatusDot from "../components/StatusDot";

import {FundHeader} from "../components/FundHeader";
import {FundChart} from "../components/FundChart";
import {FundDescription} from "../components/FundDescription";
import {defaultFund} from "./FundScreen";

export default class PresentationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionNumberTotal : 3,
            questionNumberActive : 1,
        }
    }

    updateActiveQuestion(direction){
        let newActiveQuestionNumber;

        if (direction === 'left'){
            if(this.state.questionNumberActive === 3){
                newActiveQuestionNumber = 1;
            } else {
                newActiveQuestionNumber = this.state.questionNumberActive +1;
            }
        } else {
            if(this.state.questionNumberActive === 1){
                newActiveQuestionNumber = 3;
            } else {
                newActiveQuestionNumber = this.state.questionNumberActive - 1;
            }
        }

        this.setState({
            questionNumberActive : newActiveQuestionNumber,
        })
    }

    render () {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <PresentationHeader/>
                <Content style={ styles.backgroundColor }>
                    <FundSlideshow
                        navigation={this.props.navigation}
                        question={this.state.questionNumberTotal}
                        cardIndex={0}
                        onSwipeLeft={() => this.updateActiveQuestion('left')}
                        onSwipeRight={() => this.updateActiveQuestion('right')}
                    />
                </Content>
                <StatusDot
                    number={this.state.questionNumberTotal}
                    active={this.state.questionNumberActive}
                />
                {NavigationFooter}
            </Container>
        );
    }
}

class PresentationHeader extends Component {
    render () {
        return (
            <View
                style={Object.assign({},{padding: 10}, styles.backgroundColor)}>
                <Text
                    style={{
                        fontFamily: "pp-medium",
                        fontSize: 15,
                        textAlign: "left",
                        marginTop: 5,
                        marginHorizontal: 15
                    }}>
                    These are the three stocks that we selected for you based on your quiz results.
                </Text>
            </View>
        );
    }
}

// TODO: replace this with the list of the selected funds
let cards = [1];

/*
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
*/

class SeeMoreButton extends Component {
    render () {
        return (
            <Right style={{ justifyContent: 'flex-end'}}>
                <Button seeMore
                        onPress={() => this.props.navigation.navigate("Calculator")}
                        style={{
                            backgroundColor: "#9e4d84",
                            marginVertical: 15,
                        }}>
                    <Text
                        style={{
                            marginHorizontal: 20,
                            fontFamily: "pp-regular",
                            fontSize: 15}}>SEE MORE</Text>
                    <Icon name="arrow-forward" />
                </Button>
            </Right>
        );
    }
}

// demo purposes only
function * range (start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}


class FundSlideshow extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cards: [...range(1, this.props.question)],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        }
    }

    renderCard = (card, index) => {
        return (
            <View style={swiper.card}>
                    <FundHeader fund={defaultFund}/>
                    <FundChart fund={defaultFund}/>
                    <FundDescription fund={defaultFund}/>
                    <SeeMoreButton navigation = {this.props.navigation}/>
            </View>
        )
        /*
        <View style={cardStylesPresentation.card}>
                <Text style={cardStyles.text}>{card} - {index}</Text>
            </View>
         */
    };

    onSwiped = (type) => {
        //console.log(`on swiped ${type}`);
        //console.log(this.state.cards);
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
        this.props.navigation.navigate('Presentation');
    };

    // Opposite parameters
    swipeRight = () => {
        this.props.onSwipeRight();

    };

    swipeLeft = () => {
        this.props.onSwipeLeft();
    };

    render () {
        return (
            <View style={swiper.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    //onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedLeft={this.swipeLeft}
                    //onSwipedRight={() => this.onSwiped('right')}
                    onSwipedRight={this.swipeRight}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={20}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={this.props.question}
                    backgroundColor={'#4D9E67'}
                    stackSeparation={15}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    infinite={true}
                    useViewOverflow={false}
                    swipeBackCard={true}
                    showSecondCard={false}
                    goBackToPreviousCardOnSwipeRight={true}
                    outputRotationRange={["0deg", "0deg", "0deg"]}
                >
                </Swiper>
            </View>
        )
    }
}
