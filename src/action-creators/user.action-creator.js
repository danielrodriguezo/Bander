import {SIGN_UP, SIGN_IN, EXTRA_SIGNUP_DATA} from '../constants/action-names';

export const UserActionCreator = {
    signUp: (payload) => ({
        type: SIGN_UP,
        payload
    }),
    signIn: (payload) => ({
        type: SIGN_IN,
        payload
    }),
    extraSignupData: (payload) => ({
        type: EXTRA_SIGNUP_DATA,
        payload
    })
};

