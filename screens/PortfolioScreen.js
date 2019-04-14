// React
import React, { Component } from 'react';
import { View } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';


// Native Base
import { Container, Content, Left, Right, Text, Body, Button, Icon, CardItem, H1 } from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// JS utils

import { loremIpsum } from "../constants/util"
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

    update(changeList) {
        if(changeList === "portfolio") {
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
                    <PortfolioHeader />
                    <PortfolioChart />
                    <FundList funds={this.state.funds}/>
                    <AddFund navigation={this.props.navigation} />
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}

class PortfolioHeader extends Component {
    render() {
        return (
            <Grid>
                <Col><PortfolioTitle/></Col>
                <Col><UserProfile/></Col>
            </Grid>
        );
    }
}

class PortfolioTitle extends Component {
    render() {
        return (
            <H1>Portfolio</H1>
        );
    }
}

class UserProfile extends Component {
    render() {
        return (
            <Button transparent>
                <Icon name='md-contact' />
            </Button>
        );
    }
}

class PortfolioChart extends Component {
    render() {
        return (
            <View>
                <ChartArea />
                <PortfolioStatistics />
            </View>
        );
    }
}

// TODO: this chart should be dinamic? is there another option?
class ChartArea extends React.PureComponent {

    render() {

        const data = [
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

        const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ];
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
        console.log(this.state.funds);
        let fundsList = this.state.funds.map((fund) => {
            return <FundCard key={fund.symbol} fund={fund}/>;
        });

        return (
            <View>{fundsList}</View>
        );
    }
}

class FundCard extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Left><Text>{this.props.fund.symbol}</Text></Left>
                    <Right>< FundInfo fund={this.props.fund}/></Right>
                </CardItem>
            </Card>
        );
    }
}

class FundInfo extends Component {
    computeGain = () => {
        let fund = this.props.fund;
        return ((fund.currentValue - fund.originalValue) / fund.originalValue) * 100;
    };

    render() {
        return (
            <Body>
                <Text>PUT</Text>
                <Text note>{this.props.fund.originalValue}</Text>
                <Text>VALUE</Text>
                <Text note>{this.props.fund.currentValue}</Text>
                <Text>GAIN</Text>
                <Text note>{this.computeGain()}%</Text>
            </Body>
        );
    }
}

class AddFund extends Component {
    render() {
        return (
            <Button title={"Add fund button"} style={styles.roundElement}
                    onPress={() => this.props.navigation.navigate('Presentation')}>
                <Icon name='add' />
            </Button>
        );
    }
}