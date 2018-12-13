import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ImageBackground,
      }
from 'react-native';


export default class LocationCheck extends Component {
  constructor(props) {
  super(props);
  this.state = {
    checkedIn: true
  }
}

//Add location check functionality here

updateDatabase = (php_url, email, title, requirement, date) => {

    var formData = new FormData();
    formData.append('email', email);
    formData.append('requirement', requirement);
    formData.append('date', date);
    formData.append('title', title);
  //  alert(JSON.stringify(formData))

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
      alert(responseJson)
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

    if(this.state.checkedIn){

      //doesn't seem to be updating academic events
      const ip = 'www.scuhonors.com'

      //this.updateDatabase('http://' + ip + ':8888/update_participation.php', email, title, requirement, date)

      //this function is actually creating a report of users who attend the event, not directly updating the database
      this.updateDatabase('http://' + ip + '/create_report.php', email, title, requirement, date)

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
    flexDirection: 'column',
    height: 200,
    backgroundColor: '#B30738',
    justifyContent: 'space-evenly'
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  }
);
