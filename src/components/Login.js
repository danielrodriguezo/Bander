import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Button, Form, Icon, Input, Item, Label} from 'native-base';
import {connect} from 'react-redux';
import {UserService} from "../services/user.service";
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import Loading from "./Loading";
import Error from "./Error";

class Login extends Component {

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    toggleLoading() {
        this.props.toggleLoading();
    }

    signIn() {
        this.toggleLoading();
        const email = this.emailInput.props.value;
        const password = this.passwordInput.props.value;
        this.props.signIn({email, password});
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.content}>
                        <Image style={styles.image} source={require('../assets/login_back.jpg')}/>
                        <Image source={require('../assets/bander_logo.png')}
                               style={{
                                   position: 'absolute',
                                   marginTop: 15,
                                   flex: 1,
                                   alignSelf: 'center',
                                   width: 200,
                                   height: 150
                               }}/>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.header}>Login</Text>
                        <Error/>
                        <Form>
                            <Item floatingLabel style={{marginTop: 10}}>
                                <Label>Email</Label>
                                <Input getRef={(c) => this.emailInput = c}
                                       keyboardType='email-address'
                                       autoCorrect={false}
                                       autoCapitalize='none'
                                       onSubmitEditing={() => this._focusInput('passwordInput')}
                                       style={{fontWeight: '300'}}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input secureTextEntry
                                       keyboardType='default'
                                       autoCapitalize='none'
                                       returnKeyType='go'
                                       getRef={(c) => this.passwordInput = c}
                                       onSubmitEditing={() => this.signIn()}
                                       style={{fontWeight: '300'}}/>
                            </Item>
                            <Button transparent style={{alignSelf: 'flex-end', marginTop: 10}}>
                                <Text style={styles.forgot}>Forgot Password?</Text>
                            </Button>
                            <Button style={styles.button}
                                    onPress={() => this.signIn()}>
                                <Text style={{color: '#fff', fontWeight: '300'}}>
                                    SIGN IN
                                </Text>
                            </Button>
                        </Form>
                        <View style={styles.continueWith}>
                            <Text style={styles.line}>------------</Text>
                            <Text style={styles.continueWithText}> Or Continue With </Text>
                            <Text style={styles.line}>------------</Text>
                        </View>
                        <View style={styles.continueWith}>
                            <Button style={styles.facebook}>
                                <Icon name='logo-facebook'/>
                            </Button>
                            <Button style={styles.google}>
                                <Icon name='logo-google'/>
                            </Button>
                        </View>
                        <View style={[styles.continueWith, {marginBottom: 20}]}>
                            <Text style={{fontWeight: '300'}}>Don't have an account?</Text>
                            <Button style={{marginLeft: 10, backgroundColor: '#D0789C'}}
                                    onPress={() => this.props.navigation.navigate('Signup')}>
                                <Text style={{color: '#fff', fontWeight: '300', padding: 5}}>SIGN UP</Text>
                            </Button>
                        </View>
                    </View>
                    <Loading/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
    },
    content: {
        shadowColor: '#383838',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 1
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        marginLeft: 15,
        fontWeight: '500',
        color: '#383838'
    },
    image: {
        width: '100%',
        height: 175
    },
    forgot: {
        fontSize: 13,
        fontWeight: '300',
        color: '#383838'
    },
    button: {
        marginLeft: 15,
        marginTop: 20,
        backgroundColor: '#8093C9',
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    continueWith: {
        marginTop: 15,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    continueWithText: {
        fontWeight: '300',
        color: '#ccc',
        fontSize: 12,
        textAlign: 'center'
    },
    line: {
        letterSpacing: -2,
        color: '#ccc',
        textAlign: 'center'
    },
    facebook: {
        backgroundColor: '#3b5998',
        borderRadius: 50,
        marginRight: 20
    },
    google: {
        backgroundColor: '#DD4B39',
        borderRadius: 50,
    },
    error: {
        marginTop: 10,
        marginLeft: 15,
        color: '#DD4B39',
        fontSize: 13
    }
});

const mapStateToProps = state => {
    return {
        app: state.app
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: (formData) => {
            dispatch(UserService.signIn(formData))
        },
        raiseError: (status, message) => {
            dispatch(AppStateActionCreator.raiseError(status, message));
        },
        toggleLoading: () => {
            dispatch(AppStateActionCreator.toggleLoading());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
