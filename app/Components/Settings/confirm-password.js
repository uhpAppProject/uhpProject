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

import IP from '../../../assets/ip.js';

export default class ConfirmPassword extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
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


  _newPasswordScreen() {
    const{navigate} = this.props.navigation;
      navigate('NewPassword', {
        email: this.props.email,
        title: 'Settings',
      });
  }
  _onPress(url) {
        if(this.state.password != '') {

          var formData = new FormData();
          formData.append('email', this.props.email);
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
                  this._newPasswordScreen()
                }
                else{
                  alert('Your password is incorrect')
                }
            })
          .catch((error) => {
            console.error(error);
          });
        }
      }


  render() {

    return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
        <View style={styles.container}>

          <Text style={styles.text}>Confirm Password</Text>

          <TextInput
            placeholder='Re-Enter Password'
            returnKeyType='go'
            style={styles.input}
            secureTextEntry
            onChangeText={(input) => this.state.password = input}
            onSubmitEditing={() => this._onPress(IP+ '/login.php')}
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
    fontFamily: 'Helvetica Neue',
  },
  input: {
    height: (.05 * Dimensions.get('window').height),
    width: (.94 * Dimensions.get('window').width),
    backgroundColor: '#B7B0B0',
    marginTop: '5%',
    marginBottom: '5%',
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
