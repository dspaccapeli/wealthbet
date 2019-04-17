import {View} from "react-native";
import {Text} from "native-base";
import React from "react";

export class FundHeader extends React.Component {
    render() {
        return (
            <View style={{padding: 20}}>
                <Text>{this.props.fund.symbol}</Text>
                <Text>{this.props.fund.companyName}</Text>
            </View>
        );
    }
}
