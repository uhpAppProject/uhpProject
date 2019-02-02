/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Contains functions that will log user into the app.
 * Notable Features: 2 text inputs for username and password.
 *                   A button to login. And pressable text for
 *                   a forgotten password.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from 'react-native';

import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

import IP from '../../../assets/ip.js';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
    };
  }

  _error_Nav(email, error){
    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: email,
        error: error
      });
  }

  _navigateToAndReset (page, navObj) {
      const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: page, params: navObj})
      ],
      });

      this.props.navigation.dispatch(resetAction);
    }

  _login = (url) => {
    /*
     * First checks the database located at url to see if the user
     * trying to login exists. If the user exists then the function
     * "_navigateToAndReset" is called.
     */

      if(this.state.email != '' && this.state.password != '') {

        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        fetch( url , {
          method: 'POST',
          body: formData,
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
          }
        })
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson){
                this._navigateToAndReset('Participation', {email: this.state.email});
              }
              else{
                alert('Your email or password is incorrect')
              }
          })
        .catch((error) => {
          _this._error_Nav(this.state.email, error)
        });
      }
    }

  _navigateTo = (page, navObj) => {
    /*
     * Function uses react navigation to move to the next page in the application.
     * It takes in a page to navigate to and an object with parameters to be passed
     * to the next page
     */

    const{navigate} = this.props.navigation;
      navigate(page, navObj);
    }

  render() {

    return (
      <View style={styles.container}>
        <TextInput
          placeholder='SCU Email'
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(input) => this.state.email = input}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          />
        <TextInput
          placeholder='Password'
          returnKeyType='go'
          style={styles.input}
          secureTextEntry
          ref={(input) => this.passwordInput = input}
          onChangeText={(input) => this.state.password = input}
          onSubmitEditing={() => this._login(IP + '/login.php')}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this._login(IP + '/login.php')}>

            <Text style={styles.buttonText}>SUBMIT</Text>

          </TouchableOpacity>

          <Text style={styles.text} onPress={ () => this._navigateTo('ForgotPassword', {})}>Forgot your password?</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: (.02 * Dimensions.get('window').width)
  },
  text: {
    textAlign: 'center',
    marginBottom: '5%',
    marginTop: '5%',
    size: .05 * Dimensions.get('window').width,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  input: {
    height: 40,
    backgroundColor: '#B7B0B0',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(165,36,59)',
    paddingVertical: .052 * Dimensions.get('window').height,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: (.05 * Dimensions.get('window').width),
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  }

})

export default withNavigation(LoginForm);
