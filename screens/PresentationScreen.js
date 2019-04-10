import React, { Component } from 'react';
import { Container, View, DeckSwiper, Button, Content, Card, CardItem, Icon, Text, Right } from 'native-base';
import {cardStylesPresentation, styles} from "../styles/util";
import DevNavigationFooter from "../components/DevNavigationFooter"
import {FundChart, FundDescription, FundHeader} from "./FundScreen";

import { devMode } from '../util.js';

import Swiper from 'react-native-deck-swiper'

export default class PresentationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionNumberTotal : 4,
        };
    }

    render () {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content style={ styles.backgroundColor }>
                    <PresentationHeader/>
                    <FundSlideshow navigation={this.props.navigation} question={this.state.questionNumberTotal}/>
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

class PresentationHeader extends Component {
    render () {
        return (
            <View style={Object.assign({},{padding: 10}, styles.backgroundColor)}>
                <Text>These are the funds that we selected for you. You can swipe through them. Click on one if you want to find out more.</Text>
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
            <View style={cardStylesPresentation.card}>
                <Text style={cardStylesPresentation.text}>{card} - {index}</Text>
            </View>
        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`);
    };

    onSwipedLeft(type){
        this.swiper.swipeBack();
    }

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
            <View style={cardStylesPresentation.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')} //this.onSwipedLeft('left')
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
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
                    swipeBackCard={true}
                    showSecondCard={false}
                    goBackToPreviousCardOnSwipeLeft
                    outputRotationRange={["1deg", "0deg", "1deg"]}
                >
                </Swiper>
            </View>
        )
    }
}


/*
class FundSlideshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    mainExample(number, title) {
        const {slider1ActiveSlide} = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={false}
                    loopClonesPerSide={2}
                    autoplay={false}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    render () {
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                        translucent={true}
                        backgroundColor={'rgba(0, 0, 0, 0.3)'}
                        barStyle={'light-content'}
                    />
                    <ScrollView
                        style={styles.scrollview}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}
                    >
                        { example1 }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
];
const SLIDER_1_FIRST_ITEM = 1;

*/