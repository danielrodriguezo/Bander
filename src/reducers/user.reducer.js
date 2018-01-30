import {SIGN_UP, SIGN_IN, EXTRA_SIGNUP_DATA, SET_USER_STYLES} from '../constants/action-names';

const initialState = {
    id: -1
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
        case SIGN_IN:
        case EXTRA_SIGNUP_DATA:
            return {...state, ...action.payload};
        case SET_USER_STYLES:
            return {...state, ...{styles: action.styles}};
        default:
            return state;
    }
};

export default userReducer;
