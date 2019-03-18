import {createStackNavigator, createAppContainer} from 'react-navigation';
import Quiz from "./screens/Quiz";
import HomeScreen from "./screens/HomeScreen";

const MainNavigator = createStackNavigator({
    Home: {screen: Quiz},
    Profile: {screen: HomeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;