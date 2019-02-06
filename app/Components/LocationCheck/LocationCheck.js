/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Checks user's location to determine if they are in the correct location for the event.
 * Notable Features: Function for checking location. Function for calling a script to write a report
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

import IP from '../../../assets/ip.js';

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
    marginRight: '2%',
    marginLeft: '.05%',
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
    marginRight: '2%',
  },
};

_error_Nav(email, error){
  const{navigate} = this.props.navigation;
    navigate('Error', {
      email: email,
      error: error
    });
}

createReport = (php_url, email, title, requirement, date, locationCheckPassed) => {
  /*
   * Writes a report of users who signed into the event
   */

    var formData = new FormData();
    formData.append('email', email);
    formData.append('requirement', requirement);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('latitude', this.state.latitude);
    formData.append('longitude', this.state.longitude);
    formData.append('locationCheck', locationCheckPassed);

    fetch( php_url , {
      method: 'POST',
      body: formData,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == 'TRUE') {}
    })
    .catch((error) => {
      this._error_Nav(email, error);
    });
  }

  locationCheck(location){
    /*
     * Checks a user in if they are within a certain radius of the event. Takes in a location object as an argument
     */

    if(Math.sqrt(
      (location.coords.latitude - Number(this.props.navigation.getParam('latitude', 'No Latitude')))**2 +
      (location.coords.longitude - Number(this.props.navigation.getParam('longitude', 'No Latitude')))**2) <= Number(this.props.navigation.getParam('radius', '0.0002'))
    ) {
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
    /*
     * Retrieves user's location.
     */
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

      this.createReport(IP + '/create_report.php', email, title, requirement, date, true);

      return ( <GenericBanner title={'You are signed into the event!'} text={'Your participation status will be updated shortly'} /> );
    }
    else {

      this.createReport(IP + '/create_report.php', email, title, requirement, date, false);

      return ( <GenericBanner title={'We could not sign you into this event.'} text={"Please proceed to the event location or turn on location services. Also note that your location has been recorded. Try signing in a few more times but if the app continues on not working you will still receive credit for the event."} /> );
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
