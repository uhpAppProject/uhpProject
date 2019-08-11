/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Displays information to the user thanking them for RSVPing for an event.
 * Notes: Function that creates a report of rsvps
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

import GenericBanner from '../General/genericBannerScreen.js'

import { Urls } from '../../../urls.js';

export default class Rsvp extends Component {
  constructor(props) {
  super(props);
  this.state = {
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

  createReport(url, email, title) {
    //fills out a Google Form with the email of the user and the event they are
    //rsvping to

      var formData = new FormData();
      formData.append('email', email);
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

  componentWillMount(){

    const { navigation } = this.props;
    const title = navigation.getParam('title', 'No Title');
    const email = navigation.getParam('email', 'No Email');

    this.createReport(Urls.RsvpApp, email, title);
  }


  render() {

    return ( <GenericBanner title={'See you at the event!'} text={'Thank you for letting us know you are coming'} /> );

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
