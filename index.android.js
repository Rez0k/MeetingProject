/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './app/components/Main';
import {AppRegistry} from 'react-native';
import {I18nManager} from 'react-native';

if (I18nManager.isRTL) {
  I18nManager.allowRTL(false);
  RNRestart.Restart();
}

export default class HelloNDC extends Component {
  render() {
    return ( 
      <Main/>
    );
  }
}

AppRegistry.registerComponent('HelloNDC', () => HelloNDC);
