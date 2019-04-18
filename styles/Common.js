import {StyleSheet} from 'react-native';

import { StatusBar, Platform } from 'react-native';

import { Dimensions } from 'react-native';

// Styles

const background_color = '#4baa70';
const dimmerColor = '#3a7847';

export const styles = StyleSheet.create({
    statusBar : {
        backgroundColor: background_color,
        height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    underStatusBar : {
        paddingTop: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    screenHeight: {
        height: Dimensions.get('window').height,
    },
    dimmerColor: {
        color: dimmerColor,
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
        backgroundColor: background_color,
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




