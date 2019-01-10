import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Async,
} from 'react-native';

import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      isValid: false,
      isLoading: true
    };
  }

  login () {
      const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: 'Participation', params: {email: this.state.email}})
      ],
      });

      this.props.navigation.dispatch(resetAction);
    }


  _loginCheck = (url) => {
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
                this.login()
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

  forgotPassword() {
    const{navigate} = this.props.navigation;
    navigate('ForgotPassword')
  }

  render() {

    //  const ip = 'www.scuhonors.com'; //web host
    //    const ip = '127.0.0.1';  //local host
        const ip = '172.20.111.24'

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
          onSubmitEditing={() => this._loginCheck('http://'+ ip + '/login.php')}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this._loginCheck('http://'+ ip + '/login.php')}>

            <Text style={styles.buttonText}>SUBMIT</Text>

          </TouchableOpacity>

          <Text style={styles.text} onPress={ () => this.forgotPassword()}>Forgot your password?</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    textAlign: 'center',
    marginBottom: '5%',
    marginTop: '5%',
  },
  input: {
    height: 40,
    backgroundColor: '#B7B0B0',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#B30738',
    paddingVertical: 35
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  }

})

export default withNavigation(LoginForm);
