import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Text, View } from 'react-native'

import {devMode} from "../util";

import DevNavigationFooter from "../components/DevNavigationFooter"
import {Container, Content} from "native-base";

import {cardStylesQuiz, cardStyles, styles} from "../styles/util";

//import { Font } from 'expo';
import StatusDot from "../components/StatusDot";

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
                <Content style={ styles.backgroundColor }>
                    <CardView
                        navigation={this.props.navigation}
                        question={this.state.questionNumberTotal}
                        onSwipe={() => this.updateActiveQuestion()}
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

class QuizHeader extends Component {
    render() {
        return (
            <View style={styles.backgroundColor}>
                    <Text style={{
                            fontFamily: "poppins-extra-bold",
                            fontSize: 30,
                            textAlign: "left",
                            marginLeft: 25,
                            marginRight: 25,
                            marginTop: 15,
                        }}>Quiz</Text>
                    <Text note style={{
                            fontFamily: "poppins-medium",
                            fontSize: 17,
                            textAlign: "left",
                            marginLeft: 25,
                            marginRight: 25
                    }}>Answer these questions and we'll show you your future 🔮</Text>
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
                <Text style={cardStyles.text}>{card} - {index}</Text>
            </View>
        )
    };

    onSwiped = (type) => {
        //console.log(`on swiped ${type}`);
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