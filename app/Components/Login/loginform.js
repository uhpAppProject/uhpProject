import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      isLoading: true
    };
  }

  login () {
    const username = this.state.username;
    const password = this.state.password;
    alert(username + ' ' + password);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
          />
        <TextInput
          placeholder='username'
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(input) => this.state.username = input}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          />
        <TextInput
          placeholder='password'
          returnKeyType='go'
          style={styles.input}
          secureTextEntry
          ref={(input) => this.passwordInput = input}
          onChangeText={(input) => this.state.password = input}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.login()}>

            <Text style={styles.buttonText}>LOGIN</Text>

          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2902b9',
    paddingVertical: 35
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }

})
