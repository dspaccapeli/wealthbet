import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View } from 'react-native'
import {devMode} from "../util";

import DevNavigationFooter from "../components/DevNavigationFooter"
import {Container, Content} from "native-base";

import {cardStyles, styles} from "../styles/util";

import { Font } from 'expo';

// demo purposes only
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export default class Example extends Component {
  render() {
    let NavigationFooter;
    if (devMode) {
      NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
    }
    return (
        <Container style={ styles.underStatusBar }>
          <QuizHeader />
          <CardView navigation={this.props.navigation} />
          {NavigationFooter}
        </Container>

    );
  }
}

class QuizHeader extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'poppins-extra-bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    });

    this.setState({ fontLoaded: true });
  };

  render() {
    return (
        <View style={{backgroundColor: 'red'}}>
          {
            this.state.fontLoaded ? (
                <Text style={{
            fontFamily: "poppins-extra-bold",
            fontSize: 30,
            textAlign: "center",
            margin: 10
          }}>Quiz</Text>) : null
          }
          <Text note>We want to know more about you</Text>
        </View>
    );
  }
}

class CardView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
  }

  renderCard = (card, index) => {
    return (
        <View style={cardStyles.card}>
          <Text style={cardStyles.text}>{card} - {index}</Text>
        </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  render () {
    return (
        <View style={cardStyles.container}>
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
              cardVerticalMargin={30}
              renderCard={this.renderCard}
              onSwipedAll={this.onSwipedAllCards}
              stackSize={3}
              stackSeparation={15}
              overlayLabels={{
                bottom: {
                  title: 'BLEAH',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
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
                      backgroundColor: 'black',
                      borderColor: 'black',
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
                      backgroundColor: 'black',
                      borderColor: 'black',
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
                      backgroundColor: 'black',
                      borderColor: 'black',
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