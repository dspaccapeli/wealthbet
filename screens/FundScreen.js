// React
import React, { Component } from 'react';
import { View } from 'react-native';

// Native Base
import { Text, Button, Container, Content, Card, CardItem, Body, Segment } from 'native-base';

// Styles
import { styles } from "../styles/util";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter"

// Chart
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// JS utils

import { loremIpsum } from "../constants/util"

/* Structure

    FundScreen
    |
    --- FundHeader
    |
    --- FundChart
        |
        --- ChartArea
        |
        --- TimeScale
    |
    --- FundStatistics
    |
    --- FundInfo
        |
        --- FundDescription
        |
        --- FundAlert
    |
    --- News
    |
    --- Sell
*/

export default class FundScreen extends Component {

    // Navigation options
    static navigationOptions = {
        title: 'Fund',
    };

    render() {
        return (
            <Container style={ styles.underStatusBar }>
                <Content>
                    <FundHeader />
                    <FundChart />
                    <FundStatistics />
                    <FundInfo />
                    <News />
                    <Sell />
                </Content>
                <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>
            </Container>
        );
    }

    /* async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    } */
}

export class FundHeader extends Component {
    render() {
        return (
            <View>
                <Text>Fund 1</Text>
                <Text>Short description</Text>
            </View>
        );
    }
}

export class FundChart extends  Component {
    render() {
        return (
            <View>
                <ChartArea />
                <TimeScale />
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

class TimeScale extends React.PureComponent {

    render() {
        return (
            <Segment style={ styles.noBackgroundColor }>
                <Button first>
                    <Text>6 months</Text>
                </Button>
                <Button>
                    <Text>YTD</Text>
                </Button>
                <Button>
                    <Text>5 years</Text>
                </Button>
                <Button last active>
                    <Text>All time</Text>
                </Button>
            </Segment>
        )
    }
}

export class FundStatistics extends  Component {
    render() {
        return (
            <Text>PUT 100 VALUE 200 GAIN 3%</Text>
        )
    }
}

export class FundInfo extends  Component {
    render() {
        return (
            <View>
                <FundDescription />
                <FundAlert />
            </View>
        );
    }
}

export class FundDescription extends  Component {
    render() {
        return (
            <View>
                <Text> Info </Text>
                <Text note> { loremIpsum } </Text>
            </View>
        );
    }
}

class FundAlert extends  Component {
    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>Important</Text>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text note>
                        { loremIpsum }
                    </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

class News extends  Component {
    render() {
        return (
            <View>
                <Text> News </Text>
                <Text note> { loremIpsum } </Text>
            </View>
        );
    }
}

class Sell extends  Component {
    render() {
        return (
            <Button large>
                <Text>Sell</Text>
            </Button>
        );
    }
}



// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);
