// React
import React, { Component } from 'react';
import {View, TouchableHighlight, Image} from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

// Native Base
import { Container, Content, Left, Right, Text, Button, Icon, CardItem, H1 } from 'native-base';

// Styles
import { styles } from "../styles/Common";
import {PortfolioStyle} from "../styles/PortfolioStyle";

// Components
import DevNavigationFooter from "../components/DevNavigationFooter";

// JS utils
import Card from "react-native-svg-charts/src/card";

import {devMode} from "../util";
import apiManager from "../data/DataModel";

export default class PortfolioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'LOADING',
            funds: [],
        };
    }

    updateFunds () {
        apiManager.getPortfolioFunds()
            .then(data => {
                this.setState({
                    status: 'LOADED',
                    funds: data
                })
            });
    }

    componentWillMount() {
        this.updateFunds();
        apiManager.addObserver(this);
    }

    componentWillUnmount() {
        apiManager.removeObserver(this);
    }

    update (observer, changeDetails) {
        if(changeDetails === "portfolio") {
            this.updateFunds();
        }
    }

    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        let funds = [];
        if (this.state.status === "LOADED"){
            funds = this.state.funds
        }
        return (
            <Container>
                <View style={ styles.statusBar } />
                <Content style={PortfolioStyle.content}>
                    <PortfolioHeader navigation={this.props.navigation} />
                    <PortfolioChart funds={funds}/>
                    <FundList funds={funds} navigation={this.props.navigation}/>
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
                <Col><Left><UserProfile navigation={this.props.navigation}/></Left></Col>
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
                {/*<ChartArea funds={this.props.funds} />*/}
                <PortfolioStatistics />
            </View>
        );
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
    render() {
        let fundList = this.props.funds.map((fund) => {
                return <FundCard key={fund.symbol} fund={fund} navigation={this.props.navigation}/>;
            });
        return (
            <View style={{padding:10}}>{fundList}</View>
        );
    }
}

class FundCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "LOADING",
            fund: this.props.fund
        }
    }

    onPress = () => {
        // Set the current fund
        apiManager.setCurrentFund(this.state.fund.symbol);
        apiManager.updateScreen('Fund');
        this.props.navigation.navigate("Fund");
    };

    componentWillMount() {
        apiManager.getFundLogo(this.props.fund.symbol)
            .then(data => {
                this.setState({
                    status: "LOADED",
                    logo: data.url,
                })
            });
    }

    render() {
        let logoImage;
        switch (this.state.status) {
            case "LOADED":
                logoImage = <Image style={{width: "50", height: "50"}} source={{uri: this.state.logo}}/>;
                break;
            case "LOADING":
                logoImage = <Text> </Text>;
                break;
        }
        return (
            <TouchableHighlight onPress={this.onPress} underlayColor="white">
                <Card>
                    <CardItem>
                        <Left>{logoImage}</Left>
                        <Left><Text>{this.props.fund.symbol}</Text></Left>
                        <Right><Text>PUT</Text>
                            <Text note>{this.props.fund.originalValue}</Text>
                            <Text>VALUE</Text>
                            <Text note>{this.props.fund.currentValue}</Text>
                            <Text>GAIN</Text>
                            <Text note>{apiManager.computeGain(this.props.fund)}%</Text>
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