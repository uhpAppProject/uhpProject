import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ScrollView,
        ImageBackground,
        Dimensions,
        Animated,
      }
from 'react-native';

import PostIt from './PostIt.js';

const HEADER_EXPANDED_HEIGHT = .13 * Dimensions.get('window').height
const HEADER_COLLAPSED_HEIGHT = 0

export default class ParticipationFAQ extends Component {
  constructor(props) {
  super(props);
  this.state = {
    scrollY: new Animated.Value(0)
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
      backgroundColor: '#B30738',
      elevation: 0,
    },
  };

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });

      return (
        <View style={styles.container}>
          <ImageBackground source={require("../../Images/participation_faq.jpg")} style={styles.backgroundImage}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Text style={styles.headerTitleText}>Participation FAQ</Text>
            </Animated.View>

            <View style={styles.opacity}>
              <ScrollView style={styles.bodyContainer}
                          onScroll={Animated.event(
                            [{ nativeEvent: {
                                contentOffset: {
                                   y: this.state.scrollY
                                 }
                               }
                            }])}
                        scrollEventThrottle={16}>

                <PostIt title={'Why should I fulfill my Honors participation requirement?'}
                        contents={"Attending Honors-designated events will not only encourage learning beyond the classroom, but it is also an opportunity to meet new students or catch up with the ones you may not have seen since the days of CTW and C&I. Failure to fulfil this two-event requirement will result in loss of Honors status, which includes priority registration and, for seniors, loss of Honors designation in transcript. There will be many chances to attend events throughout the year, but please be aware that there will not be a plethora of UHP-sponsored events at the end of Spring quarter."}
                        button={false}
                        />

                <PostIt title={'What does this mean for other events on campus hosted by other departments or organizations that previously counted for credit?'}
                        contents={'Unless explicitly designated as an Honors event in the weekly UHP newsletter, these events will not count for participation credit. However, students are encouraged to take advantage of the programming on campus, and event organizers are still welcome to advertise their event in the newsletter.'}
                        button={false}
                        />

                <PostIt title={'How do I track my participation status?'}
                        contents={'The Participation Tracker will give you a detailed record of your participation status with regard to these event requirements. On the “Participation Status” page, you will see the events you attended and whether they counted for a UHP Academic Event or Social Justice Event. If your status is incomplete for either one of these events, you may be prompted to return to the “Upcoming Honors Events” page to find an event that you would like to attend to fulfill your requirement.'}
                        button={true}
                        buttonTitle={'View Participation Status'}
                        />

                <View style={styles.postItContainer}>

                  <View style={styles.postItHeader}>
                    <Text style={styles.postItHeaderText}>How do I sign in to Honors Events?</Text>
                  </View>

                  <View style={styles.postItBody}>
                    <Text style={styles.postItBodyText}>Please see the “Upcoming Honors Events” page from the home screen to sign into an Honors Event. From there, you will be presented with a list of events that will occur in the next couple weeks. Click on the event you would like to attend.
                    </Text>
                    <Text style={styles.postItBodyText}><Text style={styles.boldText}>If the event is today: </Text>You will be able to read a short description of the event, followed by a sign-in button. Please click on the sign-in button to sign in to the event. In addition, make sure your location services are on and that you are in the location of the event. You will not be able to sign in unless you are in the location of the event.
                    </Text>
                    <Text style={styles.postItBodyText}><Text style={styles.boldText}>If the event is not today: </Text>You will be able to read a short description of the event, followed by an RSVP button. Please click on the RSVP button to let us know you are planning on attending. Please note: you will still need to sign in on the day of the event to receive credit.
                    </Text>
                  </View>

                </View>

                <PostIt title={'Where can I learn more information about events and participation?'}
                        contents={'Please refer to the weekly UHP newsletter to find out more information. We will be advertising which events count for participation credit. If you have any questions, feel free to reply to the newsletter to reach the Honors Advisory Council. You can also view our Google Calendar, also found in the newsletter, to help you plan for these events.'}
                        button={false}
                        />

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
    backgroundColor: '#B30738',
  },
  headerTitleText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: (.04 * Dimensions.get('window').height),
    marginBottom: '2%',
  },
  headerText: {
    fontSize: (.03 * Dimensions.get('window').height),
    textAlign: 'center',
    color: 'white',
    marginBottom: '2%'
  },
  backgroundImage: {
    flex: 7,
    height: '100%',
    width: '100%'
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bodyContainer: {
    width: '100%',
    marginTop: '5%',
  },
  postItContainer: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: (.9 * Dimensions.get('window').width),
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
    marginTop: (.02 * Dimensions.get('window').height),
  },
  postItHeaderText: {
    fontSize: (.03 * Dimensions.get('window').height),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: (.02 * Dimensions.get('window').width),
  },
  postItBody: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginLeft: (.02 * Dimensions.get('window').width),
    marginRight: (.02 * Dimensions.get('window').width),
    marginTop: (.05 * Dimensions.get('window').height),
    marginBottom: (.02 * Dimensions.get('window').height),
  },
  postItBodyText: {
    fontSize: (.025 * Dimensions.get('window').height),
    marginBottom: (.03 * Dimensions.get('window').height),
  },
  boldText: {
    fontWeight: 'bold',
  },
});
