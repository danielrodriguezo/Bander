import {UserActionCreator} from "../action-creators/user.action-creator";
import {AppStateActionCreator} from "../action-creators/app-state.action-creator";
import {NavigationActions} from 'react-navigation';

const validateForm = (formData) => {
    if (formData) {
        if (typeof formData.email === 'string' && typeof formData.password === 'string'
            && formData.email.length > 0 && formData.password.length > 0) {
            return {success: true};
        }
    }
    return {success: false, error: 'Please fill in both fields'};
};

export const UserService = {
    signUp: (formData) => {
        return (dispatch) => {
            // todo: implement sign up
            const formValid = validateForm(formData);
            if (formValid.success === true) {
                setTimeout(() => {
                    const mockSignUpResponse = {success: true, data: {id: 123}};
                    if (mockSignUpResponse.success === true) {
                        dispatch(AppStateActionCreator.raiseError(false));
                        dispatch(UserActionCreator.signUp(mockSignUpResponse.data));
                        dispatch(AppStateActionCreator.toggleLoading(false));
                        dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'ExtraSignUpData'})
                            ]
                        }));
                    } else {
                        dispatch(AppStateActionCreator.toggleLoading(false));
                        dispatch(AppStateActionCreator.raiseError(true, mockSignUpResponse.error ? mockSignUpResponse.error : 'Error'));
                    }
                }, 1);
            } else {
                dispatch(AppStateActionCreator.toggleLoading(false));
                dispatch(AppStateActionCreator.raiseError(true, formValid.error));
            }
        }
    },
    signIn: (formData) => {
        return (dispatch) => {
            // todo: implement sign in
            const formValid = validateForm(formData);
            if (formValid.success === true) {
                setTimeout(() => {
                    const mockSignInResponse = {
                        success: true,
                        data: {id: 123, email: 'lironzluf@gmail.com', firstName: 'Liron', lastName: 'Zluf'}
                    };
                    if (mockSignInResponse.success === true) {
                        dispatch(AppStateActionCreator.raiseError(false));
                        dispatch(UserActionCreator.signIn(mockSignInResponse.data));
                        dispatch(AppStateActionCreator.toggleLoading(false));
                        dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Search'})
                            ]
                        }));
                    } else {
                        dispatch(AppStateActionCreator.toggleLoading(false));
                        dispatch(AppStateActionCreator.raiseError(true, mockSignInResponse.error ? mockSignInResponse.error : 'Error'));
                    }
                }, 1);
            } else {
                dispatch(AppStateActionCreator.toggleLoading(false));
                dispatch(AppStateActionCreator.raiseError(true, formValid.error));
            }
        }
    },
    extraSignupData: (formData) => {
        return (dispatch) => {
            dispatch(UserActionCreator.extraSignupData(formData));
            dispatch(AppStateActionCreator.toggleLoading(false));
            dispatch(AppStateActionCreator.raiseError(false));
            dispatch(NavigationActions.navigate({routeName: 'PickStyles'}));
        }
    }
};
