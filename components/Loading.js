import React from 'react';
import { View, Content, Spinner } from 'native-base';
import {devMode} from "../util";
import DevNavigationFooter from "./DevNavigationFooter";
import {styles} from "../styles/Common";

export default class LoadingBar extends React.Component {
    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return(
            <View>
                <Content>
                    <Spinner />
                </Content>
                {NavigationFooter}
            </View>
        );
    }
}