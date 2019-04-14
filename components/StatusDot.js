import {View} from "react-native";
import {statusDotStyle} from "../styles/util";
import React, { Component } from "react";

export default class StatusDot extends Component {

    render(){
        const numbers = Array.from({length: this.props.number}, (x, i) => i);
        let statusDot = numbers.map((i) => {
                if((i+1) === this.props.active){
                    return <View key={i} style={statusDotStyle.active}/>
                }
                return <View key={i} style={statusDotStyle.inactive}/>
            }
        );
        return(
            <View style = {{
                backgroundColor: '#4D9E67',
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                flexDirection: 'row',
                verticalAlign: 'middle',
            }}>
                {statusDot}
            </View>
        )

    }
}