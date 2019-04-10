import React, { Component } from 'react';
import {Container, Button, Form, Item, Label, Text, Input} from 'native-base';
import {styles} from "../styles/util";
import * as firebase from "firebase";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "initial",
            password: "initial"
        };
    }

    goodPassword = (password) => {
        if (!password || password.length < 8){
            console.log("Password is too short!");
            alert("Password is too short!");
            return false;
        }
        return true;
    };

    goodEmail = (email) => {
        if(!email || email.length < 3) {
            console.log("Email format is too short!");
            alert("Email format is too short!");
            return false;
        }
        if (!email.includes("@") || !email.includes(".") ) {
            console.log("Email format is bad!");
            alert("Email format is bad!");
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
                console.log(params);
                console.log("Go to sign up screen");
                alert("Go to sign up screen");
            });
        }catch (e) {
            console.log(e.toString());
        }
    };

    loginUser = () => {
        if (!this.goodPassword(this.state.password) || !this.goodEmail(this.state.email)){
            return;
        }
        try{
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( params =>
            {
                console.log(params);
                console.log("User is authenticated");
                alert("You are authenticated!");
            });
        }catch (e) {
            console.log(e.toString());
        }
    };

    render() {
        console.log(this.state);
        return (
            <Container styles={styles.loginContainer}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                    <Button full rounded success style={{margin: 10}}
                            onPress={this.loginUser}>
                        <Text style={{color: "white"}}>Login</Text>
                    </Button>
                    <Button full rounded primary style={{margin: 10}}
                            onPress={this.signUpUser}>
                        <Text style={{color: "white"}}>Sign up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
