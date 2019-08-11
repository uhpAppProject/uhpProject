/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Displays information about individual events from EventsShow.
 * Notes: Contains functions to determine whether the time of an event
 *                   has passed yet. Has a conditional animated header and
 *                   a button that links to other pages.
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
      paddingLeft: (.01 * Dimensions.get('window').width)
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
      paddingRight: (.01 * Dimensions.get('window').width),
    },
  };

  _onPressOpacity = (email, title, requirement, date, latitude, longitude, radius) => {
     // Navigates to location check screen if the event is happening now.
     // Otherwise creates an RSVP report and navigates to the RSVP screen.

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
      navigate('Rsvp', {
        email: email,
        title: title,
      })
    }
  }

  _signInCheck(eventDate){
    var ms_ed = eventDate.getTime();
    //date of the event as listed in the database
    var today = new Date();
    var ms_now = today.getTime();

    if(Math.abs(ms_ed - ms_now) < 1800000) this.setState({
                                                    isNow: true,
                                                    opacityText: "SIGN IN"
                                                    })
    else if((ms_ed - 1800000) < ms_now) this.setState({ isPast: true }) //1800000 ms in 30 min
  }

  componentWillMount(){

    var datetime = new Date(this.props.navigation.getParam('datetime', 'No DateTime'));
    this._signInCheck(datetime);

  }

  render(){

//Takes the paramaters from the opacity clicked
    const { navigation } = this.props;

    const event_id = navigation.getParam('event_id', 'No ID');
    const title = navigation.getParam('title', 'No Title');
    const requirement = navigation.getParam('requirement', 'No Req');
    const location = navigation.getParam('location', 'No Location');
    const date = navigation.getParam('date', 'No Date')
    const time = navigation.getParam('time', 'No Time')
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
      marginTop: '2%',
      marginLeft: '2%',
      marginRight: '2%',
      paddingVertical: '2%',
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
