import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuizScreen from "./screens/QuizScreen";
import HomeScreen from "./screens/HomeScreen";

const MainNavigator = createStackNavigator(
    {
        Home: {screen: QuizScreen},
        Profile: {screen: HomeScreen},
    },
    {
        mode: 'modal',
        headerMode: 'none',
    });

const App = createAppContainer(MainNavigator);

export default App;