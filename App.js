import React from 'react';

// React Navigation
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Root } from "native-base";

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
        console.disableYellowBox  = true;
    }

    async componentWillMount() {
        await Font.loadAsync(
            {
                'pp-extra-bold': require('./assets/fonts/Poppins-Bold.ttf'),
                'pp-medium': require('./assets/fonts/Poppins-Medium.ttf'),
                'pp-regular': require('./assets/fonts/Poppins-Regular.ttf'),
            });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return (
               <LoadingBar/>
            );
        }
        return (
            <Root>
                <AppContainer />
            </Root>);
    }
}