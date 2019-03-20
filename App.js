// React Navigation
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Text, Container} from 'native-base';

// Import Screens
import QuizScreen from "./screens/QuizScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import FundScreen from "./screens/FundScreen";

import React from 'react';
import CalculatorScreen from "./screens/CalculatorScreen";
import PresentationScreen from "./screens/PresentationScreen";

const MainNavigator = createStackNavigator(
    {
        Quiz: {screen: QuizScreen},
        Portfolio: {screen: PortfolioScreen},
        Fund: {screen: FundScreen},
        Presentation: {screen: PresentationScreen},
        Calculator: {screen: CalculatorScreen},
    },
    {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: "Portfolio"
    });

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { isReady: false };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync(
            { Roboto: require("native-base/Fonts/Roboto.ttf"),
              Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <Container>
                    <Text>
                        The app is loading!
                    </Text>
                </Container>
            );
        }
        return <AppContainer />;
    }
}