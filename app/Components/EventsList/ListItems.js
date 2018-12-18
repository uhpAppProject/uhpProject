import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
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
            geolocation: this.props.geolocation
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
        <View style={styles.eventContainer}>
          <Text style={[styles.leftText, styles.titleText]}>
            {this.props.title}
          </Text>
          <Text style={styles.rightText}>
            {location}
          </Text>
        </View>

        <View style={styles.eventContainer}>
          <Text style={styles.leftText}>
            {requirement}
          </Text>
          <Text style={styles.rightText}>
            {this.props.date}
          </Text>
        </View>

        <View style={styles.timeContainer}>
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
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: (.02 * Dimensions.get('window').height),
      marginBottom: (.02 * Dimensions.get('window').height),
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
    eventContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
      },
    titleText: {
      fontSize: (.035 * Dimensions.get('window').height)
    },
    leftText: {
      fontSize: (.03 * Dimensions.get('window').height),
      marginLeft: '1%',
    },
    rightText: {
      fontSize: (.03 * Dimensions.get('window').height),
      marginRight: '1%',
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    }
  );

  export default withNavigation(MyListItem);
