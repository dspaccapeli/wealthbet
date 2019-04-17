import apiManager from "../data/DataModel";
import {View} from "react-native";
import {Text} from "native-base";
import React from "react";

export class FundDescription extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            fundSymbol: this.props.fund.symbol,
            description: "",
        }
    }

    updateDescription () {
        apiManager
            .getDescription(this.props.fund.symbol)
            .then(data => {
                let description = "";
                if (data.description) {
                    description = data.description;
                }
                this.setState({
                    status: "LOADED",
                    description: description,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    componentDidMount() {
        this.updateDescription();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.fund.symbol !== this.props.fund.symbol) {
            this.updateDescription();
        }
    }

    render() {
        let description;
        switch (this.state.status) {
            case "LOADING":
                description = "...";
                break;
            case "LOADED":
                description = this.state.description;
                break;
            default:
                description = " ";
        }
        return (
            <View>
                <Text> Info </Text>
                <Text note> {description} </Text>
            </View>
        );
    }
}