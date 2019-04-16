import React, { Component } from 'react';
import {Container, Button, Form, Item, Label, Text, Input, Toast} from 'native-base';
import {styles} from "../styles/util";
import firebase from "../firebaseConfig";
import {LoginStyle} from "../styles/LoginScreenStyle";

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

    signUpUser = () => {
        if (!this.goodPassword(this.state.password) || !this.goodEmail(this.state.email)){
            return;
        }
        try{
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(params => {
                Toast.show({
                    text: "Welcome to WealthBet!",
                });
            });
        }catch (e) {
            Toast.show({
                text: "Sign up failed!",
            });
        }
    };

    loginUser = () => {
        if (!this.goodPassword(this.state.password) || !this.goodEmail(this.state.email)){
            return;
        }
        try{
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( params =>
            {
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
            <Container styles={LoginStyle.loginContainer}>
                <Form style={LoginStyle.form}>
                    <Item floatingLabel style={LoginStyle.formItem}>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item floatingLabel style={LoginStyle.formItem}>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                    <Button full rounded success style={LoginStyle.loginButton}
                            onPress={this.loginUser} title="Login button">
                        <Text style={LoginStyle.textButton}>Login</Text>
                    </Button>
                    <Button full rounded primary style={LoginStyle.signupButton}
                            onPress={this.signUpUser} title="Sign up button">
                        <Text style={LoginStyle.textButton}>Sign up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
