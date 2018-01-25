import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/store/';
import AppWithNavigationState from "./src/navigators/AppNavigator.js";

const store = configureStore({});

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}
