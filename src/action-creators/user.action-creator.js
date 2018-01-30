import {SIGN_UP, SIGN_IN, EXTRA_SIGNUP_DATA, SET_USER_STYLES} from '../constants/action-names';

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
    }),
    setUserStyles: (styles) => ({
        type: SET_USER_STYLES,
        styles
    })
};

