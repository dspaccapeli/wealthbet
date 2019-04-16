import React from "react";
import {View} from "react-native";
import apiManager from "../data/DataModel";
import {StackedAreaChart} from "react-native-svg-charts";
import * as shape from "d3-shape";
import {Button, Segment, Text} from "native-base";
import YAxis from "react-native-svg-charts/src/y-axis";
import LineChart from "react-native-svg-charts/src/line-chart";
import Grid from "react-native-svg-charts/src/grid";

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
        let data, yMin, yMax;
        switch (this.state.status) {
            case "LOADING":
                data = [{value: 5}];
                break;
            case "LOADED":
                //data = this.state.data;
                let [dataNew, minDataRescale, maxDataRescale] = this.rescale(this.state.data);
                data=dataNew;
                console.log(data.length);
                yMin = minDataRescale;
                yMax = maxDataRescale;
                break;
            case "ERROR":
                console.log('j');
                data = [{value: 10}, {value: 10}];
        }
        console.log(data);
        data.map((object)=>{
            return object.value;
        });
        const colors = [ '#4D9E67', "#4D9E69", "#4D9E87" ];
        const keys   = [ 'value'];
        const svgs = [
            { onPress: () => console.log('apples') }
        ];

        const contentInset = { top: 20, bottom: 20 };

        return (
            /*<StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={data}
                keys={ keys }
                yMin={yMin}
                yMax={yMax}
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
            />*/
        <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
                data={ data }
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}ºC` }
            />
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={ contentInset }
            >
                <Grid/>
            </LineChart>
        </View>
        )
    }

    rescale = (data) => {
        let minData = data[0].value;
        let maxData = data[0].value;
        data.forEach((timeTick) => {
            if(timeTick.value<minData){
                minData=timeTick.value}
        });
        data.forEach((timeTick) =>{
            if(timeTick.value>maxData){
                maxData=timeTick.value}
        });
        let dataSpread = maxData - minData;

        if(minData - dataSpread*0.2 > 0){
            minData -= dataSpread*0.2;
        }

        maxData += dataSpread*0.2;

        return [data, minData, maxData];
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