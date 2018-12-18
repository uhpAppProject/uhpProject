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

import { StackActions, NavigationActions } from 'react-navigation';

export default class StartPage extends Component {
//works for valid users, throws a parse error for invalid users
  constructor(props) {
  super(props);
  this.state = {
    user_email: 'jsnow@scu.edu',
    isLoading: true,
    alreadyStored: false,
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

postEmailAsync = (url, email, asyncTitle) => {

    var formData = new FormData();
    formData.append('email', email);

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
        AsyncStorage.setItem(asyncTitle, JSON.stringify(responseJson));
      })
    .catch((error) => {
      console.error(error);
    });
  }

fetchEventsAsync = (url, asyncTitle) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem(asyncTitle, JSON.stringify(responseJson));
      })
    .catch((error) => {
      console.error(error);
    });
  }

  _onPress = () => {
    const{navigate} = this.props.navigation;
      navigate('Login');
    }


  _loadResourcesAsync = async => {
    const ip = 'www.scuhonors.com'; //web host
  //    const ip = '127.0.0.1:8888';  //local host
  //    const ip = '192.168.1.109:8888'
  return Promise.all([
    Asset.loadAsync([
      require("../../Images/SCU-Seal_Outlined_201-2-2.jpg"),
      require("../../Images/paticipation_status_background.png"),
      require("../../Images/upcoming_events_background.png"),
      require("../../Images/MissionChurch2.jpg"),
      require("../../Images/event_reqs.png"),
      require("../../Images/participation_faq.jpg")
    ]),
  ]);
};

_handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

_handleFinishLoading = () => {
//  const ip = 'www.scuhonors.com'; //web host
//    const ip = '127.0.0.1:8888';  //local host
    const ip = '192.168.1.109:8888'
  this.fetchEventsAsync('http://'+ ip + '/select_all_from_events.php', 'Events');
  this.postEmailAsync('http://' + ip + '/participation_status_query.php', this.state.user_email, 'userInfo');
  this.setState({ isLoading: false });
};

_initializeData = () => {

}

  render() {
    const ip = 'www.scuhonors.com'; //web host
  //    const ip = '127.0.0.1:8888';  //local host
  //    const ip = '192.168.1.109:8888'

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
