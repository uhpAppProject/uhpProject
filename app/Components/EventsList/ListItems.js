/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Defines the list items from the flatlist in EventsList
 * Notes: Some logic to format data. Listitems are formatted as touchable opacities.
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
            title: this.formatTitle(this.props.title, this.props.requirement),
            requirement: this.props.requirement,
            location: this.props.location,
            datetime: this.props.datetime,
            date: this.formatDate(this.props.datetime),
            time: this.formatTime(this.props.datetime),
            description: this.props.description,
            email: this.props.email,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            radius: this.props.radius,
    });
  }
    formatTitle(title, req){

      // Formats the title without the "(Social Justice Event)"

      title = title.slice(0, title.search(req) - 1)

      if(title.length > 25) {
        // Adds "..." to the title if it's too long

        return(title.slice(0, 25) + "...");
      }
      else {
        return(title);
      }
    }

    formatLocation(location){
      // Adds "..." to the location if it's too long

      if(location.length > 20){
        return(location.slice(0,20) + "...");
      }
      else {
        return(location);
      }
    }

    formatDate(date){
      //formats the date in month/day/year format

      var output = new Date(date);
      return output.getMonth() + 1 + '/' + output.getDate() + '/' + output.getFullYear();
    }

    formatTime(date){
      //formats the time in hour:minute AM/PM format

      var output = new Date(date);
      var hour = output.getHours();
      var minutes = output.getMinutes();
      var am_pm;
      if(hour < 12) am_pm = "AM";
      else am_pm = "PM";
      if(hour == 0 || hour == 12) hour = 12;
      else hour %= 12
      if(minutes < 10) return hour + ':' + '0' + output.getMinutes() + ' ' + am_pm;
      else return hour + ':' + output.getMinutes() + ' ' + am_pm;
    }

  render() {

    if(this.props.requirement == 'Social Justice Event'){ // Shorten the requirement name
      var requirement = 'SJ Event'
    }
    else{
      var requirement = 'UHP Event'
    }


    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this._onPress()}>
        <View style={styles.topContainer}>
          <Text style={[styles.leftText, styles.titleText]}>
            {this.formatTitle(this.props.title, this.props.requirement)}
          </Text>
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.leftText}>
            {requirement}
          </Text>
          <Text style={styles.rightText}>
            {this.formatLocation(this.props.location)}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.rightText}>
            {this.formatDate(this.props.datetime)}
          </Text>
          <Text style={styles.rightText}>
            {this.formatTime(this.props.datetime)}
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
