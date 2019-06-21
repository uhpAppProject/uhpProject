/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Start Page of the app.
 * Notes: This screen preloads all the images the app will need later.
 *                   Page also contains a button that will navigate to
 *                   the participation home screen. There is also code that connects to
 *                   a google sign in form in the app. The form pops up in a browser allowing
 *                   users to sign in with a google (or their SCU login).
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        ActivityIndicator,
        Dimensions,
        Platform,
      }
from 'react-native';

import { AppLoading, Asset, Font, Icon, Google } from 'expo';

import FormData from 'FormData';

import { StackActions, NavigationActions } from 'react-navigation';

import FontAwesome
from '../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons
from '../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

import { Urls } from '../../../urls.js';

export default class StartPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
  }
};
  static navigationOptions = {
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      borderBottomWidth: 0,
      backgroundColor: 'rgb(165,36,59)',
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

  _errorNav(error){
     // A function designed only to navigate to the "error page" using React Navigation.
     // It is special because it passes information about an app error to the error page

    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: "Start Page Error",
        error: error
      });
  }

  _loadResourcesAsync = async => {
  return Promise.all([ // Loading all of the fonts and images now so they can be quickly rendered later
    Asset.loadAsync([
      require("../../../assets/Images/SCU_honors_logo_red.jpg"),
      require("../../../assets/Images/paticipation_status_background.png"),
      require("../../../assets/Images/upcoming_events_background.png"),
      require("../../../assets/Images/MissionChurch2.jpg"),
      require("../../../assets/Images/event_reqs.png"),
      require("../../../assets/Images/participation_faq.jpg"),
      require('../../../assets/Images/SCU_honors_logo_black.jpg'),
    ]),
    Font.loadAsync({
      FontAwesome,
      MaterialIcons,
    })
  ]);
};

_navigateToAndReset (page, navObj) {
     // Will navigate to another screen with an object attached and reset the navigation stack
     // so the current page can't be returned to

    const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: page, params: navObj})
    ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  _handleLoadingError = error => {
    this._errorNav(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoading: false }); // Re-render the page after change of state
  };

  googleSignIn = async() => {
     // Uses a given Google ClientId to sign users into the app using their google account
      const iOSclientId = Urls.iOSGoogleClientId;
      const androidClientId = Urls.androidGoogleClientId
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: iOSclientId, // Note, only ios currently
        androidClientId: androidClientId,
        scopes: ["profile", "email"] });

      if (type === 'success') {
        /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
        this._navigateToAndReset('Participation', {email: user.email});
      }
  }

  render() {

    if( this.state.isLoading ){
      return(

        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color='#B30738' />

          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Image source={require("../../../assets/Images/SCU_honors_logo_red.jpg")}
                 style={styles.logoContainer}></Image>

          <View style={styles.bottomContainer}>

            <TouchableOpacity
              style={styles.buttonContainer}
      //        onPress={ () => this._navigateToAndReset('Participation', {email: 'bjust@scu.edu'}) }>
              onPress={ () => this.googleSignIn()}>

              <Text style={styles.title}>SIGN IN</Text>

            </TouchableOpacity>

            <View>
              <Text // Gives a user the option to sign in without a google accout with limited functionality
                style={styles.bottomText}
                onPress={() => this._navigateToAndReset('Participation', {email: 'Non-Honors'})}>I am just visiting</Text>
            </View>

          </View>

        </View>
        )
      }
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginTop: '20%',
    height: '50%',
    width: '85%',
    resizeMode: 'contain'
  },
  bottomContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgb(165,36,59)',
    height: '40%',
    width: '94%',
    marginBottom: '5%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: (.05 * Dimensions.get('window').width),
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  bottomText: {
    size: .08 * Dimensions.get('window').width,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginBottom: '7%',
    textDecorationLine: 'underline',
  },
});
