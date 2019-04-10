import {Dimensions, StyleSheet} from 'react-native';

import { StatusBar, Platform } from 'react-native';

// Styles

export const styles = StyleSheet.create({
    statusBar : {
        backgroundColor: '#4D9E67',
        height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    underStatusBar : {
        paddingTop: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    footerBottom : {
        position: 'absolute',
        bottom: 0,
    },
    noBackgroundColor : {
        backgroundColor: '#ffffff',
    },
    backgroundColor : {
        backgroundColor: '#4D9E67',
    },
    roundElement : {
        borderRadius: 64,
    },
    pushedBottom : {
        marginBottom : 100,
    },
    loginContainer: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: "center",
        padding: 10
    }
});

export const cardStylesQuiz = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    statusDotInactive : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.02,
        height: Dimensions.get('window').width * 0.02,
        backgroundColor: "#3E7F53",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    statusDotActive : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.02,
        height: Dimensions.get('window').width * 0.02,
        backgroundColor: "#2a5538",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    card: {
        height: '70%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
});

export const cardStylesPresentation = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    statusDotInactive : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.02,
        height: Dimensions.get('window').width * 0.02,
        backgroundColor: "#3E7F53",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    statusDotActive : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.02,
        height: Dimensions.get('window').width * 0.02,
        backgroundColor: "#2a5538",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    card: {
        height: '80%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
});