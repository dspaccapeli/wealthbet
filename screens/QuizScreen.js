// React
import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';

// Native Base
import {Button, Body, Card, CardItem, Container, Content, DeckSwiper, Text} from 'native-base';

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
                    <QuestionContainer />
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
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

const questions = [ {
    question: "Do you like Apple?",
    answer: ["Yes", "No", "Maybe"]
}];

class QuestionContainer extends Component {
    render() {
        return (
            <Container>
            <View>
                <DeckSwiper
                    dataSource={questions}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
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
                />
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
    render() {
        return (
            <View>
                {this.props.answer.map(function (answer) {
                    return (
                    <Button block key={answer}>
                        <Text>{answer}</Text>
                    </Button>
                    );
                })}
            </View>
        );
    }
}