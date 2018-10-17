import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
        Switch
} from 'react-native';
import Login from './app/Components/Login/login.js'

export default class uhpApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: false
    };
  }

  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
});
