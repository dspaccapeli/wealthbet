import {StyleSheet} from 'react-native';

import { StatusBar, Platform } from 'react-native';

import { Dimensions } from 'react-native';

// Styles

export const styles = StyleSheet.create({
    statusBar : {
        backgroundColor: '#4D9E67',
        height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    underStatusBar : {
        paddingTop: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    screenHeight: {
        height: Dimensions.get('window').height,
    },
    screenWidth: {
        width: Dimensions.get('window').width,
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
    screenTitle: {
        textAlign: 'center',
        alignSelf: 'center'
    }
});




