import {SIGN_UP, SIGN_IN} from '../constants/action-names';

const initialState = {
    id: -1
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, ...action.payload};
        case SIGN_IN:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default userReducer;
