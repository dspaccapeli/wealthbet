import { StyleSheet } from 'react-native';

import { StatusBar } from 'react-native';

// Styles

export const styles = StyleSheet.create({
    underStatusBar : {
        paddingTop: StatusBar.currentHeight,
    },
    noBackgroundColor : {
        backgroundColor: '#ffffff',
    }
});