/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Container for the app's login form
 * Notable Features: Contains a login form
 */

import React, { Component } from 'react';

import {
        StyleSheet,
        View,
        Image,
        Text,
        KeyboardAvoidingView,
        Dimensions,
        Platform,
      }
from 'react-native';

import LoginForm from './loginform';

export default class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      borderBottomWidth: 0,
      backgroundColor: 'rgb(165,36,59)',
      elevation: 0,
    },
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
      marginLeft: '.05%',
    },
  };


  render() {
    return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/Images/SCU_honors_logo_black.jpg')}
            />

          </View>
          <View style={styles.formContainer}>
            <LoginForm />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  logo: {
    height: '25%',
    width: '60%',
    resizeMode: 'contain'
  },
});
