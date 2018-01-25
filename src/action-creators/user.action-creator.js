import {SIGN_UP, SIGN_IN} from '../constants/action-names';

export const UserActionCreator = {
    signUp: (payload) => ({
        type: SIGN_UP,
        payload
    }),
    signIn: (payload) => ({
        type: SIGN_IN,
        payload
    })
};

