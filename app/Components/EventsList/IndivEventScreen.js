import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        TouchableOpacity,
      }
from 'react-native';

export default class IndivEvent extends Component {
  _onPressOpacity = (email, title, requirement, date) => {
    const{navigate} = this.props.navigation;
    navigate('LocationCheck', {
      email: email,
      title: title,
      requirement: requirement,
      date: date,
    })
  }
  render(){

//Takes the paramaters from the opacity clicked

    const { navigation } = this.props;
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const location = navigation.getParam('location', 'No Location');
    const date = navigation.getParam('date', 'No Date');
    const time = navigation.getParam('time', 'No Time');
    const description = navigation.getParam('description', 'No Description');
    const email = navigation.getParam('email', 'No Email');

    return(
      <View style={styles.container}>

        <View style={styles.generalInfoContainer}>
          <View style={styles.genInfoHeaderContainer}>
            <Text style={[styles.genText, styles.genBold]}>{title}</Text>
            <Text style={styles.genText}>{requirement}</Text>
          </View>
          <View style={styles.dateTimeLoc}>
            <Text style={styles.genText}>Date: {date}</Text>
            <Text style={styles.genText}>Time: {time}</Text>
            <Text style={styles.genText}>Location: {location}</Text>
          </View>
        </View>

        <View style={styles.eventDiscription}>
          <Text>{description}</Text>
        </View>

        <TouchableOpacity style={styles.opacityContainer} onPress={() =>
          this._onPressOpacity(email, title, requirement, date)}>
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
    generalInfoContainer:{
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      paddingVertical: 20,
      backgroundColor: '#F7FFCB',
      //borderRadius is ios only
      borderRadius: 10
    },
    genInfoHeaderContainer:{
      justifyContent: 'space-between',
    },
    dateTimeLoc: {
      alignItems: 'center'
    },
    eventDiscription: {
      flex: 2,
      alignItems: 'center',
      marginTop: 50,
    },
    opacityContainer: {
      alignSelf: 'center',
      marginBottom: 50,
      paddingHorizontal: 110,
      paddingVertical: 25,
      backgroundColor: '#B30738'
    },
    opacityText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    genText: {
      fontSize: 20,
      textAlign: 'center',
    },
    genBold: {
      fontWeight: 'bold',
    },
  }
)
