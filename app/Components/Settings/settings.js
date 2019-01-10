import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        Dimensions,
        TouchableOpacity,
      }
from 'react-native';

import { withNavigation, StackActions, NavigationActions } from 'react-navigation';


export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {
  }
}

static navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
    color: 'white',
    fontSize: (.03 * Dimensions.get('window').height),
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '2%',
    marginLeft: '.05%',
  },
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: '#B30738',
    borderBottomWidth: 0,
    elevation: 0,
  },
};

_onPressResetPassword() {
  const{navigate} = this.props.navigation;
    navigate('PasswordReset');
}

_onPressSignOut() {
  const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [
    NavigationActions.navigate({ routeName: 'Start' })
  ],
  });

  this.props.navigation.dispatch(resetAction);
}
  render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._onPressResetPassword()}>

            <Text>Password Reset</Text>

          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._onPressSignOut()}>

            <Text>Sign Out</Text>

          </TouchableOpacity>
        </View>

      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#EAEAEA'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    height: '10%',
    backgroundColor: 'white',
  },
  text: {
    fontSize: (.15 * Dimensions.get('window').width),
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
