// React
import React, { Component } from 'react';
import { View } from 'react-native';
// Expo
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// Native Base
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class Quiz extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>

                </Header>
                <QuizHeader />
                <QuestionContainer />
                <StepBar />
            </Container>
        );
    }

    /* async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    } */
}

class QuizHeader extends Component {
    render() {
        return (
            <View>
                <Text>Quiz</Text>
                <Text>We want to know more about you</Text>
            </View>
        );
    }
}


class QuestionContainer extends Component {
    render() {
        return (
            <View>
                <Question />
                <Choices />
            </View>
        );
    }
}

class Question extends Component {
    render() {
        return (
            <View>
                <Text>Question 1:</Text>
                <Text>Do you like Apple?</Text>
            </View>
        );
    }
}

class Choices extends Component {
    render() {
        return (
            <View>
                <Button block success>
                    <Text>Yes</Text>
                </Button>
                <Button block Danger>
                    <Text>No</Text>
                </Button>
                <Button block warning>
                    <Text>Maybe</Text>
                </Button>
            </View>
        );
    }
}

class StepBar extends Component {
    render() {
        return (
            <View>
                <Text>Step 1</Text>
            </View>
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
