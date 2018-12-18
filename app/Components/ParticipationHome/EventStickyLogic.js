import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        Dimensions,
        TouchableOpacity,
      }
from 'react-native';

import { withNavigation } from 'react-navigation';

class StickyLogic extends Component {

  _onPress = () => {
    const{navigate} = this.props.navigation;
    navigate('EventsHome', {
      email: this.props.email,
      title: 'Participation',
    })
  }

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
              onPress={ () => this._onPress() }>
            <Text style={styles.buttonText}>View Upcoming Events</Text>
          </TouchableOpacity>
        </View>
      );
    };
  };
};


const styles = StyleSheet.create({
    container: {
      marginBottom: (.02 * Dimensions.get('window').height),
    },
    stickyContainerComplete: {
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: (.05 * Dimensions.get('window').height),
      marginBottom: (.02 * Dimensions.get('window').height),
      height: (.3 * Dimensions.get('window').height),
      width: (.9 * Dimensions.get('window').width),
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.5
    },
    stickyContainerIncomplete: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: (.05 * Dimensions.get('window').height),
      marginBottom: (.02 * Dimensions.get('window').height),
      height: (.3 * Dimensions.get('window').height),
      width: '90%',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.5
    },
    textContainer: {
      height: '50%',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'white',
      height: (.1 * Dimensions.get('window').height),
      width: (.9 * Dimensions.get('window').width),
      marginBottom: '2%',
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
      fontSize: (.035 * Dimensions.get('window').height),
      textAlign: 'center',
    },
    textRegular: {
      fontSize: (.03 * Dimensions.get('window').height),
      marginLeft: '2%',
      marginRight: '2%',
      textAlign: 'center',
    },
    textBold: {
      fontWeight: 'bold',
    },
})

export default withNavigation(StickyLogic);
