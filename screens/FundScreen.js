// React
import React, { Component } from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Platform } from 'react-native';

// Expo
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// Native Base
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

// Styles

import { styles } from "../styles/util";

// Components

import DevNavigationFooter from "../components/DevNavigationFooter"


// Structure

/*
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

export default class FundScreen extends Component {
    // Navigation options

    static navigationOptions = {
        title: 'Quiz',
    };

    render() {
        return (
            <SafeAreaView style={ styles.underStatusBar }>
                <QuizHeader />
                <QuestionContainer />
                <DevNavigationFooter navigation={this.props.navigation}/>
            </SafeAreaView>
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
                <Text>FUND</Text>
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
                <Text>Question 1 of 3:</Text>
                <Text>Do you like Apple?</Text>
            </View>
        );
    }
}

class Choices extends Component {
    render() {
        return (
            <View>
                <Button block>
                    <Text>Yes</Text>
                </Button>
                <Button block>
                    <Text>No</Text>
                </Button>
                <Button block>
                    <Text>Maybe</Text>
                </Button>
            </View>
        );
    }
}


// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);
