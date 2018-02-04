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
import {GeoLocationService} from "../services/geo-location.service";

class ExtraSignUpData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: {
                name: '',
                id: ''
            },
            currentCountry: {
                name: '',
                shortName: '',
                id: ''
            },
            countries: [],
            cities: []
        }
    }

    componentDidMount() {
        this.props.raiseError(false);
        this.firstName._root.focus();
        GeoLocationService.getLocation(this.getGeoLocation.bind(this));
    }

    async setCountry(country) {
        const countryExtraDetails = await GeoLocationService.getCountryDetails(country);
        this.setState({
            currentCountry: {
                name: country.description,
                shortName: countryExtraDetails.address_components[0].short_name,
                id: country.place_id
            },
            currentCity: {
                name: '',
                id: ''
            }
        })
    }

    setCity(city) {
        this.setState({
            currentCity: {
                name: city.description,
                id: city.place_id
            }
        })
    }

    getGeoLocation({city, country}) {
        this.setState({
            currentCountry: country,
            currentCity: city
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
        const country = this.state.currentCountry;
        const city = this.state.currentCity;
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
                                               style={{fontWeight: '300'}}/>
                                    </Item>
                                    <Item style={styles.item}>
                                        <Label style={styles.label}>Country</Label>
                                        <Button transparent style={styles.areaSelection}
                                                onPress={() => this.props.navigation.navigate('OptionsSelector', {
                                                    fromRoute: 'ExtraSignUpData',
                                                    searchFn: GeoLocationService.searchCountry,
                                                    name: 'country',
                                                    callback: this.setCountry.bind(this)
                                                })}>
                                            <Text style={{
                                                fontSize: 17,
                                                color: '#575757'
                                            }}>{this.state.currentCountry.name || 'Select'}</Text>
                                        </Button>
                                    </Item>
                                    <Item style={styles.item}>
                                        <Label style={styles.label}>City</Label>
                                        <Button transparent style={styles.areaSelection}
                                                onPress={() => this.state.currentCountry.name && this.props.navigation.navigate('OptionsSelector', {
                                                    fromRoute: 'ExtraSignUpData',
                                                    searchFn: GeoLocationService.searchCity,
                                                    searchParam: this.state.currentCountry.shortName,
                                                    name: 'city',
                                                    callback: this.setCity.bind(this)
                                                })}>
                                            <Text style={{
                                                fontSize: 17,
                                                color: '#575757'
                                            }}>{this.state.currentCity.name || 'Select'}</Text>
                                        </Button>
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
    },
    item: {
        flexDirection: 'column', marginTop: 15, alignItems: 'stretch', flex: 1
    },
    label: {
        color: '#8e8e8e', fontSize: 15
    },
    areaSelection: {
        flexDirection: 'row', flex: 1, width: '90%'
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
