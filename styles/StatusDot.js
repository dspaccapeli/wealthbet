import {Dimensions, StyleSheet} from "react-native";

export const statusDotStyle = StyleSheet.create({
    inactive : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.02,
        height: Dimensions.get('window').width * 0.02,
        backgroundColor: "#3E7F53",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    active : {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.025,
        height: Dimensions.get('window').width * 0.025,
        backgroundColor: "#2a5538",
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
});