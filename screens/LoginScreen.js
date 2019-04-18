import React, { Component } from 'react';
import {View, Text, Toast, Button, Icon, Right} from 'native-base';
import firebase from "../firebaseConfig";
import {styles} from "../styles/LoginScreenStyle";
import apiManager from "../data/DataModel";
import {Image, TextInput, TouchableHighlight, KeyboardAvoidingView} from "react-native";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "initial",
            password: "initial"
        };
    }

    goodPassword = (password) => {
        if (!password || password.length < 6){
            Toast.show({
                text: "Wrong password!",
            });
            return false;
        }
        return true;
    };

    goodEmail = (email) => {
        if(!email || email.length < 3) {
            Toast.show({
                text: "Wrong email!",
            });
            return false;
        }
        if (!email.includes("@") || !email.includes(".") ) {
            Toast.show({
                text: "Wrong email!",
            });
            return false;
        }
        return true;
    };

    loginUser = () => {
        if (!this.goodPassword(this.state.password) || !this.goodEmail(this.state.email)){
            return;
        }
        try{
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( params =>
            {
                apiManager.setCurrentUser(params.user.uid);
                Toast.show({
                    text: "Welcome to WealthBet!",
                });
                apiManager.updateScreen('Quiz');
                this.props.navigation.navigate("Quiz");
            });
        }catch (e) {
            console.log(e.toString());
            Toast.show({
                text: "Login failed!",
            });
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/warrenbee_logo.png')}/>

                {/*<Text style={{
                    marginVertical: 10,
                    fontFamily: "pp-semib",
                    fontSize: 19}}>Wealth Bet</Text>*/}

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/50'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({email: text})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/password/50'}}/>
                    <TextInput  secureTextEntry={true} style={[ styles.inputs]}
                                placeholder="Password"
                                underlineColorAndroid='transparent'

                                onChangeText={(text) => this.setState({password: text})}/>
                </View>

                {/*<TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.loginUser}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>*/}

                <View>
                    <Button seeMore
                            onPress={this.loginUser}
                            style={{
                                backgroundColor: "#9e4d84",
                                marginVertical: 15,
                            }}>
                        <Text
                            style={{
                                marginHorizontal: 20,
                                fontFamily: "pp-regular",
                                fontSize: 15}}>LOGIN</Text>
                    </Button>
                </View>

            </KeyboardAvoidingView>
        );
    }
}
