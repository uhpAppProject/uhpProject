/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Presents information about the user's participation status.
 * Notable Features: A function to call the user's data from storage.
 *                   A function to determine if the user has completed all
 *                   requirements.
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
    marginRight: '2%',
    marginLeft: '.05%',
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

  async extractUserInfo(asyncTitle) {
    /*
     * Function for extracting data from async storage and parsing it into
     * A JS Object. Then the funtion changes the isloading value with setState.
     */

    try {
      await AsyncStorage.getItem(asyncTitle)
      .then((response) => JSON.parse(response))
      .then((parsed) => {
          this.state.user_info = parsed
        })
      if(this.state.user_info[0] != undefined){
        this.setState({isLoading: false});
        }
      }
    catch(error) {
        this._error_Nav("Participation Parsing", error)
        }
      }

  checkStatus = () => {
    if(this.state.user_info[0].academic_status == 'COMPLETE' && this.state.user_info[0].social_justice_status == 'COMPLETE'){
      this.state.status = 'COMPLETE';
    }
    else{
      this.state.status = 'INCOMPLETE';
    }
  }

  componentWillMount() {
    if(this.props.navigation.getParam('email', 'No Email') == "Non-Honors"){
      this.setState({
                      isMember: false,
                      isLoading: false,
                    });
    }
    else {
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

      if (this.state.user_info[0].academic_status == "INCOMPLETE" && this.state.user_info[0].social_justice_status == "INCOMPLETE") {
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
                          status={this.state.user_info[0].academic_status}
                          date={this.state.user_info[0].academic_date}
                          event={this.state.user_info[0].academic_event_attended}
                          email={this.state.user_info[0].email}
                          />
                      <StickyLogic
                          type={'Social Justice Event'}
                          status={this.state.user_info[0].social_justice_status}
                          date={this.state.user_info[0].social_justice_date}
                          event={this.state.user_info[0].social_justice_event_attended}
                          email={this.state.user_info[0].email}
                          />

                      <View style={styles.placeholder}>What the fuck</View>

                    </ScrollView>

                  </View>
                </ImageBackground>
            </View>
          )
        }
      else {
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
                        status={this.state.user_info[0].academic_status}
                        date={this.state.user_info[0].academic_date}
                        event={this.state.user_info[0].academic_event_attended}
                        email={this.state.user_info[0].email}
                        />
                    <StickyLogic
                        type={'Social Justice Event'}
                        status={this.state.user_info[0].social_justice_status}
                        date={this.state.user_info[0].social_justice_date}
                        event={this.state.user_info[0].social_justice_event_attended}
                        email={this.state.user_info[0].email}
                        />

                    <View style={styles.placeholder}></View>

                  </ScrollView>

                </View>
              </ImageBackground>
          </View>
        )
      }
    }
  else {
    return(
      <GenericBanner title={"Honors students are required to attend 1 Social Justice Event\
                            and 1 UHP Event a year to maintain their honors status."}
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
})
