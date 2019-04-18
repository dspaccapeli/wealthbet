import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {ProfileStyle} from "../styles/ProileScreenStyle";
import firebase from "../firebaseConfig"
import apiManager from "../data/DataModel";

export default class ProfileScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING"
        }
    }

    readUserData(userId) {
        console.log("READ DATA");
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            let firstName = (snapshot.val() && snapshot.val().firstName) || 'Anonymous';
            let lastName = (snapshot.val() && snapshot.val().lastName) || 'Anonymous';
            let about = (snapshot.val() && snapshot.val().about) || 'Anonymous';

            return {
                firstName: firstName,
                lastName: lastName,
                about: about
            }
        });
    }

    componentWillMount() {
        let userId = apiManager.getCurrentUser();
        this.readUserData(userId)
            .then(value => {
                this.setState({
                    status: "LOADED",
                    firstName: value.firstName,
                    lastName: value.lastName,
                    about: value.about
                });
            });
    }

    render() {
        let name;
        let about;
        switch (this.state.status) {
            case "LOADING":
                name = "";
                about = "";
                break;
            case "LOADED":
                name = this.state.firstName + " " + this.state.lastName;
                about = this.state.about;
                break;
            default:
                name = "...";
                about = "...";
        }
        return (
            <View>
                <View style={ProfileStyle.header}></View>
                <Image style={ProfileStyle.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={ProfileStyle.body}>
                    <View style={ProfileStyle.bodyContent}>
                        <Text style={ProfileStyle.name}>{name}</Text>
                        <Text style={ProfileStyle.info}>{about}</Text>

                        <TouchableOpacity style={ProfileStyle.buttonContainer}
                                          onPress={() => {
                                              apiManager.updateScreen('Portfolio');
                                              this.props.navigation.navigate('Portfolio')
                                          }}>
                            <Text>Portfolio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}