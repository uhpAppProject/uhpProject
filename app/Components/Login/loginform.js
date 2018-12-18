import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';

import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      isLoading: true
    };
  }

  login () {
    const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: 'Participation', params: {email: this.state.username}})
    ],
    });

    this.props.navigation.dispatch(resetAction);
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

            <Text style={styles.buttonText}>SUBMIT</Text>

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
