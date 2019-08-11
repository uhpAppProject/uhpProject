/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Reusable page with an image background.
 * Notes: Has props: title, text, contains creative commons information and links
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

                <Text style={styles.creativeCommons}>
                  "<Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://commons.wikimedia.org/wiki/File:SCU_Mission_and_Palm_Trees.jpg')}>SCU Mission and Palm Trees</Text>" by <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/User:SCUMATT')}>SCUMATT</Text> is licensed under <Text style={{textDecorationLine: 'underline'}}
                  onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-sa/3.0/deed.en')}>Attribution-ShareAlike 3.0 Unported</Text>
                </Text>

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
