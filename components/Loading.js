import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
import {devMode} from "../util";
import DevNavigationFooter from "./DevNavigationFooter";
import {styles} from "../styles/util";
export default class LoadingBar extends React.Component {
    render() {
        let NavigationFooter;
        if (devMode) {
            NavigationFooter = <DevNavigationFooter style={styles.footerBottom} navigation={this.props.navigation}/>;
        }
        return(
            <Container>
                <Content>
                    <Spinner />
                </Content>
                {NavigationFooter}
            </Container>
        );
    }
}