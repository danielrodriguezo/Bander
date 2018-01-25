import {TOGGLE_LOADING, RAISE_ERROR} from '../constants/action-names';

export const AppStateActionCreator = {
    toggleLoading: (loadingState) => ({
        type: TOGGLE_LOADING,
        loadingState: loadingState
    }),
    raiseError: (status, message = '') => ({
        type: RAISE_ERROR,
        error: status,
        message
    })
};

