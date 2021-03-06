/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Presents information about the user's participation status.
 * Notes: A function to call the user's data from storage.
 *                   A function to determine if the user has completed all
 *                   requirements. Contains creative commons info and links
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ActivityIndicator,
        AsyncStorage,
        ImageBackground,
        ScrollView,
        Dimensions,
        Animated,
        Platform,
        Linking,
      }
from 'react-native';

import StickyLogic from './EventStickyLogic.js';
import GenericBanner from '../General/genericBannerScreen.js';

const HEADER_EXPANDED_HEIGHT = .13 * Dimensions.get('window').height;
const HEADER_COLLAPSED_HEIGHT = 0;

export default class ParticiptionStatus extends Component {
  constructor(props) {
  super(props);
  this.state = {
    socialJustice: '',
    uhp: '',
    email: '',
    isMember: true,
    user_info: new Object(),
    isLoading: true,
    status: '',
    scrollY: new Animated.Value(0),
    scrollX: new Animated.Value(0),
  };
}

static navigationOptions = {
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: (.01 * Dimensions.get('window').width)
  },
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: 'rgb(165,36,59)',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  headerRightContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: (.01 * Dimensions.get('window').width),
  },
};

  async extractUserInfo(asyncTitle) {
     // Function for extracting data from async storage and parsing it into
     // A JS Object. Then the funtion changes the isloading value with setState.

    try {
      await AsyncStorage.getItem(asyncTitle)
      .then((response) => JSON.parse(response))
      .then((parsed) => {
          this.state.user_info = parsed
        })
      if(this.state.user_info != undefined){
        this.setState({
                        isLoading: false,
                        isMember: this.state.user_info.uhp == 'Non Member' ? false : true
                      });
        }
      }
    catch(error) {
        this.props.navigation.navigate('Error', { email: 'Participation Parsing', error: error });
        }
      }

  checkStatus = () => {
    if(this.state.user_info.uhp > 0 && this.state.user_info.sj > 0){
      this.state.status = 'COMPLETE';
      this.state.uhp = 'COMPLETE';
      this.state.socialJustice = 'COMPLETE';
    }
    else{
      if(this.state.user_info.uhp > 0) this.state.uhp = "COMPLETE";
      else this.state.uhp = "INCOMPLETE";

      if(this.state.user_info.sj > 0) this.state.socialJustice = "COMPLETE";
      else this.state.socialJustice = "INCOMPLETE";

      this.state.status = 'INCOMPLETE';
    }
  }

  formatDate(date){
    //Formats date in month/day/year format

    var output = new Date(date);
    return output.getMonth() + 1 + '/' + output.getDate() + '/' + output.getFullYear();
  }

  componentWillMount() {
      this.state.email = this.props.navigation.getParam('email', 'No Email');
      if(this.state.email=='Non-Honors'){
        this.setState({
          isMember: false,
          isLoading: false
        });
      }
      else{
        this.extractUserInfo('userInfo');
      }
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });

    const headerTitle = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, -2],
      extrapolate: 'clamp'
    });

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else if(this.state.isMember) {

    this.checkStatus()

      if (this.state.user_info.uhp > 0 || this.state.user_info.sj > 0) { // At least one requirement is complete
          return(
            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/Images/paticipation_status_background.png")}
                                          style={styles.backgroundImage}
                                          resizeMode={'cover'}
                                          >
                  <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
                    <Animated.Text style={[styles.headerTitle, {opacity: headerTitle}]}>Participation</Animated.Text>
                    <Animated.Text style={[styles.headerText, {opacity: headerTitle}]}>{this.state.status}</Animated.Text>
                  </Animated.View>

                  <View style={styles.opacity}>

                    <ScrollView style={styles.stickyContainer}
                                onScroll={Animated.event(
                                  [{ nativeEvent: {
                                      contentOffset: {
                                         y: this.state.scrollY,
                                       }
                                     }
                                  }])}
                              scrollEventThrottle={16}>
                      <StickyLogic
                          type={'UHP Event'}
                          status={this.state.uhp}
                          date={this.formatDate(Number(this.state.user_info.uhpDate))}
                          event={this.state.user_info.uhpAttended}
                          email={this.state.email}
                          />
                      <StickyLogic
                          type={'Social Justice Event'}
                          status={this.state.socialJustice}
                          date={this.formatDate(Number(this.state.user_info.sjDate))}
                          event={this.state.user_info.sjAttended}
                          email={this.state.email}
                          />

                      <View style={styles.placeholder}></View>

                    </ScrollView>

                    <Text style={styles.creativeCommons}>
                      "<Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.flickr.com/photos/146791570@N05/32354342833')}>Writing in notebook</Text>" by <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://informedmag.com/')}>informedmag</Text> is licensed under <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://creativecommons.org/licenses/by/2.0/')}>CC 2.0</Text>
                    </Text>

                  </View>
                </ImageBackground>
            </View>
          )
        }
      else { // Neither requirement is complete
        return(
          <View style={styles.container}>
              <ImageBackground source={require("../../../assets/Images/paticipation_status_background.png")}
                                        style={styles.backgroundImage}
                                        resizeMode={'cover'}
                                        >
                <View style={[styles.headerContainer, {height: '13%'}]}>
                  <Text style={styles.headerTitle}>Participation</Text>
                  <Text style={styles.headerText}>{this.state.status}</Text>
                </View>

                <View style={styles.opacity}>

                  <ScrollView style={styles.stickyContainer}>
                    <StickyLogic
                        type={'UHP Event'}
                        status={this.state.uhp}
                        date={this.formatDate(Number(this.state.user_info.uhpDate))}
                        event={this.state.user_info.uhpAttended}
                        email={this.state.email}
                        />
                    <StickyLogic
                        type={'Social Justice Event'}
                        status={this.state.socialJustice}
                        date={this.formatDate(Number(this.state.user_info.sjDate))}
                        event={this.state.user_info.sjAttended}
                        email={this.state.email}
                        />

                    <View style={styles.placeholder}></View>

                  </ScrollView>

                  <Text style={styles.creativeCommons}>
                    "<Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.flickr.com/photos/146791570@N05/32354342833')}>Writing in notebook</Text>" by <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://informedmag.com/')}>informedmag</Text> is licensed under <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://creativecommons.org/licenses/by/2.0/')}>CC 2.0</Text>
                  </Text>

                </View>

              </ImageBackground>
          </View>
        )
      }
    }
  else { // Person did't use Google to sign in
    return(
      <GenericBanner title={"Honors students are required to attend 1 Social Justice Event and 1 UHP Event a year to maintain their honors status."}
                     text={''}/>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30738',
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(165,36,59)',
  },
  headerTitle: {
    color: 'white',
    fontSize: (.08 * Dimensions.get('window').width),
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  headerText: {
    color: 'white',
    fontSize: (.06 * Dimensions.get('window').width),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  placeholder: {
    height: 80
  },
  stickyContainer: {
  },
  creativeCommons: {
    fontSize: 7,
    alignSelf: 'center',
    marginBottom: 1,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
})
