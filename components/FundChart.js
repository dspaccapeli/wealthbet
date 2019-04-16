import React from "react";
import {View} from "react-native";
import apiManager from "../data/DataModel";
import {StackedAreaChart} from "react-native-svg-charts";
import * as shape from "d3-shape";
import {Button, Segment, Text} from "native-base";

export class FundChart extends  React.Component {
    render() {
        return (
            <View>
                <ChartArea symbol={this.props.fund.symbol}/>
                <TimeScale />
            </View>
        );
    }
}

class ChartArea extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            status: "LOADING",
            fundSymbol: this.props.symbol
        };
    }

    // Here we make the API call for historical data for the chart.
    componentDidMount() {
        apiManager
            .getHistoricalData(symbol = this.state.fundSymbol)
            .then(data => {
                this.setState({
                    status: "LOADED",
                    data: data,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            });
    }

    render() {
        let data;
        switch (this.state.status) {
            case "LOADING":
                data = [{value: 5}];
                break;
            case "LOADED":
                data = this.state.data;
                break;
            case "ERROR":
                data = [{value: 10}, {value: 10}];
        }
        const colors = [ '#4D9E67', "#4D9E69", "#4D9E87" ];
        const keys   = [ 'value'];
        const svgs = [
            { onPress: () => console.log('apples') }
        ];

        return (
            <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={data}
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
            />
        )
    }
}

class TimeScale extends React.PureComponent {
    render() {
        return (
            <Segment style={{backgroundColor: '#4D9E67'}}>
                <Button first><Text>6 months</Text></Button>
                <Button><Text>YTD</Text></Button>
                <Button><Text>5 years</Text></Button>
                <Button last active><Text>All time</Text></Button>
            </Segment>
        )
    }
}
