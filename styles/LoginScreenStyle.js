import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4D9E67',
    },
    logo:{
        width: 187,
        height: 143,
        justifyContent: 'center',
        margin: 20,

    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        fontFamily: "pp-semib",
        fontSize: 15,
    },
    inputIcon:{
        width:30,
        height:30,
        margin:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
    },
    sendButton: {
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        color: 'black',
    }
});