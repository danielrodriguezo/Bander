import React, {Component} from 'react';
import {Button} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
const DOUBLE_PRESS_DELAY = 400;

export default class Bubble extends Component {


    onDoublePress() {
        if (this.pressTimeout) {
            console.log('double press');
            this.clearTimeout(this.pressTimeout);
            this.pressTimeout = null;
        } else {
            this.pressTimeout = this.setTimeout(() => {
                console.log('single press');
                this.pressTimeout = null;
            }, DOUBLE_PRESS_DELAY);
        }
    }

    getBubbleStyle() {
        const random = Math.floor(Math.random() * 60) + 90;
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
                    console.log('long press');
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

