import {View} from "react-native";
import {Icon, Text} from "native-base";
import React from "react";

import {styles} from "../styles/Common";

import {Button } from 'native-base';
import apiManager from "../data/DataModel";


export class FundHeader extends React.Component {
    render() {

        let backColor = {};
        let goBack = (<Button onPress={()=>{
            let prevScreen = apiManager.getPrevScreen();
            apiManager.updateScreen(prevScreen);
            this.props.navigation.navigate(prevScreen);
        }} transparent>
            <Icon style={{color: 'black'}} name="arrow-back" />
        </Button>);

        switch (this.props.screen) {
            case "Fund":
                backColor = styles.backgroundColor;
                break;
        }

        if(!this.props.screen){
            goBack = undefined;
        }

        return (
            <View style={Object.assign({}, {padding: 20}, backColor)}>
                <View style={{flexDirection: 'row'}}>
                    {goBack}
                <View>
                <Text style={{
                    marginLeft: 5,
                    fontFamily: "pp-semib",
                    fontSize: 19}}>{this.props.fund.companyName}</Text>
                <Text style={{
                    marginLeft: 5,
                    fontFamily: "pp-regular",
                    fontSize: 17}}>{this.props.fund.symbol}</Text>
                </View>
                </View>
            </View>
        );
    }
}
