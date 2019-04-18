// React
import React, { Component } from 'react';
import {View, TouchableHighlight, Image} from 'react-native';

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
                <Content style={Object.assign({}, PortfolioStyle.content, {flex: 1})}>
                    <PortfolioHeader navigation={this.props.navigation} />
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
           <View style={PortfolioStyle.headerRow}>
               <Text style={PortfolioStyle.headerText}>Portfolio</Text>
               <View style={PortfolioStyle.headerUser}>
                   <UserProfile navigation={this.props.navigation}/>
               </View>
           </View>
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
                <Icon style={PortfolioStyle.userIcon} name='md-contact' />
            </Button>
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
                logoImage = <Image style={PortfolioStyle.fundLogo} source={{uri: this.state.logo}} />;
                break;
            case "LOADING":
                logoImage = <Text> </Text>;
                break;
        }
        return (
            <TouchableHighlight onPress={this.onPress} underlayColor="white">
                <Card style={{borderRadius: 10, margin: 3}}>
                    <CardItem>
                        <Left style={{marginLeft: 30}}>{logoImage}</Left>
                        <Right>
                            <Text style={{fontFamily: 'pp-regular'}}>PUT</Text>
                            <Text style={{fontFamily: 'pp-regular'}} note>{this.props.fund.originalValue}</Text>
                            <Text style={{fontFamily: 'pp-regular'}}>VALUE</Text>
                            <Text style={{fontFamily: 'pp-regular'}} note>{this.props.fund.currentValue}</Text>
                            <Text style={{fontFamily: 'pp-regular'}}>GAIN</Text>
                            <Text style={{fontFamily: 'pp-regular'}} note>{apiManager.computeGain(this.props.fund)}%</Text>
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
            <Right>
                <Button  title={"Add fund button"} style={styles.seeMoreButton}
                         onPress={() => {
                                apiManager.updateScreen('Presentation');
                                this.props.navigation.navigate('Presentation')
                            }}>
                    <Text style={styles.seeMoreText}>More funds</Text>
                </Button>
            </Right>
        );
    }
}