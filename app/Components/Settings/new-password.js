/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Allows a user to change their password
 * Notable Features: Text input. A function that calls a script that changes the users password.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import { StackActions } from 'react-navigation';

import IP from '../../../assets/ip.js';

export default class NewPassword extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      password_re:'',
      fromDeeplink: false,
    };
  }

  static navigationOptions = {
    headerTitleStyle: {
      color: 'white',
      fontSize: (.03 * Dimensions.get('window').height),
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
      marginLeft: '.05%',
    },
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      backgroundColor: 'rgb(165,36,59)',
      borderBottomWidth: 0,
      elevation: 0,
    },
  };

  _error_Nav(email, error){
    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: email,
        error: error
      });
  }

  _newPassword(url) {
    /*
     * Lets user define a new password. Navigates back to the home screen when finished.
     */
        if(this.state.password == this.state.password_re) {

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
                alert("Password was successfully changed");
                this.props.navigation.dispatch(StackActions.popToTop());
              }
              else{
                alert('There was a problem updating your password')
              }
            })
          .catch((error) => {
            _this._error_Nav(this.state.email, error);
          });
        }
        else{
          alert('Passwords Do Not Match')
        }
      }

  componentWillMount(){
      const { navigation } = this.props;
      this.state.email = navigation.getParam('email', 'No Title');
  }


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

          <Text style={styles.text}>Enter New Password</Text>

          <TextInput
            placeholder='Enter New Password'
            returnKeyType='next'
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={(input) => this.state.password = input}
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            />

          <TextInput
            placeholder='Re-Enter New Password'
            returnKeyType='go'
            style={styles.input}
            secureTextEntry
            ref={(input) => this.passwordInput = input}
            onChangeText={(input) => this.state.password_re = input}
            onSubmitEditing={() => this._newPassword(IP + '/update_password.php')}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._newPassword(IP + '/update_password.php')}>

              <Text style={styles.buttonText}>SUBMIT</Text>

            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
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
