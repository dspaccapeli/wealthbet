import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
export default class LoadingBar extends React.Component {
    render() {
        return(
            <Container>
                <Content>
                    <Spinner />
                </Content>
            </Container>
        );
    }
}