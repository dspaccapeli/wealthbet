import {StyleSheet} from 'react-native';

export const PortfolioStyle = StyleSheet.create({
    content: {
        backgroundColor: '#4baa70'
    },
    headerRow: {
        flexDirection: 'row',
    },
    headerText: {
        justifyContent: 'flex-start',
        fontFamily: 'pp-medium',
        fontSize: 20
    },
    headerUser: {
        marginLeft: 'auto'
    },
    userIcon: {
        color: 'black',
        height: 30,
        width: 50
    },
    fundLogo: {
        width: 100,
        height: 70,
        resizeMode: 'contain',
    },
});