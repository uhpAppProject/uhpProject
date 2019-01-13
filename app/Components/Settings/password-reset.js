import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import ConfirmPassword from './confirm-password.js'

import IP from '../../../assets/ip.js';

export default class PasswordReset extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      credentialsEntered: false,
    };
  }

  static navigationOptions = {
    headerTitleStyle: {
      color: 'white',
      fontSize: (.03 * Dimensions.get('window').height),
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'Helvetica Neue',
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


  _onPress(url) {
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
                  this.setState( {credentialsEntered: true} )
                }
                else{
                  alert('Your email or password is incorrect')
                }
            })
          .catch((error) => {
            console.error(error);
          });
        }
      }


  render() {

    if(!this.state.credentialsEntered) {
      return (
        <KeyboardAvoidingView behavior = "padding" style={styles.container}>
          <View style={styles.container}>

            <Text style={styles.text}>Enter Login Credentials</Text>

            <TextInput
              placeholder='Enter SCU Email'
              returnKeyType='next'
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={(input) => this.state.email = input}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.input}
              />

            <TextInput
              placeholder='Enter Current Password'
              returnKeyType='go'
              style={styles.input}
              secureTextEntry
              ref={(input) => this.passwordInput = input}
              onChangeText={(input) => this.state.password = input}
              onSubmitEditing={() => this._onPress(IP + '/login.php')}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this._onPress(IP + '/login.php')}>

                <Text style={styles.buttonText}>SUBMIT</Text>

              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        );
      }
    else {
      return(
        <ConfirmPassword email={this.state.email} navigation={this.props.navigation}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: (.05 * Dimensions.get('window').width),
    textAlign: 'center',
    marginBottom: '5%',
    fontFamily: 'Helvetica Neue',
  },
  input: {
    height: (.05 * Dimensions.get('window').height),
    width: (.94 * Dimensions.get('window').width),
    backgroundColor: '#B7B0B0',
    marginBottom: '3%',
    paddingHorizontal: (.02 * Dimensions.get('window').width),
  },
  buttonContainer: {
    height: (.15 * Dimensions.get('window').height),
    width: (.94 * Dimensions.get('window').width),
    justifyContent: 'center',
    backgroundColor: 'rgb(165,36,59)',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: (.05 * Dimensions.get('window').width),
    fontFamily: 'Helvetica Neue',
  }

})
