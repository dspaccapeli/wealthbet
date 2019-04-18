import React, { Component } from 'react';
import {View, Text, Toast} from 'native-base';
import firebase from "../firebaseConfig";
import {styles} from "../styles/LoginScreenStyle";
import apiManager from "../data/DataModel";
import {Image, TextInput, TouchableHighlight} from "react-native";

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
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/warrenbee_logo.png')}/>
                <Text>Wealth Bet</Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/50'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({email: text})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/password/50'}}/>
                    <TextInput  secureTextEntry={true} style={[ styles.messageInput]}
                                placeholder="Password"
                                underlineColorAndroid='transparent'

                                onChangeText={(text) => this.setState({password: text})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.loginUser}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
