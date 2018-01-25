import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Form, Icon, Input, Item, Label} from 'native-base';
import {connect} from 'react-redux';
import {UserService} from "../services/user.service";
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import Spinner from 'react-native-spinkit';

class Login extends Component {

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    signIn() {
        this.props.toggleLoading();
        const email = this.emailInput.props.value;
        const password = this.passwordInput.props.value;
        this.props.signIn({email, password});
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.content}>
                    <Image style={styles.image} source={require('../assets/login_back.jpg')}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Login</Text>
                    { this.props.app.error && <Text style={styles.error}>{this.props.app.errorMessage}</Text>}
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
