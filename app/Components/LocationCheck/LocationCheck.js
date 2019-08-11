/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Checks user's location to determine if they are in the correct location for the event.
 *          Update participation status if they are.
 * Notes: Function for checking location. Function for calling a script to write a report
 *                   of users that attended the event. Then returns the Generic Screen.
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ImageBackground,
        Dimensions,
        ActivityIndicator,
        Platform,
        Linking,
      }
from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import GenericBanner from '../General/genericBannerScreen.js'

import { Urls } from '../../../urls.js';

export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    checkedIn: false,
    errorMessage: null,
    latitude: Number(),
    longitude: Number()
  }
}

static navigationOptions = {
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: (.01 * Dimensions.get('window').width)
  },
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
};

createReport = (url, email, title, requirement, locationCheckPassed) => {
   // Creates a report of sign in attempts (currently a Google Form)

    var formData = new FormData();
    formData.append('email', email);
    formData.append('requirement', requirement);
    formData.append('title', title);
    formData.append('latitude', this.state.latitude);
    formData.append('longitude', this.state.longitude);
    formData.append('locationCheck', locationCheckPassed);

    fetch( url , {
      method: 'POST',
      body: formData,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
    })
    .catch((error) => {
      this.props.navigation.navigate('Error', { email: email, error: error });
    });
  }

  updateStatus(url, email, title, requirement){
    //Precondition: Enter a valid the valid google scripts url, user email, event attended, and the event requirement.
    //Postcondition: Attempts to update the user's participation status if the loc check was passed. Returns an error message if the attempt fails.

    var formData = new FormData();
    formData.append('email', email);
    formData.append('requirement', requirement);
    formData.append('title', title);

    fetch( url , {
      method: 'POST',
      body: formData,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
    })
    .catch((error) => {
      this.props.navigation.navigate('Error', { email: email, error: error });
    });
  }

  locationCheck(location){

     // Checks a user in if they are within a certain radius of the event. Takes in a location object as an argument

    if(Math.sqrt(
      (location.coords.latitude - Number(this.props.navigation.getParam('latitude', 'No Latitude')))**2 +
      (location.coords.longitude - Number(this.props.navigation.getParam('longitude', 'No Latitude')))**2) <= Number(this.props.navigation.getParam('radius', '0.0004')))
      {
        this.setState({
                        checkedIn: true,
                        isLoading: false,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      });
      }
    else {
        this.setState({ isLoading: false,
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    })
      }
    }

  _getLocationAsync = async () => {
     // Retrieves user's location.

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        this.setState({ isLoading: false })
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 5 })
      this.locationCheck(location)
    }
  }

componentWillMount(){
  this._getLocationAsync()
}

  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const date = navigation.getParam('date', 'No Date');
    const email = navigation.getParam('email', 'No Email');

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <Text style={styles.loadingText}>Checking your location, please wait.</Text>
          <ActivityIndicator size="large" color='#B30738' />
        </View>
        )
    }
    else if (this.state.checkedIn) {
      this.createReport(Urls.SignInApp, email, title, requirement, true);
      this.updateStatus(Urls.UpdateApp, email, title, requirement);

      return ( <GenericBanner title={'You are signed into the event!'} text={'Your participation status will be updated shortly'} /> );
    }
    else {

      this.createReport(Urls.SignInApp, email, title, requirement, false);

      return ( <GenericBanner title={'We could not sign you into this event.'} text={"Please proceed to the event location or turn on location services. Also note that your sign in attempt has been recorded. Try signing in a few more times but if it continues not working you will still receive credit for the event."} /> );
    }
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    color: 'black',
    marginBottom: '5%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  }
);
