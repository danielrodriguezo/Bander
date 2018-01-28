import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import {UserService} from "../services/user.service";
import Loading from "./Loading";

const musicStyles = ['Classic Rock', 'Alternative', 'Rock', 'Hip-Hop/Rap', 'Techno', 'Metal', 'Blues'];

class PickStyles extends Component {

    componentDidMount() {
    }

    toggleLoading() {
        this.props.toggleLoading();
    }

    render() {
        return (
            <ScrollView>
                <View style={{padding: 15}}>
                    <Text style={styles.header}>Tell us what you're into.</Text>
                    <Text style={styles.subHeader}>Tap once on the genres you like, or twice on the ones you love. Press and hold the ones you don't.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        {
                            musicStyles.map((style, index) => {
                                return <Button key={index} style={[styles.bubble, {left: 150 * (index % 2), top: 150 * (Math.floor(index/2))}]}>
                                    <Text style={{color: '#fff', textAlign: 'center'}}>{style}</Text>
                                </Button>
                            })
                        }
                    </View>
                </View>
                <Loading/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        fontSize: 26,
        textAlign: 'center',
        fontWeight: '300',
        marginBottom: 10
    },
    subHeader: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15
    },
    bubble: {
        backgroundColor: '#D0789C',
        borderRadius: 75,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PickStyles);
