/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Setting menu
 * Notes: Buttons that navigate to other screens from the settings menu
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        Dimensions,
        TouchableOpacity,
        Platform,
      }
from 'react-native';

import { withNavigation, StackActions, NavigationActions } from 'react-navigation';


export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {}
}

static navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
    color: 'white',
    fontSize: (.06 * Dimensions.get('window').width),
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  headerRight: <View style={{padding: .08 * Dimensions.get('window').width}}></View>,
  headerRightContainerStyle: {
    marginLeft: '2%',
    marginRight: '.05%',
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

  _navigateTo = (page, navObj) => {
     // Function uses react navigation to move to the next page in the application.
     // It takes in a page to navigate to and an object with parameters to be passed
     // to the next page

    const{navigate} = this.props.navigation;
      navigate(page, navObj);
    }

  _navigateToAndReset (page, navObj) {
    // Function uses react navigation to move to the next page in the application while
    // clearing the current navigation stack. It takes in a page to navigate to and an
    // object with parameters to be passed to the next page

      const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: page, params: navObj})
      ],
      });

      this.props.navigation.dispatch(resetAction);
    }

  render() {
      return (
        <View style={styles.container}>

          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this._navigateToAndReset('Start', {})}>

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
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});
