import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        TouchableOpacity,
        ScrollView,
        Dimensions,
        Animated,
      }
from 'react-native';

import IP from '../../../assets/ip.js';

const HEADER_EXPANDED_HEIGHT = .25 * Dimensions.get('window').height
const HEADER_COLLAPSED_HEIGHT = .1 * Dimensions.get('window').height

export default class IndivEvent extends Component {
  constructor(props) {
  super(props);
  this.state = {
    scrollY: new Animated.Value(0),
    isNow: false,
    isPast: false,
    opacityText: "RSVP",
  }
};
  static navigationOptions = {
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
      marginLeft: '.05%',
    },
    headerTitleContainerStyle: {
      alignItems: 'center',
    },
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      backgroundColor: 'rgb(165,36,59)',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: (.03 * Dimensions.get('window').height),
      alignSelf: 'center',
    }
  };


  createReport(php_url, email, title, date) {

      var formData = new FormData();
      formData.append('email', email);
      formData.append('date', date);
      formData.append('title', title);

      fetch( php_url , {
        method: 'POST',
        body: formData,
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

  _onPressOpacity = (email, title, requirement, date, latitude, longitude) => {
    const{navigate} = this.props.navigation;
    if(this.state.isNow){
      navigate('LocationCheck', {
        email: email,
        title: title,
        requirement: requirement,
        date: date,
        latitude: latitude,
        longitude: longitude,
      })
    }
    else{

      this.createReport(IP + '/create_report_RSVP.php', email, title, date);
      navigate('Rsvp', {
        email: email,
        title: title,
        requirement: requirement,
        date: date,
        latitude: latitude,
        longitude: longitude,
      })
    }
  }

  _hourCheck(hourNow){
    //inputting the hour how
    if(this.props.navigation.getParam('time', 'No Time').indexOf('pm') != -1) {
      var hour = Number(this.props.navigation.getParam('time', 'No Time').slice(0,-6)) + 12;
    }
    //converting to a 24 hour system
    else {
      var hour = Number(this.props.navigation.getParam('time', 'No Time').slice(0,-6));
      //hour of the event
    }
    if(Math.abs(hourNow - hour) <= 1) {
    //can sign in up to an hour before and after the start of the event
      this.setState({ isNow: true,
                      opacityText: "Sign In" });
    }
    else if(hourNow - hour > 0) {
      this.setState({ isPast: true });
    }
  }

  _signInCheck(today){
    var eventDate = this.props.navigation.getParam('date', 'No Date');
    //date of the event as listed in the database
    var today = new Date();
    var hh = today.getHours();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0
    var yyyy = today.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];

    if(months[mm] + " " + dd + ", " + yyyy == eventDate){
        this._hourCheck(hh)
    }
    else {
      this._isPast(today)
      }
    }


  _isPast(date_today){
    eventDate = this.props.navigation.getParam('date', 'No Date');
    eventTime = this.props.navigation.getParam('time', 'No Tate');

    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];

    if(date_today.getFullYear() > Number(eventDate.slice(-4))) {
      //check if year is past
      this.setState({ isPast: true });
    }
    else if((date_today.getFullYear() == Number(eventDate.slice(-4))) && (date_today.getMonth() > months.indexOf(eventDate.slice(0, eventDate.indexOf(' '))))){
        //check is month is past
      this.setState({ isPast: true });
    }
    else if((date_today.getFullYear() == Number(eventDate.slice(-4))) && (date_today.getMonth() == months.indexOf(eventDate.slice(0, eventDate.indexOf(' ')))) && (date_today.getDate() > Number(eventDate.slice(eventDate.indexOf(' '), eventDate.indexOf(','))))){
          //check is day is past
      this.setState({ isPast: true });
    }
  }

  componentWillMount(){

    var today = new Date();

    this._signInCheck(today)
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
    const latitude = navigation.getParam('latitude', 'No Latitude');
    const longitude = navigation.getParam('longitude', 'No Longitude');

    if(description.length <= 900){

      if(!this.state.isPast) {
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
              this._onPressOpacity(email, title, requirement, date, latitude, longitude)}>
              <Text style={styles.opacityText}>{this.state.opacityText}</Text>
            </TouchableOpacity>

          </View>
        )
      }

      else {
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

          </View>
        )
      }
    }
    else {

      const headerHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
      });

      const headerTitleFirst = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, -1],
      extrapolate: 'clamp'
    });
      const headerTitleSecond = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      });

      if(!this.state.isPast){

        return(
          <View style={styles.container}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Animated.Text style={[styles.genText, styles.genBold, {opacity: headerTitleFirst}]}>{title}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{requirement}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{date}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{time}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{location}</Animated.Text>

              <Animated.Text style={[styles.genText2, styles.genBold, {opacity: headerTitleSecond}]}>{title}</Animated.Text>


            </Animated.View>

            <ScrollView style={styles.eventDiscription}
                        onScroll={Animated.event(
                          [{ nativeEvent: {
                              contentOffset: {
                                 y: this.state.scrollY
                               }
                             }
                          }])}
                      scrollEventThrottle={16}>
              <Text style={styles.descriptionText}>{description}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.opacityContainer} onPress={() =>
              this._onPressOpacity(email, title, requirement, date, latitude, longitude)}>
              <Text style={styles.opacityText}>{this.state.opacityText}</Text>
            </TouchableOpacity>

          </View>
        )
      }
      else{
        return(
          <View style={styles.container}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Animated.Text style={[styles.genText, styles.genBold, {opacity: headerTitleFirst}]}>{title}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{requirement}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{date}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{time}</Animated.Text>
              <Animated.Text style={[styles.genText, {opacity: headerTitleFirst}]}>{location}</Animated.Text>

              <Animated.Text style={[styles.genText2, styles.genBold, {opacity: headerTitleSecond}]}>{title}</Animated.Text>


            </Animated.View>

            <ScrollView style={styles.eventDiscription}
                        onScroll={Animated.event(
                          [{ nativeEvent: {
                              contentOffset: {
                                 y: this.state.scrollY
                               }
                             }
                          }])}
                      scrollEventThrottle={16}>
              <Text style={styles.descriptionText}>{description}</Text>
            </ScrollView>

          </View>
        )
      }
    }
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
      borderRadius: 3,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.5,
      elevation: 5,
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
      backgroundColor: 'rgb(165,36,59)',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 5,
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
    genText2: {
      fontSize: (.03 * Dimensions.get('window').height),
      textAlign: 'center',
      position: 'absolute',
      textAlignVertical: 'center',
    },
    descriptionText: {
      fontSize: (.03 * Dimensions.get('window').height)
    },
    genBold: {
      fontWeight: 'bold',
    },
  }
)
