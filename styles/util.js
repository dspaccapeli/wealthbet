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
    }
});
