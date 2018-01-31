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
import Error from "./Error";
import {UserService} from "../services/user.service";
import Loading from "./Loading";
import Config from 'react-native-config';

class ExtraSignUpData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: ''
        }
    }
    componentDidMount() {
        this.props.raiseError(false);
        this.firstName._root.focus();
        this.getGeoLocation();
    }

    getGeoLocation() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const coords = position.coords;
            const location = await this.getLocationByCoords(coords);
            this.setState({
                currentCity: this.parseGeoLocation(location)
            });
        }, (error) => {
            console.log(error);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    parseGeoLocation(locations) {
        const city = locations.find((location) => {
            return location.types.includes('locality') || location.types.includes('political');
        });
        return city ? city.formatted_address || '' : '';
    }

    getLocationByCoords(coords) {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`)
            .then(async (response) => response.json())
            .then((json) => {
                return json && json.status === 'OK' ? json.results || [] : [];
            })
            .catch((err) => {
                console.error(err);
                return [];
            });
    }

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    toggleLoading() {
        this.props.toggleLoading();
    }

    setExtraSignupData() {
        this.toggleLoading();
        const firstName = this.firstName.props.value;
        const lastName = this.lastName.props.value;
        const country = this.country.props.value;
        const city = this.city.props.value;
        this.props.extraSignupData({firstName, lastName, country, city});
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <LinearGradient
                        start={{x: 1.0, y: 0.5}} end={{x: 0.5, y: 1.0}}
                        colors={['#A7BFE3', '#8093C9', '#4D4C53']} style={styles.gradient}/>
                    <Content style={styles.content}>
                        <Card>
                            <CardItem>
                                <Body style={{paddingBottom: 15}}>
                                <Error/>
                                <Form>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>First Name</Label>
                                        <Input getRef={(c) => this.firstName = c}
                                               autoCorrect={false}
                                               onSubmitEditing={() => this._focusInput('lastName')}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>Last Name</Label>
                                        <Input getRef={(c) => this.lastName = c}
                                               autoCorrect={false}
                                               onSubmitEditing={() => this._focusInput('country')}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>Country</Label>
                                        <Input getRef={(c) => this.country = c}
                                               autoCorrect={false}
                                               onSubmitEditing={() => this._focusInput('city')}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                    <Item floatingLabel style={{width: '90%'}}>
                                        <Label>City</Label>
                                        <Input getRef={(c) => this.city = c}
                                               autoCorrect={false}
                                               value={this.state.currentCity}
                                               onSubmitEditing={() => this.setExtraSignupData()}
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                </Form>
                                </Body>
                            </CardItem>
                        </Card>
                        <Button block rounded style={styles.button}
                                onPress={() => this.setExtraSignupData()}>
                            <Text style={{color: '#fff', fontWeight: '300'}}>
                                Next » Pick your styles
                            </Text>
                        </Button>
                    </Content>
                </View>
                <Loading/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: 200,
        flex: 1,
        position: 'absolute'
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
        backgroundColor: '#8093C9'
    },
    continueWith: {
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
        raiseError: (status, message) => {
            dispatch(AppStateActionCreator.raiseError(status, message));
        },
        toggleLoading: () => {
            dispatch(AppStateActionCreator.toggleLoading())
        },
        extraSignupData: (formData) => {
            dispatch(UserService.extraSignupData(formData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraSignUpData);
