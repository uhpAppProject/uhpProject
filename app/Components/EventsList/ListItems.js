/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Defines the list items from the flatlist in EventsList
 * Notable Features: Some logic to format data. Listitems are formatted as touchable opacities.
 */

import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { withNavigation } from 'react-navigation';

class MyListItem extends Component {

  _onPress = () => {
    const{navigate} = this.props.navigation;
      navigate('IndividualEvent', {
            event_id: this.props.id,
            title: this.props.title,
            requirement: this.props.requirement,
            location: this.props.location,
            date: this.props.date,
            time: this.props.time,
            description: this.props.description,
            email: this.props.email,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            radius: this.props.radius,
    });
  }

  render() {

    if(this.props.requirement == 'Social Justice Event'){
      var requirement = 'SJ Event'
    }
    else{
      var requirement = 'UHP Event'
    }

    if(this.props.location == 'California Mission Room'){
      var location = 'CMR'
    }
    else{
      var location = this.props.location
    }

    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this._onPress()}>
        <View style={styles.topContainer}>
          <Text style={[styles.leftText, styles.titleText]}>
            {this.props.title}
          </Text>
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.leftText}>
            {requirement}
          </Text>
          <Text style={styles.rightText}>
            {location}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.rightText}>
            {this.props.date}
          </Text>
          <Text style={styles.rightText}>
            {this.props.time}
          </Text>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
      height: (.15 * Dimensions.get('window').height),
      width: (.96 * Dimensions.get('window').width),
      paddingHorizontal: '2%',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: (.01 * Dimensions.get('window').height),
      marginBottom: (.01 * Dimensions.get('window').height),
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      borderRadius: 2,
      elevation: 5,
      },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
      },
    middleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    titleText: {
      fontSize: (.06 * Dimensions.get('window').width),
      fontWeight: '500',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    leftText: {
      fontSize: (.05 * Dimensions.get('window').width),
      marginLeft: '1%',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    rightText: {
      fontSize: (.05 * Dimensions.get('window').width),
      marginRight: '1%',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
  });

  export default withNavigation(MyListItem);
