/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Provides a way for a user to change their password if they forgot it.
 * Notable Features: A function that generates a code to be emailed to the user.
 *                   A function that calls a script to email the user. A couple of
 *                   text inputs and buttons.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import IP from '../../../assets/ip.js';

export default class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      code: '',
      email_sent: false,
      input:'',
    };
  }

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
      marginLeft: '.05%'
    },
  };

  _error_Nav(email, error){
    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: email,
        error: error
      });
  }

  _generateCode(){
    var digits = '0123456789';
    var code = '';
    for (let i = 0; i < 6; i++ ) {
        code += digits[Math.floor(Math.random() * 10)];
    }
    this.state.code = code;
  }

  _sendEmail = (url) => {
    /*
     * Calls a PHP script that sends an email to the user
     * with a code generated in the app.
    */

      if(this.state.email != '') {

        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('code', this.state.code);

        fetch( url , {
          method: 'POST',
          body: formData,
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
          }
        })
          .then((response) => response.text())
          .then((responseText) => {
            if(responseText){
              alert(responseText);
            }
            else{
              alert("Don't close the app! And check your email!")
            }
          this.setState({email_sent: true})
          })
        .catch((error) => {
          this.error_Nav(this.state.email, error)
        });
      }
    }

  _checkCode(code){
    /*
     * Checks to see if the correct code was entered.
     * Navigates to a screen where the user can reset
     * their password if correct code was entered.
     */

    if(code==this.state.code){
      this.props.navigation.navigate('NewPassword', {
        email: this.state.email,
        title: 'Password Reset'
      });
      }
    }

  componentWillMount() {
    this._generateCode();
  }

  render() {

    if(!this.state.email_sent){
    return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
        <View style={styles.container}>

          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/Images/SCU_honors_logo_black.jpg')}
            />

          </View>

          <Text style={styles.text}>Enter SCU Email</Text>

          <TextInput
            clearButtonMode="always"
            placeholder='SCU Email'
            returnKeyType='go'
            value={this.state.inputValue}
            onSubmitEditing={() => { this._sendEmail(IP + '/forgot_password_email.php') }}
            onChangeText={(input) => this.state.email = input}
            ref={input => { this.textInput = input }}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._sendEmail(IP + '/forgot_password_email.php')}>

              <Text style={styles.buttonText}>SUBMIT</Text>

            </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
  else{
    return(
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
          <View style={styles.container}>

            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/Images/SCU_honors_logo_black.jpg')}
              />

            </View>

            <Text style={styles.text}>Enter The 6 Digit Pin From Your Email</Text>

            <TextInput
              clearButtonMode="always"
              placeholder='Enter Pin'
              returnKeyType='go'
              onSubmitEditing={(input) => this._checkCode(input)}
              onChangeText={(input) => this.state.input = input}
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.input}
              />

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this._checkCode(this.state.input)}>

                <Text style={styles.buttonText}>SUBMIT</Text>

              </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>
        );
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: (.02 * Dimensions.get('window').width),
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: (.05 * Dimensions.get('window').width),
    textAlign: 'center',
    marginBottom: '5%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
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
  input: {
    height: 40,
    backgroundColor: '#B7B0B0',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(165,36,59)',
    paddingVertical: .052 * Dimensions.get('window').height,
    marginBottom: .02 * Dimensions.get('window').height,
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
