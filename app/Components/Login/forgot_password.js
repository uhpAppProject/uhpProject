import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import { Linking } from 'expo';

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

  _generateCode(){
    var digits = '0123456789';
    var code = '';
    for (let i = 0; i < 6; i++ ) {
        code += digits[Math.floor(Math.random() * 10)];
    }
    this.state.code = code;
  }
  _sendEmailLink = (url) => {
      if(this.state.email != '') {

        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('link', Linking.makeUrl('ForgotPassword', { email: this.state.email, code: this.state.code }));
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
              alert('Check your email!')
            }
          this.setState( {email_sent: true} )
          })
        .catch((error) => {
          console.error(error);
        });
      }
    }

  _checkPin(pin){
    if(pin==this.state.code){
      this.props.navigation.navigate('NewPassword', {
        email: this.state.email,
        title: 'Password Reset'
      });
      }
    }

  componentWillMount(){
    Linking.getInitialURL().then(url => {
      if(Linking.parse(url).path == 'ForgotPassword'){
        this.setState({
          email: Linking.parse(url).queryParams.email,
          code: Linking.parse(url).queryParams.code,
          email_sent: true,
        });
      }
      else{
        this._generateCode();
      }
    })
  }
  render() {

    if(!this.state.email_sent){
    return (
      <View style={styles.container}>

      <Text style={styles.text}>Enter SCU Email</Text>

        <TextInput
          placeholder='SCU Email'
          returnKeyType='go'
          onSubmitEditing={() => this._sendEmailLink(IP + '/forgot_password_email.php')}
          onChangeText={(input) => this.state.email = input}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this._sendEmailLink(IP + '/forgot_password_email.php')}>

            <Text style={styles.buttonText}>SUBMIT</Text>

          </TouchableOpacity>

      </View>
    );
  }
  else{
    return(
        <View style={styles.container}>

        <Text style={styles.text}>Enter The 6 Digit Pin From Your Email</Text>

          <TextInput
            placeholder='Enter Pin'
            returnKeyType='go'
            onSubmitEditing={(input) => this._checkPin(input)}
            onChangeText={(input) => this.state.input = input}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._checkPin(this.state.input)}>

              <Text style={styles.buttonText}>SUBMIT</Text>

            </TouchableOpacity>

        </View>
        );
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  text: {
    fontSize: (.03 * Dimensions.get('window').height),
    textAlign: 'center',
    marginBottom: '10%',
    marginTop: '5%',
  },
  input: {
    height: 40,
    backgroundColor: '#B7B0B0',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(165,36,59)',
    paddingVertical: 35
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  }

})
