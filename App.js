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
import { firstPage } from "./util";

// Components
import LoadingBar from "./components/Loading";

// Configuration for Firebase
import * as firebase from "firebase";
import '@firebase/firestore';

// TODO: this should not be committed
const config = {
    apiKey: "AIzaSyDFz9TsUz9sP9guck1J4Rc2UFzr62tCo_Q",
    authDomain: "wealthbet-19.firebaseapp.com",
    databaseURL: "https://wealthbet-19.firebaseio.com",
    projectId: "wealthbet-19",
    storageBucket: "wealthbet-19.appspot.com",
    messagingSenderId: "666375374991"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

const MainNavigator = createStackNavigator(
    {
        Quiz: {screen: QuizScreen},
        Portfolio: {screen: PortfolioScreen},
        Fund: {screen: FundScreen},
        Presentation: {screen: PresentationScreen},
        Calculator: {screen: CalculatorScreen},
        Login: {screen: LoginScreen},
    },
    {
        mode: "modal",
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
        await Expo.Font.loadAsync(
            { Roboto: require("native-base/Fonts/Roboto.ttf"),
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