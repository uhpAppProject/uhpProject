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
      }
from 'react-native';

import { AppLoading, Asset, Font, Icon } from 'expo';

import FormData from 'FormData';

import { Linking } from 'expo';

import { StackActions, NavigationActions } from 'react-navigation';

import FontAwesome
from '../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons
from '../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

export default class StartPage extends Component {
//works for valid users, throws a parse error for invalid users
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

  _onPress = () => {
    const{navigate} = this.props.navigation;
      navigate('Login');
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
      MaterialIcons
    })
  ]);
};

_handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

_handleFinishLoading = () => {
  this.setState({ isLoading: false });
};

//goes to forgot password too many times
/*componentWillMount(){
  Linking.getInitialURL().then(url => {
    if(Linking.parse(url).path == 'ForgotPassword' && this.state.passwordReset == 'false'){
        this.props.navigation.navigate('ForgotPasswordNavigator');
      }
    })
  }*/

  componentDidMount(){
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

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={ () => this._onPress()}>

            <Text style={styles.title}>SIGN IN</Text>
          </TouchableOpacity>

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
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgb(165,36,59)',
    height: '15%',
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
    color: 'white',
    textAlign: 'center',
    fontSize: (.04 * Dimensions.get('window').height),
    fontFamily: 'Helvetica Neue',
  },

  }
);
