import { StyleSheet } from 'react-native';

import { StatusBar, Platform } from 'react-native';

// Styles

export const styles = StyleSheet.create({
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
    roundElement : {
        borderRadius: 64,
    },
    pushedBottom : {
        marginBottom : 100,
    }
});

export const cardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    card: {
        height: '90%',
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