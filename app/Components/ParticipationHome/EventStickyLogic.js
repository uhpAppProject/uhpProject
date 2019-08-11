/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Provides assistance to the "ParticipationStatus" screen in processing and presenting user data.
 * Notes: None
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        Dimensions,
        TouchableOpacity,
        Platform,
      }
from 'react-native';

import { withNavigation } from 'react-navigation';

class StickyLogic extends Component {

  render(){
    if(this.props.status == "COMPLETE") {
      return(
        <View style={styles.stickyContainerComplete}>
            <Text style={styles.textRegular}>{this.props.type}: <Text style={styles.textBold}>COMPLETE</Text></Text>
            <Text style={styles.textRegular}>Event Attended: <Text> {this.props.event}</Text></Text>
            <Text style={styles.textRegular}>Date Completed: <Text> {this.props.date}</Text></Text>
        </View>
      )
    }
    else {
      return(
        <View style={styles.container}>
          <View style={styles.stickyContainerIncomplete}>
            <Text style={styles.textRegular}>{this.props.type}: <Text style={styles.textBold}>INCOMPLETE</Text></Text>
            <Text style={styles.textRegular}>Must complete this event by the end of spring quarter</Text>
          </View>

          <TouchableOpacity
              elevation={5}
              style={styles.buttonContainer}
              onPress={ () => this.props.navigation.navigate('EventsHome', { email: this.props.email, title: 'Participation' }) }>
            <Text style={styles.buttonText}>View Upcoming Events</Text>
          </TouchableOpacity>
        </View>
      );
    };
  };
};


const styles = StyleSheet.create({
    container: {
    },
    stickyContainerComplete: {
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: (.05 * Dimensions.get('window').height),
      height: (.3 * Dimensions.get('window').height),
      width: (.9 * Dimensions.get('window').width),
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.5,
    },
    stickyContainerIncomplete: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: (.05 * Dimensions.get('window').height),
      height: (.3 * Dimensions.get('window').height),
      width: '90%',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.5,
    },
    textContainer: {
      height: '50%',
      justifyContent: 'space-between',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'white',
      height: (.1 * Dimensions.get('window').height),
      width: (.9 * Dimensions.get('window').width),
      marginTop: '2%',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      borderRadius: 1,
      elevation: 5,
    },
    buttonText: {
      fontSize: (.05 * Dimensions.get('window').width),
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    textRegular: {
      fontSize: (.05 * Dimensions.get('window').width),
      marginLeft: '2%',
      marginRight: '2%',
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    textBold: {
      fontWeight: 'bold',
    },
})

export default withNavigation(StickyLogic);
