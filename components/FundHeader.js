import {View} from "react-native";
import {Text} from "native-base";
import React from "react";

export class FundHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fund: this.props.fund.symbol
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.fund.symbol !== this.props.fund.symbol) {
            this.setState({
                fund: this.props.fund
            });
        }
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>{this.state.fund.symbol}</Text>
                <Text>{this.state.fund.companyName}</Text>
            </View>
        );
    }
}
