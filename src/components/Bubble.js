import React, {Component} from 'react';
import {Button} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
const DOUBLE_PRESS_DELAY = 400;

export default class Bubble extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '#D0789C'
        }
    }

    onDoublePress() {
        if (this.pressTimeout) {
            this.propagateOnSelect('double');
            this.setColor('#f0262c');
            this.clearTimeout(this.pressTimeout);
            this.pressTimeout = null;
        } else {
            this.pressTimeout = this.setTimeout(() => {
                this.propagateOnSelect('single');
                this.setColor('#f05e5d');
                this.pressTimeout = null;
            }, DOUBLE_PRESS_DELAY);
        }
    }

    onLongPress() {
        this.propagateOnSelect('long');
        this.setColor('#CCC')
    }

    propagateOnSelect(type) {
        this.props.onSelect && this.props.onSelect({type: type, name: this.props.text});
    }

    setColor(color) {
        this.setState({
            color
        })
    }

    getBubbleStyle() {
        const size = this.props.size;
        return {
            width: size,
            height: size,
            borderRadius: size / 2
        }
    }

    render() {
        return (
            <Button
                onLongPress={() => this.onLongPress()}
                onPress={() => this.onDoublePress()}
                style={[styles.bubble, this.getBubbleStyle(), {backgroundColor: this.state.color}]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>{this.props.text}</Text>
            </Button>
        )
    }
};

const styles = StyleSheet.create({
    bubble: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        padding: 20
    }
});

reactMixin(Bubble.prototype, TimerMixin);

