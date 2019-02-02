/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Start Page of the app.
 * Notable Features: Preloads all the images the app will need later.
 *                   Page also contains a button that will navigate to
 *                   Another page. Pressable text for uninitialized users
 *                   to login.
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

import { AppLoading, Asset, Font, Icon } from 'expo';

import FormData from 'FormData';

import { StackActions, NavigationActions } from 'react-navigation';

import FontAwesome
from '../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons
from '../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

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
    /*
     * Function uses react navigation to move to the next page in the application.
     * It takes in a page to navigate to and an object with parameters to be passed
     * to the next page
     */

    const{navigate} = this.props.navigation;
      navigate(page, navObj);
    }

  _errorNav(error){
    /*
     * A function designed only to navigate to the "error page" using React Navigation.
     * It is special because it passes information about an app error to the error page
     */

    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: "Start Page Error",
        error: error
      });
  }

  _loadResourcesAsync = async => {
  return Promise.all([
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

  _handleLoadingError = error => {
    this._errorNav(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoading: false });
  };

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
              onPress={ () => this._navigateTo('Login',{info: null})}>

              <Text style={styles.title}>SIGN IN</Text>

            </TouchableOpacity>

            <Text style={styles.bottomText} onPress={() => this._navigateTo('Participation', {email: 'Non-Honors'})}>Not A Member?</Text>

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
    size: .05 * Dimensions.get('window').width,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginBottom: '7%',
  },

  }
);
