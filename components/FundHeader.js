import {View} from "react-native";
import {Text} from "native-base";
import React from "react";
import apiManager from "../data/DataModel";

export class FundHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fund: ""
        }
    }

    componentDidMount() {
        this.setState({
            fund: this.props.fund
        });
        apiManager.addObserver(this);
    }

    componentWillUnmount() {
        apiManager.removeObserver(this);
    }

    update (observer, changeDetails) {
        if(changeDetails === "fund") {
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
