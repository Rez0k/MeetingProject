/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './app/components/Main';
import {AppRegistry} from 'react-native';

export default class HelloNDC extends Component {
  render() {
    return ( 
      <Main/>
    );
  }
}



AppRegistry.registerComponent('HelloNDC', () => HelloNDC);
