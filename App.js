// React Navigation
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import Screens
import QuizScreen from "./screens/QuizScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import FundScreen from "./screens/FundScreen";

import React from 'react';

const MainNavigator = createStackNavigator(
    {
        Quiz: {screen: QuizScreen},
        Portfolio: {screen: PortfolioScreen},
        Fund: {screen: FundScreen},
    },
    {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: "Fund"
    });

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}