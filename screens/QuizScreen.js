// React
import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';

// Native Base
import {Button, Body, Card, CardItem, Icon, Container, Content, DeckSwiper, Text, Right} from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"
import {FundChart, FundDescription} from "./FundScreen";

import {devMode} from "../util";

/* Structure

    QuizScreen
    |
    --- QuizHeader
    |
    --- QuestionContainer
        |
        --- Question
        |
        --- Choices
*/

export default class QuizScreen extends Component {

    // Navigation options
    static navigationOptions = {
        title: 'Quiz',
    };

    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <QuizHeader />
                    <QuestionContainer navigation={this.props.navigation} />
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

class QuizHeader extends Component {
    render() {
        return (
            <View>
                <Text>Quiz</Text>
                <Text note>We want to know more about you</Text>
            </View>
        );
    }
}

const questions = [
    {
        question: "Do you like Apple?",
        answer: ["Yes", "No", "Maybe"]
    },
    {
        question: "Do you like oil companies?",
        answer: ["Yes", "No", "Maybe"]
    },
];

class QuestionContainer extends Component {
    constructor (props) {
        super(props);

        this.swipeRight = this.swipeRight.bind(this);
        this.navigateToPresentation = this.navigateToPresentation.bind(this);
    }

    swipeRight = (swiper=this.getSwiper()) => {
        swiper._root.swipeRight();
    };

    setSwiper(swiper){
        this.deckSwiper = swiper;
    }

    getSwiper(){
        return this.deckSwiper;
    }

    navigateToPresentation(){
        this.props.navigation.navigate("Presentation");
    }

    render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        looping={false}
                        ref={(c) => this.setSwiper(c)}
                        dataSource={questions}
                        renderItem={item =>
                            <Card style={{ elevation: 2}}>
                                <Body>
                                <CardItem>
                                    <Question question={item.question}/>
                                </CardItem>
                                <CardItem>
                                    <Choices answer={item.answer} swipe={() => this.swipeRight()} />
                                </CardItem>
                                </Body>
                            </Card>
                        }
                        renderEmpty={() => {
                            return (
                                <Button iconRight onPress={() => this.navigateToPresentation()}>
                                    <Text>Next question</Text>
                                    <Icon name="arrow-forward" />
                                </Button>
                            )
                        }}
                        onSwipeRight={(item) => {console.log('right')}}
                        onSwipeLeft={(item) => {console.log('left')}}
                    />
                </View>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 100, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                    <Right>
                        <Button iconRight onPress={() => this.swipeRight()}>
                            <Text>Next question</Text>
                            <Icon name="arrow-forward" />
                        </Button>
                    </Right>
                </View>
            </Container>
        );
    }
}

class Question extends Component {
    render() {
        return (
            <View>
                <Text note>{this.props.question}</Text>
            </View>
        );
    }
}

class Choices extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let optionList = [];

        this.props.answer.forEach((answer) =>{
                optionList.push(
                    <Button block key={answer}
                            onPress={this.props.swipe}>
                        <Text>{answer}</Text>
                    </Button>
                )
            }
        );

        return (
            <View>
                {optionList}
            </View>
        );
    }
}