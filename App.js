import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';

export default class Quiz extends Component {
    render() {
        return (
            <View>
                <QuizHeader />
                <QuestionContainer />
                <StepBar />
            </View>
        );
    }
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
                <Text>Yes</Text>
                <Text>No</Text>
                <Text>Maybe</Text>
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
