// React Navigation
import {createStackNavigator, createAppContainer} from 'react-navigation';

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
    render() {
        return <AppContainer />;
    }
}