/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Home page of the app. Also loads data the app will need later.
 * Notes: Functions to fetch data from an external database. A few
 *                   buttons to navigate to other pages in the app.
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        ImageBackground,
        Dimensions,
        ActivityIndicator,
        Platform,
        Linking,
      }
from 'react-native';

import { AppLoading, Asset, Font, Icon} from 'expo';

import { Urls } from '../../../urls.js';

export default class ParticipationHome extends Component {
  constructor(props) {
  super(props);
  this.state = {
    user_email: '',
    isLoading: true,
  };
}

static navigationOptions = {
  title: 'Home',
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: 'rgb(165,36,59)',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerRightContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: (.01 * Dimensions.get('window').width),
  },
  headerLeft: <View style={{padding: .08 * Dimensions.get('window').width}}></View>,
  headerLeftContainerStyle: {
    marginLeft: '2%',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: (.06 * Dimensions.get('window').width),
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
};

fetchAndStore = (url, email, asyncTitle) => {
   // Pulls user data stored at url using email as a key.
   // Stores the data in async storage for later use in the app.

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
      this.props.navigation.navigate('Error', { email: email, error: error });
    });
  }

fetchAndStoreEvents = (url, asyncTitle) => {
   // Pulls data from url and stores it with async storage for later use.

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem(asyncTitle, JSON.stringify(responseJson));
      })
    .catch((error) => {
      this.props.navigation.navigate('Error', { email: this.state.user_email, error: error });
    });
  }

_loadResourcesAsync = async => {
  this.fetchAndStoreEvents(Urls.CalendarAPP, 'Events');
  if(this.state.user_email != "Non-Honors"){
    this.fetchAndStore(Urls.ParticipationAPP, this.state.user_email, 'userInfo');
  }
};

_handleLoadingError = error => {
  this.props.navigation.navigate('Error', { email: this.state.user_email, error: error });
};

_handleFinishLoading = () => {
  this.setState({ isLoading: false });
};


  render() {

    const { navigation } = this.props;
    this.state.user_email = navigation.getParam('email', 'No Email');

    if(this.state.isLoading){
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
    else{
    return (
      <View style={styles.container}>

          <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>

            <View style={styles.opacity}>


              <View style={styles.buttons}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EventsHome', { email: this.state.user_email, title: 'Home' })}>
                      <Text style={styles.title}>Upcoming Honors Events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ParticipationStatus', { email: this.state.user_email, title: 'Home' })}>
                      <Text style={styles.title}>Participation Status</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EventRequirements', {email: this.state.user_email})}>
                      <Text style={styles.title}>Event Requirements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ParticipationFAQ', {email: this.state.user_email})}>
                      <Text style={styles.title}>Honors Participation FAQ</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.creativeCommons}>
                  "<Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://commons.wikimedia.org/wiki/File:SCU_Mission_and_Palm_Trees.jpg')}>SCU Mission and Palm Trees</Text>" by <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/User:SCUMATT')}>SCUMATT</Text> is licensed under <Text style={{textDecorationLine: 'underline'}}
                  onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-sa/3.0/deed.en')}>Attribution-ShareAlike 3.0 Unported</Text>
                </Text>

            </View>

          </ImageBackground>

      </View>

    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttons: {
    flex: 1,
    marginTop: '15%'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: '2%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
    },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(165,36,59)',
    borderRadius: 5,
    height: '72%',
    width: '47%',
    },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: (.07 * Dimensions.get('window').width),
    margin: (.01 * Dimensions.get('window').width),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    creativeCommons: {
      position: 'absolute',
      bottom: 1,
      fontSize: 7,
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
  }
);
