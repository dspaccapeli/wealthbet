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
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <QuizHeader />
                    <QuestionContainer navigation={this.props.navigation} />
                </Content>
                {/*<DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>*/}
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
    constructor () {
        super();
    }

    render() {
        return (
            <Container>
            <View>
                <DeckSwiper
                    looping={false}
                    ref={(c) => this._deckSwiper = c}
                    dataSource={questions}
                    renderItem={item =>
                        <Card style={{ elevation: 2 }}>
                            <Body>
                            <CardItem>
                                <Question question = {item.question}/>
                            </CardItem>
                            <CardItem>
                                <Choices answer = {item.answer} />
                            </CardItem>
                            </Body>
                        </Card>
                    }
                    renderEmpty={() => {
                        this.props.navigation.navigate("Presentation");
                    }}
                />
            </View>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 100, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                    <Right>
                        <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
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
    _buttonPressed() {
        console.log("Pressed");
    }

    render() {
        return (
            <View>
                 {this.props.answer.map(function (answer) {
                    return (
                    <Button block key={answer}
                            onPress={this._buttonPressed}>
                        <Text>{answer}</Text>
                    </Button>
                    );
                })}
            </View>
        );
    }
}