import React, { Component } from 'react';
import { Container, View, DeckSwiper, Button, Content, Card, CardItem, Icon, Text, Right } from 'native-base';
import {styles} from "../styles/Common";
import {swiper, presentationStyle} from "../styles/PresentationScreenStyle";
import DevNavigationFooter from "../components/DevNavigationFooter"
import { devMode } from '../util.js';
import Swiper from 'react-native-deck-swiper'

import StatusDot from "../components/StatusDot";
import {FundHeader} from "../components/FundHeader";
import {FundChart} from "../components/FundChart";
import {FundDescription} from "../components/FundDescription";
import apiManager from "../data/DataModel";
import LoadingBar from "../components/Loading";

export default class PresentationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: "LOADING",
            fundsNumberTotal : 3,
            fundsNumberActive : 1,
            funds: [],
        }
    }

    updateActiveQuestion(direction){
        let newActiveQuestionNumber;

        if (direction === 'left'){
            if(this.state.fundsNumberActive === 3){
                newActiveQuestionNumber = 1;
            } else {
                newActiveQuestionNumber = this.state.fundsNumberActive +1;
            }
        } else {
            if(this.state.fundsNumberActive === 1){
                newActiveQuestionNumber = 3;
            } else {
                newActiveQuestionNumber = this.state.fundsNumberActive - 1;
            }
        }

        this.setState({
            fundsNumberActive : newActiveQuestionNumber,
        })
    }

    componentWillMount() {
        apiManager.getPresentationFunds()
            .then(value => {
                this.setState({
                    status: "LOADED",
                    fundsNumberTotal: value.totalNumber,
                    funds: value.funds
                });
            });
    }

    render () {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }

        let cardView =
            <View style={swiper.card}>
                <LoadingBar/>
            </View>;

        // TODO: test if this works
        if (this.state.status === "LOADED") {
            cardView = <FundSlideshow
                funds={this.state.funds}
                navigation={this.props.navigation}
                question={this.state.fundsNumberTotal}
                cardIndex={0}
                onSwipeLeft={() => this.updateActiveQuestion('left')}
                onSwipeRight={() => this.updateActiveQuestion('right')}
            />
        }

        return (
            <Container>
                <View style={ styles.statusBar } />
                <PresentationHeader/>
                <Content style={ styles.backgroundColor }>
                    {cardView}
                </Content>
                <StatusDot
                    number={this.state.fundsNumberTotal}
                    active={this.state.fundsNumberActive}
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
                    style={presentationStyle.header}>
                    These are the three stocks that we selected for you based on your quiz results.
                </Text>
            </View>
        );
    }
}

class SeeMoreButton extends Component {
    render () {
        return (
            <Right style={{ justifyContent: 'flex-end'}}>
                <Button seeMore
                        onPress={() => {
                            apiManager.updateScreen('Fund');
                            this.props.navigation.navigate("Fund")
                        }}
                        style={styles.seeMoreButton}>
                    <Text style={styles.seeMoreText}>SEE MORE</Text>
                    <Icon name="arrow-forward" />
                </Button>
            </Right>
        );
    }
}


class FundSlideshow extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cards: this.props.funds,
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        }
    }

    // TODO: test this
    renderCard = (card, index) => {
        let fund = this.state.cards[index];
        console.log(index);
        console.log(fund);
        return (
            <View style={swiper.card}>
                <FundHeader fund={fund}/>
                <FundChart fund={fund} screen={'Presentation'}/>
                <FundDescription fund={fund}/>
                <SeeMoreButton navigation = {this.props.navigation}/>
            </View>
        );
    };

    onSwiped = (type) => {
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
        apiManager.updateScreen('Presentation');
        this.props.navigation.navigate('Portfolio');
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
                    ref={swiper => {this.swiper = swiper}}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={this.swipeLeft}
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
