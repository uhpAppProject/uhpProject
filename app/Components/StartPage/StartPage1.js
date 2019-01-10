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

export default class StartPage extends Component {
//works for valid users, throws a parse error for invalid users
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    passwordReset: '',
  }
};
  static navigationOptions = {
    headerStyle: {
      height: (.01 * Dimensions.get('window').height),
      borderBottomWidth: 0,
      backgroundColor: '#B30738',
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
      require("../../Images/SCU-Seal_Outlined_201-2-2.jpg"),
      require("../../Images/paticipation_status_background.png"),
      require("../../Images/upcoming_events_background.png"),
      require("../../Images/MissionChurch2.jpg"),
      require("../../Images/event_reqs.png"),
      require("../../Images/participation_faq.jpg"),
      require('../../Images/images.jpg')
    ]),
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
componentWillMount(){
  const { navigation } = this.props;
  this.state.passwordReset = navigation.getParam('Reset', 'false');
  alert(this.state.passwordReset)
  }

  componentDidMount(){
    Linking.getInitialURL().then(url => {
      if(Linking.parse(url).path == 'ForgotPassword' && this.state.passwordReset == 'false'){
          this.props.navigation.navigate('ForgotPassword');
        }
      })
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
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Santa Clara University</Text>
            <Text style={styles.title}>Honors Program</Text>
          </View>
          <Image source={require("../../Images/SCU-Seal_Outlined_201-2-2.jpg")}
                        style={styles.logoContainer}></Image>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={ () => this._onPress()}>

            <Text style={styles.title}>Sign In</Text>
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
  headerContainer: {
    backgroundColor: '#B30738',
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '19%',
  },
  logoContainer: {
    height: '50%',
    width: '85%',
    resizeMode: 'contain'
  },
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: '#B30738',
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
  },

  }
);
