import {StyleSheet} from "react-native";

export const swiper = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
    },
    card: {
        height: '82%',
        borderRadius: 20,
        borderWidth: 0,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});

export const presentationStyle = StyleSheet.create({
    header: {
        fontFamily: "pp-medium",
        fontSize: 15,
        textAlign: "left",
        marginTop: 5,
        marginHorizontal: 15
    },
});
