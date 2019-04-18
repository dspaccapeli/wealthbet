import apiManager from "../data/DataModel";
import {View} from "react-native";
import {Text} from "native-base";
import React from "react";
import {styles} from "../styles/Common";

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

    componentWillMount() {
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

        let backColor = {};
        let whiteText = {};

        if(this.props.screen === 'Fund'){
            backColor = {backgroundColor: styles.dimmerColor.color};
            whiteText = {color: "#ffffff"};
        }

        let title = {
            marginHorizontal: 25,
            marginTop: 5,
            fontFamily: "pp-medium",
            fontSize: 14
        };

        let content = {
            marginHorizontal: 25,
            marginTop: 10,
            fontFamily: "pp-regular",
            fontSize: 13
        };

        return (
            <View style={backColor}>
                <Text style={Object.assign({}, title, whiteText)}>DESCRIPTION</Text>
                <Text note style={Object.assign({}, content, whiteText)}>{description}</Text>
            </View>
        );
    }
}