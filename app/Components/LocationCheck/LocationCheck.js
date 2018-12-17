import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ImageBackground,
        Dimensions,
      }
from 'react-native';


export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {
    checkedIn: false
  }
}

static navigationOptions = {
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '2%',
  },
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: '#B30738',
    borderBottomWidth: 0,
  },
};

//Add location check functionality here
//app is currently submitting GPS coordinates of the event for testing. Coordinates submitted should actually be those of the location check
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

  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const date = navigation.getParam('date', 'No Date');
    const email = navigation.getParam('email', 'No Email');
    const geolocation = navigation.getParam('geolocation', 'No Geolocation');

    if(this.state.checkedIn){

//      const ip = 'www.scuhonors.com'; //web host
//      const ip = '127.0.0.1:8888'; //local host
      const ip = '192.168.1.109:8888';

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
