import React, {Component} from 'react';
import {Button} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
const DOUBLE_PRESS_DELAY = 400;

export default class Bubble extends Component {


    onDoublePress() {
        if (this.pressTimeout) {
            this.onSelect('double');
            this.clearTimeout(this.pressTimeout);
            this.pressTimeout = null;
        } else {
            this.pressTimeout = this.setTimeout(() => {
                this.onSelect('single');
                this.pressTimeout = null;
            }, DOUBLE_PRESS_DELAY);
        }
    }

    onSelect(type) {
        this.props.onSelect && this.props.onSelect({type: type, name: this.props.text});
    }

    getBubbleStyle() {
        const random = Math.floor(Math.random() * 60) + 130;
        return {
            width: random,
            height: random,
            borderRadius: random / 2
        }
    }

    render() {
        return (
            <Button
                onLongPress={() => {
                    this.onSelect('long');
                }}
                onPress={() => this.onDoublePress()}
                style={[styles.bubble, this.getBubbleStyle()]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>{this.props.text}</Text>
            </Button>
        )
    }
};

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: '#D0789C',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        padding: 20
    }
});

reactMixin(Bubble.prototype, TimerMixin);

