import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Text, View } from 'react-native'

import {devMode} from "../util";

import DevNavigationFooter from "../components/DevNavigationFooter"
import {Container, Content} from "native-base";

import {styles} from "../styles/Common";
import {swiper} from "../styles/QuizScreenStyle";

import StatusDot from "../components/StatusDot";
import apiManager from "../data/DataModel";
import LoadingBar from "../components/Loading";

export default class QuizScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: "LOADING",
            questionNumberTotal : 4,
            questionNumberActive : 1,
            questions: [],
        }
    }

    updateActiveQuestion(){
        let newActiveQuestionNumber = this.state.questionNumberActive + 1;
        this.setState({
            questionNumberActive : newActiveQuestionNumber,
        })
    }

    componentWillMount() {
        apiManager.getQuiz()
            .then(value => {
                this.setState({
                    status: "LOADED",
                    questionNumberTotal: value.totalNumber,
                    questions: value.questions
                });
            });
    }

    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }

        let cardView =
            <View style={swiper.card}>
                <LoadingBar/>
            </View>;
        if (this.state.status === "LOADED") {
            cardView = <CardView
                navigation={this.props.navigation}
                questions={this.state.questions}
                onSwipe={() => this.updateActiveQuestion()}
            />;
        }

        return (
            <Container>
                <View style={ styles.statusBar } />
                <QuizHeader />
                <Content style={ styles.backgroundColor }>
                    {cardView}
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

class QuizHeader extends Component {
    render() {
        return (
            <View style={styles.backgroundColor}>
                    <Text style={{
                        fontFamily: "pp-extra-bold",
                        fontSize: 30,
                        textAlign: "left",
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 15
                        }}>Quiz
                    </Text>
                    <Text note style={{
                        fontFamily: "pp-medium",
                        fontSize: 17,
                        textAlign: "left",
                        marginLeft: 25,
                        marginRight: 0,
                        marginBottom: 10
                    }}>Answer these questions and we'll show you your future 🔮
                    </Text>
                    <View style={Object.assign({},{flexDirection: 'row', justifyContent: 'center'}, styles.screenWidth)}>
                        <Text note style={{
                            fontFamily: "pp-medium",
                            fontSize: 13,
                            marginLeft: 25,
                            marginRight: 25
                        }}>⬅ NO                                YES ➡
                        </Text>
                    </View>
            </View>
        );
    }
}

class CardView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cards: this.props.questions,
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        }
    }

    renderCard = (card, index) => {
        return (
            <View style={swiper.card}>
                <Text style={Object.assign({}, swiper.text, {
                    marginHorizontal: 20,
                    fontFamily: "pp-regular",
                    fontSize: 30})}>{this.props.questions[index]}</Text>
            </View>
        )
    };

    // Controls the actions from swipe
    // right: YES
    // left: NO
    onSwiped = (type) => {
        switch (type) {
            case 'right':
                apiManager.writeQuizAnswer("yes", this.state.cardIndex);
                break;
            case 'left':
                apiManager.writeQuizAnswer("no", this.state.cardIndex);
                break;
        }
        this.props.onSwipe();
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
        apiManager.updateScreen('Presentation');
        this.props.navigation.navigate('Presentation');
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    render () {
        return (
            <View style={swiper.container}>
                <Swiper
                    ref={swiper => {this.swiper = swiper}}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    cards={this.state.cards}
                    useViewOverflow={false}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={15}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={this.props.question}
                    backgroundColor={'#4D9E67'}
                    stackSeparation={15}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    overlayLabels={overlayLabels}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                >
                </Swiper>
            </View>
        )
    }
}

const overlayLabels = {
    left: {
        title: 'NO',
        style: {
            label: {
                backgroundColor: '#ea3232',
                borderColor: '#ea3232',
                color: 'white',
                borderWidth: 1
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
            }
        }
    },
    right: {
        title: 'YES',
        style: {
            label: {
                backgroundColor: '#20BF55',
                borderColor: '#20BF55',
                color: 'white',
                borderWidth: 1
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
            }
        }
    }
};