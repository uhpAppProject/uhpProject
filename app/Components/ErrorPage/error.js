/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Displays any errors to users in an elegant way while alerting admin.
 * Notes: Contains a function that calls a script to email the admin
 *                   with information about why the app crashed.
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

import { Urls } from '../../../urls.js';

export default class Error extends Component {
  constructor(props) {
  super(props);
  this.state = {
  }
}

static navigationOptions = {
  headerTitle: "WHOOPS!",
  headerTitleStyle: {
    color: 'white',
  },
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '2%',
    marginLeft: '.05%'
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

componentDidMount(){
  /*
   * Admin is emailed before the screen mounts
   */

  const { navigation } = this.props;
  const email = navigation.getParam('email', 'No Email');
  const error = navigation.getParam('error', 'No Error Message');

  var formData = new FormData(email, error);
  formData.append('user', email);
  formData.append('error', JSON.stringify(error));

  fetch( Urls.ErrorEmail, {
    method: 'POST',
    body: formData,
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
    }
  })
  .catch((error) => {
  });
  }


  render() {

      return (
          <View style={styles.container}>
            <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
              <View style={styles.opacity}>

                <View style={styles.infoBannerContainer}>
                  <Text style={styles.textTitle}>Sorry, there was a problem with the app.</Text>
                  <Text style={styles.text}>Try closing the app and restarting it.
                                            If the problem persists, please email
                                            bjust@scu.edu and let us know
                                            what is going on. Thank you for
                                            your patience.</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
        )
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
    fontSize: (.035 * Dimensions.get('window').height),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  text: {
    fontSize: (.03 * Dimensions.get('window').height),
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  }
);
