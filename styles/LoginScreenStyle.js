import {StyleSheet} from 'react-native';
import Colors from '../constants/Colors'

export const LoginStyle = StyleSheet.create({
    loginContainer: {
        flex:1,
        backgroundColor: '#4D9E67',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        backgroundColor: '#4D9E67',
        width: 187,
        height: 143,
        alignItems: 'center',
        justifyContent: 'center',

    },
    form: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#4D9E67',
    },
    formItem: {
        padding: 10
    },
    loginButton: {
        margin: 10,
    },
    signupButton: {
        margin: 10
    },
    textButton: {
        color: "white"
    }

});