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

export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    checkedIn: false,
    errorMessage: null,
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
    backgroundColor: '#B30738',
    borderBottomWidth: 0,
    elevation: 0,
  },
};

createReport = (php_url, email, title, requirement, date, geolocation) => {

    var formData = new FormData();
    formData.append('email', email);
    formData.append('requirement', requirement);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('geolocation', geolocation);

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
      if(responseJson == 'TRUE') {
        alert("You've already signed in!")
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

//there seems to be a margin of error when getting the coordinates
  locationCheck(location){
    const max = .0002; //Approximate size of lecture room for this to work-can change later from hard coding to actual dimentions of
    const factor = 111139; //convert degrees to meters
    alert(Math.sqrt(
      (location.coords.latitude - Number(this.props.navigation.getParam('latitude', 'No Latitude')))**2 +
      (location.coords.longitude - Number(this.props.navigation.getParam('longitude', 'No Latitude')))**2));
    if(Math.sqrt(
      (location.coords.latitude - Number(this.props.navigation.getParam('latitude', 'No Latitude')))**2 +
      (location.coords.longitude - Number(this.props.navigation.getParam('longitude', 'No Latitude')))**2) <= max
    ) {
        this.setState({
                        checkedIn: true,
                        isLoading: false,
                      });
      }
    else {
      this.setState({ isLoading: false })
      }
    }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        this.setState({ isLoading: false })
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 5 })
      alert(JSON.stringify(location));

      this.locationCheck(location)

    }
  }


  _loadResourcesAsync = async => {
      this._getLocationAsync
  };

  _handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
      console.warn(error);
  };

  _handleFinishLoading = () => {
      this.locationCheck()
  };


componentWillMount(){
  this._getLocationAsync()
}

  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const date = navigation.getParam('date', 'No Date');
    const email = navigation.getParam('email', 'No Email');
    const geolocation = navigation.getParam('geolocation', 'No Geolocation');


    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color='#B30738' />
        </View>
        )
    }
    else if (this.state.checkedIn) {
      //      const ip = 'www.scuhonors.com'; //web host
      //      const ip = '127.0.0.1'; //local host
        const ip = '172.20.111.24';

        //this function is  creating a report of users who attend the event to be updated later
        this.createReport('http://' + ip + '/create_report.php', email, title, requirement, date, geolocation)

      return (
          <View style={styles.container}>
            <ImageBackground source={require("../../Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
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
          <ImageBackground source={require("../../Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
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
    backgroundColor: '#B30738',
    justifyContent: 'space-evenly'
  },
  textTitle: {
    fontSize: (.045 * Dimensions.get('window').height),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%'
  },
  text: {
    fontSize: (.04 * Dimensions.get('window').height),
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%'
  },
  }
);
