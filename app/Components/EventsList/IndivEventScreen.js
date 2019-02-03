/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Displays information about individual events from EventsShow.
 * Notable Features: Contains functions to determine whether the time of an event
 *                   has passed yet. Also has a funtion that calls a script to write
 *                   RSVP and Sign In reports. Has a conditional animated header and
 *                   a button that conditionally links to other pages.
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        TouchableOpacity,
        ScrollView,
        Dimensions,
        Animated,
        Platform,
      }
from 'react-native';

import Plus from "../Icons/plus.js";

import IP from '../../../assets/ip.js';

const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedPlus = Animated.createAnimatedComponent(Plus);

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
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    headerRightContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
    },
  };

  _error_Nav(email, error){
    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: email,
        error: error
      });
  }

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
        this._error_Nav(email, error);
      });
    }

  _onPressOpacity = (email, title, requirement, date, latitude, longitude, radius) => {
    /*
     * Navigates to location check screen if the event is happening now.
     * Otherwise creates an RSVP report and navigates to the RSVP screen.
     */

    const{navigate} = this.props.navigation;
    if(this.state.isNow){
      navigate('LocationCheck', {
        email: email,
        title: title,
        requirement: requirement,
        date: date,
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      })
    }
    else{

      this.createReport(IP + '/create_report_RSVP.php', email, title, date);
      navigate('Rsvp', {
        email: email,
        title: title,
        requirement: requirement,
        date: date,
      })
    }
  }

  _hourCheck(hourNow, minNow){

    var timeNow = hourNow + minNow/60.0

    //inputting the hour how
    if((this.props.navigation.getParam('time', 'No Time').indexOf('pm') != -1) && (this.props.navigation.getParam('time', 'No Time').slice(0,2) != '12')) //if the hour is pm and not equal to 12, add 12
    {
      var hour = Number(this.props.navigation.getParam('time', 'No Time').slice(0,-6)) + 12;
    }
    //converting to a 24 hour system
    else if((this.props.navigation.getParam('time', 'No Time').indexOf('am') != -1) && (this.props.navigation.getParam('time', 'No Time').slice(0,2) != '12'))
    {
      var hour = Number(this.props.navigation.getParam('time', 'No Time').slice(0,-6));
    }
    else if(this.props.navigation.getParam('time', 'No Time').indexOf('pm') != -1) //it must be 12:00 either am or pm
    {
      var hour = Number(this.props.navigation.getParam('time', 'No Time').slice(0,-6));
    }
    else {
      var hour = 0;
    }

    var min = Number(this.props.navigation.getParam('time', 'No Time').slice(-5,-3))/60.0;

    var eventTime = hour + min

    if(Math.abs(timeNow - eventTime) <= .5) {
      //can sign in up to 30 min before and after the start of the event
      this.setState({ isNow: true,
                      opacityText: "SIGN IN" });
    }
    else if(timeNow - eventTime > 0){
        this.setState({ isPast: true });
      }
    }

  _signInCheck(today){
    var eventDate = this.props.navigation.getParam('date', 'No Date');
    //date of the event as listed in the database
    var today = new Date();
    var min = today.getMinutes();
    var hh = today.getHours();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0
    var yyyy = today.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];
    if(months[mm] + " " + dd + ", " + yyyy == eventDate){
        this._hourCheck(hh, min)
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
    const radius = navigation.getParam('radius', '0.0002');

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

              <View style={styles.placeHoldingView}></View>

            </ScrollView>

            <TouchableOpacity style={styles.opacityContainerNoAnimation}
                              onPress={() => this._onPressOpacity(email, title, requirement, date, latitude, longitude, radius)}>

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

              <View style={styles.placeHoldingView}></View>

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

      const originalWidth = .96 * Dimensions.get('window').width
      const endWidth = (.1 * Dimensions.get('window').height)
      const originalHeight = (.15 * Dimensions.get('window').height)
      const originalRight = .02 * Dimensions.get('window').width
      const originalBottom = .02 * Dimensions.get('window').height

      const opacityBorder = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, (endWidth / 2)],
        extrapolate: 'clamp'
      });

      const opacityWidth = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [originalWidth, endWidth],
        extrapolate: 'clamp'
      });

      const opacityHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [originalHeight, endWidth],
        extrapolate: 'clamp'
      });

      const opacityRight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [originalRight, originalRight],
        extrapolate: 'clamp'
      });

      const opacityBottom = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [originalBottom, originalBottom],
        extrapolate: 'clamp'
      });

      const opacityTextAnimation = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      });

      const plusAnimation = this.state.scrollY.interpolate({
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

              <View style={styles.placeHoldingView}></View>

            </ScrollView>

            <AnimatedOpacity style={[styles.opacityContainer, {height: opacityHeight, width: opacityWidth, borderRadius: opacityBorder, right: opacityRight,
                                                              bottom: opacityBottom}]}
                              onPress={() => this._onPressOpacity(email, title, requirement, date, latitude, longitude, radius)}>

              <Animated.Text style={[styles.opacityText, {opacity: opacityTextAnimation}]}>{this.state.opacityText}</Animated.Text>

              <AnimatedPlus opacity={plusAnimation}/>

            </AnimatedOpacity>

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

              <View style={styles.placeHoldingView}></View>

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
      backgroundColor: 'rgb(245,192,69)',
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
      marginRight: '2%',
      marginLeft: '2%',
    },
    placeHoldingView: {
      width: '100%',
      height: 150,
    },
    opacityContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
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
    opacityContainerNoAnimation: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: .96 * Dimensions.get('window').width,
      height: .15 * Dimensions.get('window').height,
      bottom: .02 * Dimensions.get('window').height,
      right: .02 * Dimensions.get('window').width,
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
      position: 'absolute',
      fontSize: (.06 * Dimensions.get('window').width),
      fontWeight: '700',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    genText: {
      fontSize: (.06 * Dimensions.get('window').width),
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    genText2: {
      fontSize: (.06 * Dimensions.get('window').width),
      textAlign: 'center',
      position: 'absolute',
      textAlignVertical: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    descriptionText: {
      fontSize: (.05 * Dimensions.get('window').width),
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    genBold: {
      fontWeight: 'bold',
    },
  }
)
