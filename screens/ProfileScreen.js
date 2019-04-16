import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {ProfileStyle} from "../styles/ProileScreenStyle"

export default class ProfileScreen extends Component {

    render() {
        return (
            <View>
                <View style={ProfileStyle.header}></View>
                <Image style={ProfileStyle.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={ProfileStyle.body}>
                    <View style={ProfileStyle.bodyContent}>
                        <Text style={ProfileStyle.name}>Warren Buffet</Text>
                        <Text style={ProfileStyle.info}>Magnate, Investor, Speaker</Text>

                        <TouchableOpacity style={ProfileStyle.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Portfolio')}>
                            <Text>Portfolio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}