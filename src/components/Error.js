import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text} from 'react-native';

class Loading extends Component {
    render() {
        return (
            this.props.app.error && <Text style={styles.error}>{this.props.app.errorMessage}</Text>
        );
    }
}

const styles = StyleSheet.create({
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
