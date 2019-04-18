import {View} from "react-native";
import {Text} from "native-base";
import React from "react";

export class FundHeader extends React.Component {
    render() {
        return (
            <View style={{padding: 20}}>
                <Text style={{
                    marginLeft: 5,
                    fontFamily: "pp-semib",
                    fontSize: 19}}>{this.props.fund.companyName}</Text>
                <Text style={{
                    marginLeft: 5,
                    fontFamily: "pp-regular",
                    fontSize: 17}}>{this.props.fund.symbol}</Text>
            </View>
        );
    }
}
