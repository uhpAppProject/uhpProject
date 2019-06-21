/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Displays information
 * Notes: Has a scrollview and an animated header.
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ScrollView,
        ImageBackground,
        Dimensions,
        Animated,
        Platform,
      }
from 'react-native';

const HEADER_EXPANDED_HEIGHT = .17 * Dimensions.get('window').height
const HEADER_COLLAPSED_HEIGHT = 0

export default class EventRequirements extends Component {
  constructor(props) {
  super(props);
  this.state = {
    scrollY: new Animated.Value(0) //animated event
  }
};
  static navigationOptions = {
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
      marginLeft: '.05%',
    },
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      borderBottomWidth: 0,
      elevation: 0,
      backgroundColor: 'rgb(165,36,59)',
    },
    headerRightContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%',
    },
  };

  render() {

    //Dynamic variables are declared here
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });

    const headerTitle = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, -1],
    extrapolate: 'clamp'
  });

    const headerTitleFastFade = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, -5],
    extrapolate: 'clamp'
  });

    const scalingTextBoxHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [(Dimensions.get('window').height) * .095, -(Dimensions.get('window').height) * .095],
    extrapolate: 'clamp'
  });




      return (
        <View style={styles.container}>

          <ImageBackground source={require("../../../assets/Images/event_reqs.png")} style={styles.backgroundImage}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Animated.Text style={[styles.headerTitleText, {opacity: headerTitle}]}>Event Requirements</Animated.Text>
              <Animated.View style={{height: scalingTextBoxHeight, flexWrap: "wrap"}}>
                <Animated.Text style={[styles.headerText, {opacity: headerTitleFastFade}]}>To fulfill your event requirements,
                      you must complete 1 UHP Event
                      and 1 SJ Event.
                </Animated.Text>
              </Animated.View>
            </Animated.View>

            <View style={styles.opacity}>
              <ScrollView style={styles.bodyContainer} //All dynamic variables move in sync with the movement of this scrollview
                          onScroll={Animated.event(
                            [{ nativeEvent: {
                                contentOffset: {
                                   y: this.state.scrollY
                                 }
                               }
                            }])}
                        scrollEventThrottle={16}>
                <View style={styles.postItContainer}>

                  <View style={styles.postItHeader}>
                    <Text style={styles.postItHeaderText}>UHP Event</Text>
                  </View>

                  <Text style={styles.postItBodyText}>Fulfilled by:</Text>

                  <View style={styles.postItBody}>
                    <Text style={styles.postItBodyText}>- Events sponsored by UHP</Text>
                    <Text style={styles.postItBodyText}>- Becoming a UHP mentor</Text>
                    <Text style={styles.postItBodyText}>- Fall Fellowship Workshop</Text>
                    <Text style={styles.postItBodyText}>- Honors peer advising workshops</Text>
                    <Text style={styles.postItBodyText}>- Senior Thesis Poster Session</Text>
                    <Text style={styles.postItBodyText}>- Any event advertised as a UHP Event in the weekly Honors Program newsletter</Text>
                  </View>

                </View>

                <View style={styles.postItContainer}>

                  <View style={styles.postItHeader}>
                    <Text style={styles.postItHeaderText}>Social Justice Event</Text>
                  </View>

                  <Text style={styles.postItBodyText}>Designed to encourage Honors students to expand their
                        perspectives beyond the classroom by participating in
                        an on-campus event focused on a social justice issue.</Text>

                  <View style={styles.postItBody}>
                    <Text style={styles.postItBodyText}>Fulfilled by attending programming by:</Text>
                    <Text style={styles.postItBodyText}>- SCCAP</Text>
                    <Text style={styles.postItBodyText}>- The MCC</Text>
                    <Text style={styles.postItBodyText}>- Markkula Center for Applied Ethics</Text>
                    <Text style={styles.postItBodyText}>- Other organizations or academic departments on campus</Text>
                  </View>

                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      );
    };
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    backgroundColor: 'rgb(165,36,59)',
  },
  headerTitleText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: (.08 * Dimensions.get('window').width),
    marginBottom: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  headerText: {
    fontSize: (.05 * Dimensions.get('window').width),
    textAlign: 'center',
    color: 'white',
    marginRight: '2%',
    marginLeft: '2%',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  backgroundImage: {
    flex: 4,
    height: '100%',
    width: '100%'
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bodyContainer: {
    width: '100%',
  },
  postItContainer: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    height: (.5 * Dimensions.get('window').height),
    width: (.90 * Dimensions.get('window').width),
    marginTop: (.05 * Dimensions.get('window').height),
    marginBottom: (.05 * Dimensions.get('window').height),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  postItHeader: {
    alignItems: 'center',
  },
  postItHeaderText: {
    fontSize: (.07 * Dimensions.get('window').width),
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  postItBody: {
    alignItems: 'flex-start',
  },
  postItBodyText: {
    fontSize: (.05 * Dimensions.get('window').width),
    marginLeft: (.02 * Dimensions.get('window').width),
    marginRight: (.02 * Dimensions.get('window').width),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});
