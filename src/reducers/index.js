import {combineReducers} from 'redux';
import appReducer from './app-state.reducer';
import navReducer from './nav.reducer';
import userReducer from './user.reducer';


// Root Reducer
const rootReducer = combineReducers({
    nav: navReducer,
    app: appReducer,
    user: userReducer
});

export default rootReducer;
