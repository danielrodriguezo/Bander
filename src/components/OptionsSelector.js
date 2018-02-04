import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Button, Container, Content, Header, Icon, Input, Item, List, ListItem, Text} from 'native-base';

class OptionsSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromRoute: '',
            name: '',
            searchParam: '',
            searchFn: () => {
            },
            text: '',
            list: [],
            callback: () => {
            }
        }
    }

    componentDidMount() {
        this.setState({
            fromRoute: this.props.navigation.state.params.fromRoute,
            name: this.props.navigation.state.params.name,
            searchParam: this.props.navigation.state.params.searchParam,
            searchFn: this.props.navigation.state.params.searchFn,
            callback: this.props.navigation.state.params.callback
        });
    }

    async search() {
        const list = await this.state.searchFn.call(this, this.state.text, this.state.searchParam);
        this.setState({
            list
        })
    }

    selectItem(listItem) {
        this.props.navigation.goBack();
        this.state.callback(listItem);
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder={'Search for ' + this.state.name}
                               onChangeText={(text) => this.setState({text})}
                               value={this.state.text}
                               autoCorrect={false}/>
                        <Icon name="ios-locate"/>
                    </Item>
                    <Button transparent
                            onPress={() => this.search()}>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    <List>
                        {
                            this.state.list.map((listItem, index) => {
                                return <ListItem style={{marginLeft: 0, paddingLeft: 15}} key={index}
                                                 onPress={() => this.selectItem(listItem)}>

                                    <Text>{listItem.description}</Text>

                                </ListItem>
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        app: state.app
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsSelector);
