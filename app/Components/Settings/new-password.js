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

import { Linking } from 'expo';

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


  _onPressHome() {
    this.props.navigation.dispatch(StackActions.popToTop())
  }

  _onPress(url) {
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
                this._onPressHome();
              }
              else{
                alert('There was a problem updating your password')
              }
            })
          .catch((error) => {
            console.error(error);
          });
        }
        else{
          alert('Passwords Do Not Match')
        }
      }

  componentWillMount(){
    Linking.getInitialURL().then(url => {
      if(Linking.parse(url).path == 'ForgotPassword'){
        this.state.email = Linking.parse(url).queryParams.email;
        this.state.fromDeeplink = true;
      }
      else{
        const { navigation } = this.props;
        this.state.email = navigation.getParam('email', 'No Title');
      }
    })
  }


  render() {

    return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
        <View style={styles.container}>

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
            onSubmitEditing={() => this._onPress(IP + '/update_password.php')}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._onPress(IP + '/update_password.php')}>

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
