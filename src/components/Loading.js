import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';

class Loading extends Component {
    render() {
        return (
            this.props.app.isLoading &&
            <View style={styles.loading}>
                <Spinner style={{marginBottom: 30}} size={100}
                         type="ArcAlt" color="#D0789C"/>
                <Text style={styles.loadingText}>Please Wait...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
