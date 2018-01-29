import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import Loading from "./Loading";
import Bubble from "./Bubble";
import {UtilsService} from "../services/utils.service";
let musicStyles = ['Classic Rock', 'Alternative', 'Rock', 'Hip-Hop/Rap', 'Techno', 'Metal', 'Blues'];
musicStyles = UtilsService.shuffle(musicStyles);
class PickStyles extends Component {

    componentDidMount() {
        this.setWindowWidth(Dimensions.get('window'));
        Dimensions.addEventListener('change', this.setWindowWidth);
    }

    setWindowWidth({width}) {
        this.width = width;
    }

    toggleLoading() {
        this.props.toggleLoading();
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <Text style={styles.header}>Tell us what you're into.</Text>
                <Text style={styles.subHeader}>Tap once on the genres you like, or twice on the ones you love. Press and
                    hold the ones you don't.</Text>
                <View style={{flexDirection: 'row', marginLeft: 15}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        musicStyles.map((genre, index) => {
                            return index % 2 === 0 && <Bubble text={genre} index={index} key={index} />
                        })
                    }
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        musicStyles.map((genre, index) => {
                            return index % 2 === 1 && <Bubble text={genre} index={index} key={index} />
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
