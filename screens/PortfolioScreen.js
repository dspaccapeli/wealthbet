// React
import React, { Component } from 'react';
import { View } from 'react-native';

// Native Base
import { Container, Content, Button, Text } from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// JS utils

import { loremIpsum } from "../constants/util"

/* Structure

    PortfolioScreen
    |
    --- PortfolioHeader
        |
        --- PortfolioTitle
        |
        --- UserProfile
    |
    --- PortfolioChart
        |
        --- ChartArea
    |
    --- PortfolioStatistics
    |
    --- FundList
        |
        --- FundCard
            |
            --- FundAlert
            |
            --- FundInfo
    |
    --- AddFund
*/

export default class PortfolioScreen extends Component {

    // Navigation options
    static navigationOptions = {
        title: 'Portfolio',
    };

    render() {
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <PortfolioHeader />
                    {/*
                    --- PortfolioTitle
                    |
                    --- UserProfile*/}
                    <PortfolioChart />
                    {/*
                    --- ChartArea
                    |
                    --- PortfolioStatistics*/}
                    <FundList />
                    {/*
                    --- FundCard
                    |
                    --- FundAlert
                    |
                    --- FundInfo
                    */}
                    <AddFund />
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
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
                <Text>PORTFOLIO</Text>
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
