// React
import React, { Component } from 'react';
import {View, TouchableHighlight} from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';


// Native Base
import { Container, Content, Left, Right, Text, Button, Icon, CardItem, H1 } from 'native-base';

// Styles
import { styles } from "../styles/Common";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter";

// JS utils
import {StackedAreaChart} from "react-native-svg-charts";
import * as shape from "d3-shape";
import Card from "react-native-svg-charts/src/card";

import {devMode} from "../util";
import apiManager from "../data/DataModel";

/* Structure

    PortfolioScreen
    |
    --- PortfolioHeader
        |
        --- PortfolioTitle
        |
        --- UserProfile
    |
    --- PortfolioChart
        |
        --- ChartArea
    |
    --- PortfolioStatistics
    |
    --- FundList
        |
        --- FundCard
            |
            --- FundDescription
            |
            --- FundInfo
    |
    --- AddFund
*/

export default class PortfolioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          funds:  apiManager.getPortfolioFunds(),
        };
    }

    componentDidMount() {
        apiManager.addObserver(this);
    }

    componentWillUnmount() {
        apiManager.removeObserver(this);
    }

    update (observer, changeDetails) {
        if(changeDetails === "portfolio") {
            this.setState({funds: apiManager.getPortfolioFunds()})
        }
    }

    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content>
                    <PortfolioHeader navigation={this.props.navigation} />
                    <PortfolioChart funds={this.state.funds}/>
                    <FundList funds={this.state.funds} navigation={this.props.navigation}/>
                    <AddFund navigation={this.props.navigation}/>
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

class PortfolioHeader extends Component {
    render() {
        return (
            <Grid >
                <Col><H1>Portfolio</H1></Col>
                <Col><UserProfile navigation={this.props.navigation}/></Col>
            </Grid>
        );
    }
}

class UserProfile extends Component {
    render() {
        return (
            <Button transparent
                    onPress={() => {
                        apiManager.updateScreen('Profile');
                        this.props.navigation.navigate('Profile')
                    }} title={"Go to profile"}>
                <Icon name='md-contact' />
            </Button>
        );
    }
}

class PortfolioChart extends Component {
    render() {
        return (
            <View>
                <ChartArea funds={this.props.funds} />
                <PortfolioStatistics />
            </View>
        );
    }
}

// TODO: this chart should be dinamic? is there another option?
// This should pot each fund that you have with a different color
class ChartArea extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            funds: this.props.funds
        };
    }

    componentDidMount() {
        let allData = {};
        for (let i in this.state.funds) {
            apiManager.getHistoricalData(symbol=this.state.funds[i].symbol)
                .then(data => {
                    allData[this.state.funds[i].symbol] = data;
                })
                .then( () => {
                    this.setState({
                        status: "LOADED",
                        data: allData,
                    })
                })
                .catch(() => {
                    this.this.setState({
                        status: "ERROR"
                    });
                });
        }
    }

    processData = (data) => {
        let finalData = [];
        // Take just 10 values from the data
        for (let i = 0; i < 10; i++) {
            let item = {};
            for (let fundSymbol in data) {
                item["value"] = data[fundSymbol][i]["value"] * 10;
            }
            finalData.push(item);
        }
        return finalData;
    };

    render() {

        let data;
        switch (this.state.status) {
            case "LOADING":
                data = [{value: 5}];
                break;
            case "LOADED":
                data = this.processData(this.state.data);
                break;
            case "ERROR":
                data = mockData;
            // console.log("There is a problem in the data");
        }

        // TODO: change processData so that it works with multiple funds
        data=mockData;
        const colors = [ '#4D9E67', '#6cb567', '#92bf8f', '#72bf6d' ];
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ];
        const svgs = [
            { onPress: () => console.log('apples') },
            { onPress: () => console.log('bananas') },
            { onPress: () => console.log('cherries') },
            { onPress: () => console.log('dates') },
        ];

        return (
            <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={ data }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
            />
        )
    }
}

class PortfolioStatistics extends Component {
    render() {
        return (
            <Grid>
                <Col><Text>Total value: {apiManager.getPortfolioValue()}</Text></Col>
                <Col><Text>Monthly growth: {apiManager.getMonthlyGrowth()}%</Text></Col>
            </Grid>
        );
    }
}

class FundList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            funds: this.props.funds
        }
    }

    render() {
        let fundList;
        if (this.state.funds.length > 0) {
            fundList = this.state.funds.map((fund) => {
                return <FundCard key={fund.symbol} fund={fund} navigation={this.props.navigation}/>;
            });
        } else {
            fundList = (<Text>There are no funds in the portfolio!</Text>);
        }

        return (
            <View>{fundList}</View>
        );
    }
}

class FundCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fund: this.props.fund
        }
    }

    onPress = () => {
        // Set the current fund
        apiManager.setCurrentFund(this.state.fund.symbol);
        apiManager.updateScreen('Fund');
        this.props.navigation.navigate("Fund");
    };

    render() {
        return (
            <TouchableHighlight onPress={this.onPress} underlayColor="white">
                <Card>
                    <CardItem>
                        <Left><Text>{this.state.fund.symbol}</Text></Left>
                        <Right><Text>PUT</Text>
                            <Text note>{this.state.fund.originalValue}</Text>
                            <Text>VALUE</Text>
                            <Text note>{this.state.fund.currentValue}</Text>
                            <Text>GAIN</Text>
                            <Text note>{apiManager.computeGain(this.state.fund)}%</Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        );
    }
}

class AddFund extends Component {
    render() {
        return (
            <Button title={"Add fund button"} style={styles.roundElement}
                    onPress={() => {
                        apiManager.updateScreen('Presentation');
                        this.props.navigation.navigate('Presentation')
                    }}>
                <Icon name='add' />
            </Button>
        );
    }
}

//TODO: delete, this is used only to show a nice graph in the top
const mockData = [
    {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
    },
    {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
    },
    {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
    },
    {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
    },
];