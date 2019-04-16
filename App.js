import React from 'react';

// React Navigation
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import Screens
import QuizScreen from "./screens/QuizScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import FundScreen from "./screens/FundScreen";
import CalculatorScreen from "./screens/CalculatorScreen";
import PresentationScreen from "./screens/PresentationScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { firstPage } from "./util";
import { Font } from 'expo';

// TODO: Initialize firebase here

// Components
import LoadingBar from "./components/Loading";

const MainNavigator = createStackNavigator(
    {
        Quiz: {screen: QuizScreen},
        Portfolio: {screen: PortfolioScreen},
        Fund: {screen: FundScreen},
        Presentation: {screen: PresentationScreen},
        Calculator: {screen: CalculatorScreen},
        Login: {screen: LoginScreen},
        Profile: {screen: ProfileScreen},
    },
    {
        mode: "card",
        headerMode: "none",
        initialRouteName: firstPage
    });

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    async componentWillMount() {
        await Font.loadAsync(
            {
                'poppins-extra-bold': require('./assets/fonts/Poppins-Bold.ttf'),
                'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return (
               <LoadingBar/>
            );
        }
        return <AppContainer />;
    }
}