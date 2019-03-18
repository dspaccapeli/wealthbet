// React
import React, { Component } from 'react';
// Expo
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// Native Base
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class Quiz extends Component {
    render() {
        return (
            <Container>
                <QuizHeader />
                <QuestionContainer />
                <StepBar />
            </Container>
        );
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }
}

class QuizHeader extends Component {
    render() {
        return (
            <Container>
                <Text>Quiz</Text>
                <Text>We want to know more about you</Text>
            </Container>
        );
    }
}


class QuestionContainer extends Component {
    render() {
        return (
            <Container>
                <Question />
                <Choices />
            </Container>
        );
    }
}

class Question extends Component {
    render() {
        return (
            <Container>
                <Text>Question 1:</Text>
                <Text>Do you like Apple?</Text>
            </Container>
        );
    }
}

class Choices extends Component {
    render() {
        return (
            <Container>
                <Text>Yes</Text>
                <Text>No</Text>
                <Text>Maybe</Text>
            </Container>
        );
    }
}

class StepBar extends Component {
    render() {
        return (
            <Container>
                <Text>Step 1</Text>
            </Container>
        );
    }
}



// Quiz
    // QuizHeader
    // QuestionContainer
        // Question
        // Choices
    // StepBar


// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);
