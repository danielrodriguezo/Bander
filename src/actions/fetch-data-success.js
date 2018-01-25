import {FETCH_DATA_SUCCESS} from '../constants/action-names';

export const fetchDataSuccess = (weatherInfo) => (
    {
        type: FETCH_DATA_SUCCESS,
        payload: {weatherInfo},
    }
);
