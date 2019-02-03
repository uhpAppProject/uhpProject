/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Checks user's location to determine if they are in the correct location for the event.
 * Notable Features: Function for checking location. Function for calling a script to write a report
 *                   of users that attended the event.
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
      }
from 'react-native';

import { Constants, Location, Permissions } from 'expo';

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

createReport = (php_url, email, title, requirement, date) => {
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
      this.setState({ isLoading: false })
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
          <ActivityIndicator size="large" color='#B30738' />
        </View>
        )
    }
    else if (this.state.checkedIn) {

        this.createReport(IP + '/create_report.php', email, title, requirement, date)

      return (
          <View style={styles.container}>
            <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
              <View style={styles.opacity}>

                <View style={styles.infoBannerContainer}>
                  <Text style={styles.textTitle}>You are signed into the event!</Text>
                  <Text style={styles.text}>Your participation status will be updated shortly</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
        )
    }
    else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
            <View style={styles.opacity}>

              <View style={styles.infoBannerContainer}>
                <Text style={styles.textTitle}>We could not sign you into this event.</Text>
                <Text style={styles.text}>Please proceed to the event location or turn on location services</Text>
              </View>

            </View>
          </ImageBackground>
        </View>
      )
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center'
  },
  infoBannerContainer: {
    height: '35%',
    backgroundColor: 'rgb(165,36,59)',
    justifyContent: 'space-evenly'
  },
  textTitle: {
    fontSize: (.045 * Dimensions.get('window').height),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  text: {
    fontSize: (.04 * Dimensions.get('window').height),
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  }
);
