import {RAISE_ERROR, TOGGLE_LOADING,} from '../constants/action-names';

const initialState = {
    isLoading: false,
    error: false,
    errorMessage: ''
};

const appStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: state.loadingState ? state.loadingState : !state.isLoading
            };
        case RAISE_ERROR:
            return {...state, ...{error: action.error, errorMessage: action.message}};
        default:
            return state;
    }
};

export default appStateReducer;
