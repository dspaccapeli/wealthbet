import {View} from "react-native";
import {statusDotStyle} from "../styles/StatusDotStyle";
import React, { Component } from "react";
import {styles} from "../styles/Common";

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
            <View style = { Object.assign({},{
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                flexDirection: 'row',
                verticalAlign: 'middle',
            }, styles.backgroundColor)}>
                {statusDot}
            </View>
        )

    }
}