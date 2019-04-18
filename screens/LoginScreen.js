import React, { Component } from 'react';
import {View, Text, Toast, Button, Icon, Right} from 'native-base';
import firebase from "../firebaseConfig";
import {loginStyles} from "../styles/LoginScreenStyle";
import {styles} from "../styles/Common";
import apiManager from "../data/DataModel";
import {Image, TextInput, KeyboardAvoidingView} from "react-native";

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
            console.error(e.toString());
            Toast.show({
                text: "Login failed!",
            });
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={loginStyles.container}>
                <Image style={loginStyles.logo} source={require('../assets/images/warrenbee_logo.png')}/>
                <View style={loginStyles.inputContainer}>
                    <Image style={loginStyles.inputIcon} source={{uri: 'https://png.icons8.com/message/50'}}/>
                    <TextInput style={loginStyles.inputs}
                               placeholder="Email"
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({email: text})}/>
                </View>

                <View style={loginStyles.inputContainer}>
                    <Image style={loginStyles.inputIcon} source={{uri: 'https://png.icons8.com/password/50'}}/>
                    <TextInput  secureTextEntry={true} style={[ loginStyles.inputs]}
                                placeholder="Password"
                                underlineColorAndroid='transparent'

                                onChangeText={(text) => this.setState({password: text})}/>
                </View>

                <View>
                    <Button seeMore
                            onPress={this.loginUser}
                            style={styles.seeMoreButton}>
                        <Text style={styles.seeMoreText}>LOGIN</Text>
                    </Button>
                </View>

            </KeyboardAvoidingView>
        );
    }
}
