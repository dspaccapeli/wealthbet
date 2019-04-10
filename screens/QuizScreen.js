import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Text, View } from 'react-native'

import {devMode} from "../util";

import DevNavigationFooter from "../components/DevNavigationFooter"
import {Container} from "native-base";

import {cardStylesPresentation, cardStylesQuiz, styles} from "../styles/util";

import { Font } from 'expo';

// demo purposes only
function * range (start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}

export default class QuizScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionNumberTotal : 4,
            questionNumberActive : 1,
        }
    }

    updateActiveQuestion(){
        let newActiveQuestionNumber = this.state.questionNumberActive +1;
        this.setState({
            questionNumberActive : newActiveQuestionNumber,
        })
    }

    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <QuizHeader />
                <CardView navigation={this.props.navigation} question={this.state.questionNumberTotal} onSwipe={() => this.updateActiveQuestion()}/>
                <StatusDot number={this.state.questionNumberTotal} active={this.state.questionNumberActive}/>
                {NavigationFooter}
            </Container>

        );
    }
}

class StatusDot extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const numbers = Array.from({length: this.props.number}, (x, i) => i);
        let statusDot = numbers.map((i) => {
            if((i+1) === this.props.active){
                    return <View key={i} style={cardStylesQuiz.statusDotActive}/>
                }
                return <View key={i} style={cardStylesQuiz.statusDotInactive}/>
            }
        );
        return(
            <View style = {{
                backgroundColor: '#4D9E67',
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                {statusDot}
            </View>
        )

    }
}

class QuizHeader extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'poppins-extra-bold': require('../assets/fonts/Poppins-Bold.ttf'),
            'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
        });

        this.setState({ fontLoaded: true });
    };

    render() {
        return (
            <View style={styles.backgroundColor}>
                {
                    this.state.fontLoaded ? (
                        <Text style={{
                            fontFamily: "poppins-extra-bold",
                            fontSize: 30,
                            textAlign: "left",
                            marginLeft: 25,
                            marginRight: 25,
                            marginTop: 15,
                        }}>Quiz</Text>) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text note style={{
                            fontFamily: "poppins-medium",
                            fontSize: 17,
                            textAlign: "left",
                            marginLeft: 25,
                            marginRight: 25
                        }}>Answer these questions and we'll show you your future 🔮</Text>) : null
                }
            </View>
        );
    }
}

class CardView extends React.Component {
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
            <View style={cardStylesQuiz.card}>
                <Text style={cardStylesQuiz.text}>{card} - {index}</Text>
            </View>
        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`);
        this.props.onSwipe();
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
        this.props.navigation.navigate('Presentation');
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    render () {
        return (
            <View style={cardStylesQuiz.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={15}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={this.props.question}
                    backgroundColor={'#4D9E67'}
                    stackSeparation={15}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    overlayLabels={{
                        bottom: {
                            title: 'BLEAH',
                            style: {
                                label: {
                                    backgroundColor: '#20BF55',
                                    borderColor: '#20BF55',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        },
                        left: {
                            title: 'NOPE',
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
                            title: 'LIKE',
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
                        },
                        top: {
                            title: 'SUPER LIKE',
                            style: {
                                label: {
                                    backgroundColor: '#20BF55',
                                    borderColor: '#20BF55',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                >
                    {/*<Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />*/}
                </Swiper>
            </View>
        )
    }
}