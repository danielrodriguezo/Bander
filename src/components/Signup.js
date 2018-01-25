import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import Spinner from 'react-native-spinkit';
import {UserService} from "../services/user.service";

class Signup extends Component {

    componentDidMount() {
        this.emailInput._root.focus();
    }

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    toggleLoading() {
        this.props.toggleLoading();
    }

    signUp() {
        this.toggleLoading();
        this.props.signUp();
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <LinearGradient
                        start={{x: 1.0, y: 0.5}} end={{x: 0.5, y: 1.0}}
                        colors={['#A7BFE3', '#8093C9', '#4D4C53']} style={styles.gradient}/>
                    <View style={styles.header}>
                        <Button transparent style={styles.headerButton}
                                onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                        <Text style={styles.headerText}>Login</Text>
                    </View>
                    <Content style={styles.content}>
                        <Card>
                            <CardItem>
                                <Body style={{paddingBottom: 15}}>
                                <Form>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>Email</Label>
                                        <Input getRef={(c) => this.emailInput = c}
                                               keyboardType="email-address"
                                               autoCorrect={false}
                                               autoCapitalize='none'
                                               onSubmitEditing={() => this._focusInput('passwordInput')}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>Password</Label>
                                        <Input getRef={(c) => this.passwordInput = c}
                                               secureTextEntry
                                               autoCapitalize='none'
                                               onSubmitEditing={() => this.signUp()}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                </Form>
                                </Body>
                            </CardItem>
                        </Card>
                        <Button style={styles.button}
                                onPress={() => this.signUp()}>
                            <Text style={{color: '#fff', fontWeight: '300'}}>
                                SIGN UP
                            </Text>
                        </Button>
                        <View style={styles.continueWith}>
                            <Text>Already have an account?</Text>
                            <Button transparent
                                    onPress={() => this.props.navigation.goBack()}>
                                <Text style={{color: '#4D4C53', fontSize: 12, marginLeft: 5, fontWeight: '300'}}>
                                    Sign In
                                </Text>
                            </Button>
                        </View>
                    </Content>
                </View>
                {
                    this.props.app.isLoading &&
                    <View style={styles.loading}>
                        <Spinner style={{marginBottom: 30}} size={100}
                                 type="ArcAlt" color="#D0789C"/>
                        <Text style={styles.loadingText}>Please Wait...</Text>
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: 200,
        flex: 1,
        position: 'absolute',
        shadowColor: '#383838',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 1
    },
    content: {
        top: 60,
        alignSelf: 'center',
        width: '95%'
    },
    header: {
        top: 30,
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 17
    },
    headerButton: {
        marginRight: 20
    },
    button: {
        marginTop: 20,
        backgroundColor: '#8093C9',
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center'
    },
    continueWith: {
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#D0789C',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '500'
    }
});

const mapStateToProps = state => {
    return {
        app: state.app,
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleLoading: () => {
            dispatch(AppStateActionCreator.toggleLoading())
        },
        signUp: (formData) => {
            dispatch(UserService.signUp(formData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
