/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Reusable page with an image background.
 * Notable Features: Has props: title, text
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

export default class GenericBanner extends Component {
  constructor(props) {
  super(props);
  this.state = {
  }
}

static navigationOptions = {
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


  render() {

    if(this.props.text != ''){
      return (
          <View style={styles.container}>
            <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
              <View style={styles.opacity}>

                <View style={styles.infoBannerContainer}>
                  <Text style={styles.textTitle}>{this.props.title}</Text>
                  <Text style={styles.text}>{this.props.text}</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
        );
      }
    else {
      return(
        <View style={styles.container}>
          <ImageBackground source={require("../../../assets/Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
            <View style={styles.opacity}>

              <View style={styles.infoBannerContainer}>
                <Text style={styles.textTitle}>{this.props.title}</Text>
              </View>

            </View>
          </ImageBackground>
        </View>
      );
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
    backgroundColor: 'rgb(165,36,59)',
    justifyContent: 'space-evenly'
  },
  textTitle: {
    fontSize: (.07 * Dimensions.get('window').width),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  text: {
    fontSize: (.06 * Dimensions.get('window').width),
    color: 'white',
    textAlign: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '5%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  }
);
