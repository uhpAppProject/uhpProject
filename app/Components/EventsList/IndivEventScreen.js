import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        TouchableOpacity,
        ScrollView,
        Dimensions,
      }
from 'react-native';

export default class IndivEvent extends Component {
  static navigationOptions = {
    title: 'Event Sign In',
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
    },
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      backgroundColor: '#B30738',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: (.03 * Dimensions.get('window').height)
    }
  };
  _onPressOpacity = (email, title, requirement, date, geolocation) => {
    const{navigate} = this.props.navigation;
    navigate('LocationCheck', {
      email: email,
      title: title,
      requirement: requirement,
      date: date,
      geolocation: geolocation
    })
  }
  render(){

//Takes the paramaters from the opacity clicked

    const { navigation } = this.props;

    const event_id = navigation.getParam('event_id', 'No ID');
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const location = navigation.getParam('location', 'No Location');
    const date = navigation.getParam('date', 'No Date');
    const time = navigation.getParam('time', 'No Time');
    const description = navigation.getParam('description', 'No Description');
    const email = navigation.getParam('email', 'No Email');
    const geolocation = navigation.getParam('geolocation', 'No Geolocation');

    return(
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={[styles.genText, styles.genBold]}>{title}</Text>
          <Text style={styles.genText}>{requirement}</Text>
          <Text style={styles.genText}>{date}</Text>
          <Text style={styles.genText}>{time}</Text>
          <Text style={styles.genText}>{location}</Text>
        </View>

        <ScrollView style={styles.eventDiscription}>
          <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>

        <TouchableOpacity style={styles.opacityContainer} onPress={() =>
          this._onPressOpacity(email, title, requirement, date, geolocation)}>
          <Text style={styles.opacityText}>Sign In</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'white',
    },
    headerContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      height: '25%',
      marginTop: '2%',
      marginLeft: '2%',
      marginRight: '2%',
      backgroundColor: '#F7FFCB',
      //borderRadius is ios only
      borderRadius: 5
    },
    eventDiscription: {
      height: '50%',
      alignSelf: 'center',
      marginTop: '2%',
      marginBottom: '2%',
      marginRight: '2%',
      marginLeft: '2%',
    },
    opacityContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      height: '15%',
      width: '96%',
      marginBottom: '5%',
      backgroundColor: '#B30738',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0
    },
    opacityText: {
      color: 'white',
      textAlign: 'center',
      fontSize: (.04 * Dimensions.get('window').height),
    },
    genText: {
      fontSize: (.03 * Dimensions.get('window').height),
      textAlign: 'center',
    },
    descriptionText: {
      fontSize: (.03 * Dimensions.get('window').height)
    },
    genBold: {
      fontWeight: 'bold',
    },
  }
)
