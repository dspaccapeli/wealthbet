import React from "react";
import {View} from "react-native";
import apiManager from "../data/DataModel";
import {StackedAreaChart} from "react-native-svg-charts";
import * as shape from "d3-shape";
import {Button, Text} from "native-base";
import {styles} from "../styles/Common";

export class FundChart extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            timeScale: '3m',
        }
    }

    changeTimeScale = (newTimeScale = '3m') => {
        this.setState({
           timeScale: newTimeScale,
        });
    };

    render() {
        return (
            <View>
                <ChartArea timeScale={this.state.timeScale} symbol={this.props.fund.symbol} screen={this.props.screen}/>
                <TimeScale changeTimeScale={this.changeTimeScale} timeScale={this.state.timeScale} screen={this.props.screen}/>
            </View>
        );
    }
}

class ChartArea extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            status: "LOADING",
            fundSymbol: this.props.symbol,
        };
        this.stockData = {
            '3m': [],
            '6m': [],
            '1y': [],
            'max': [],
        };
        this.loadingScale = 0;
    }

    // Here we make the API call for historical data for the chart.
    componentWillMount() {
        this.getTimeScale('3m');
        this.getTimeScale('6m');
        this.getTimeScale('1y');
        this.getTimeScale('max');
    }

    getTimeScale(timeScale) {
        if (this.loadingScale > 4){
            return;
        }
        apiManager
            .getHistoricalData(symbol= this.state.fundSymbol, range = timeScale)
            .then(data => {
                this.stockData[timeScale] = data;
                this.loadingScale += 1;
                if(this.loadingScale === 4){
                    this.setState({
                        status: "LOADED",
                        data: this.stockData,
                    })
                }
            })
            .catch((e) => {
                console.error(e);
                this.setState({
                    status: "ERROR" + timeScale,
                });
            });
    };

    render() {
        let data, yMin, yMax;
        switch (this.state.status) {
            case "LOADING":
                data = [{value: 5}];
                break;
            case "LOADED":
                let [dataNew, minDataRescale, maxDataRescale] = this.rescale(this.state.data[this.props.timeScale]);
                data=dataNew;
                yMin = minDataRescale;
                yMax = maxDataRescale;
                break;
            case "ERROR":
                data = [{value: 10}, {value: 10}];
        }

        let colors = [ styles.backgroundColor.backgroundColor];

        if(this.props.screen === 'Fund'){
            colors = [styles.dimmerColor.color];
        } else if (this.props.screen === 'Calculator'){
            colors = [styles.dimmerColor.color];
        }

        const keys   = [ 'value'];
        let backColor = {};
        if(this.props.screen === 'Fund'){
            backColor = styles.backgroundColor;
        }

        return (
            <StackedAreaChart
                style={ Object.assign({},{ height: 180, paddingVertical: 0 }, backColor )}
                data={data}
                keys={keys}
                yMin={yMin}
                yMax={yMax}
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
            />
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
    constructor(props){
        super(props);
    }

    render() {
        let threeMonths = {};
        let sixMonths = {};
        let oneYear = {};
        let max = {};

        let bold = {fontWeight: '900', textDecorationLine: 'underline'};

        switch (this.props.timeScale) {
            case "3m":
                threeMonths = bold;
                break;
            case "6m":
                sixMonths = bold;
                break;
            case "1y":
                oneYear = bold;
                break;
            case "max":
                max = bold;
                break;
        }

        let backColor = {};
        switch (this.props.screen) {
            case "Fund":
            case "Calculator":
                backColor = {backgroundColor: styles.dimmerColor.color};
                break;

        }

        let secondaryColor = {color: "#9e4d84"};
        switch (this.props.screen) {
            case "Fund":
            case "Calculator":
                secondaryColor = {color: "#ffffff"};
                break;

        }

        return (
            <View style={Object.assign({}, {flexDirection: 'row', justifyContent: 'center'}, backColor)}>
                <Button transparent onPress={() => this.props.changeTimeScale('3m')}>
                    <Text style={Object.assign({}, secondaryColor, threeMonths)}>3 M</Text>
                </Button>
                <Button transparent onPress={() => this.props.changeTimeScale('6m')}>
                    <Text style={Object.assign({}, secondaryColor, sixMonths)}>6 M</Text>
                </Button>
                <Button transparent onPress={() => this.props.changeTimeScale('1y')}>
                    <Text style={Object.assign({}, secondaryColor, oneYear)}>1 Y</Text>
                </Button>
                <Button transparent onPress={() => this.props.changeTimeScale('max')}>
                    <Text style={Object.assign({}, secondaryColor, max)}>MAX</Text>
                </Button>
            </View>
        )
    }
}