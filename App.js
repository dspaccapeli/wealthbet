import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuizScreen from "./screens/QuizScreen";
import HomeScreen from "./screens/HomeScreen";
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
        initialRouteName: "Quiz"
    });

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}