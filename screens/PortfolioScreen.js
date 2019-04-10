// React
import React, { Component } from 'react';
import { View } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';


// Native Base
import { Container, Content, Left, Right, Text, Body, Button, Icon, CardItem } from 'native-base';

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
                    <FundList />
                    <AddFund />
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
                <Col>
                    <PortfolioTitle />
                </Col>
                <Col>
                    < UserProfile />
                </Col>
            </Grid>
        );
    }
}

class PortfolioTitle extends Component {
    render() {
        return (
            <Text>Portfolio</Text>
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
                < ChartArea />
                < PortfolioStatistics />
            </View>
        );
    }
}

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
                <Col>
                    <Text>Value: 3000</Text>
                </Col>
                <Col>
                    <Text>Monthly growth: +3%</Text>
                </Col>
            </Grid>
        );
    }
}

class FundList extends Component {
    render() {
        let funds = [1, 2, 3];
        let fundsList = funds.map((number) => {
            return < FundCard key={number} />;
        });

        return (
            <View>
                {fundsList}
            </View>
        );
    }
}

class FundCard extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        < FundDescription />
                    </Left>
                    <Right>
                        < FundInfo />
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

class FundDescription extends Component {
    render() {
        return (
            <Body>
                <Text>Fund</Text>
                <Text note> { loremIpsum } </Text>
            </Body>
        );
    }
}

class FundInfo extends Component {
    render() {
        return (
            <Body>
                <Text>PUT</Text>
                <Text note>100</Text>
                <Text>VALUE</Text>
                <Text note>200</Text>
                <Text>GAIN</Text>
                <Text note>3%</Text>
            </Body>
        );
    }
}



class AddFund extends Component {
    render() {
        return (
            <Button style={styles.roundElement}>
                <Icon name='add' />
            </Button>
        );
    }
}