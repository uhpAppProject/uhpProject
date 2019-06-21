/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Display list of events.
 * Notes: Contains two classes: "EventsList" which defines a flatlist with event information
 *                   and "EventsShow" which displays the flatlist. The ListItems are pressable.
 *                   EventsShow has an animated header.
 */

import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        AsyncStorage,
        FlatList,
        ActivityIndicator,
        ImageBackground,
        Dimensions,
        Animated,
        Platform,
      }
from 'react-native';

import MyListItem from './ListItems.js'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class EventsList extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isLoading: true,
      events: new Object,
  };
}

_error_Nav(email, error){
  const{navigate} = this.props.navigation;
    navigate('Error', {
      email: email,
      error: error
  });
}

async extractAsyncData(asyncTitle) {
  

  //  Function for extracting a key from async storage (input as "asyncTitle")and parsing it into
  //  A JS Object, then the funtion changes the isloading value with setState


  try {
    await AsyncStorage.getItem(asyncTitle)
    .then((response) => JSON.parse(response))
    .then((parsed) => {
        this.state.events = parsed
      })
    if(this.state.events[0] != undefined){
      this.setState({isLoading: false});
    }
  }
  catch(error) {
    this._error_Nav("Extracting Events", error);
  }
}

renderItem = ({ item }) => (
// MyListItems contains a TouchableOpacity and a headerscreen
  <MyListItem
      id={item.event_id}
      title={item.title}
      requirement={item.requirement}
      location={item.location}
      datetime={item.datetime}
      description={item.description}
      email={this.props.email}
      latitude={item.latitude}
      longitude={item.longitude}
      radius={item.radius}
    />
)

componentWillMount() {
  this.extractAsyncData('Events');
}

  render() {

    if (this.state.isloading){
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color='#B30738' />

          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </View>
      )
    }
    else{
      if(this.state.events[0] != undefined){
        return (
          <View style={styles.flatlistContainer}>
            <AnimatedFlatList
              keyExtractor={(item) => item.id}
              data={this.state.events}
              renderItem={this.renderItem}
              scrollEventThrottle={16}
              onScroll={this.props.onScroll}
            />
          </View>
        )
      }
      else{
        return(
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>There Are Currently No Upcoming Events. Please Check Back Later.</Text>
          </View>
        )
      }
    }
  }
}

const HEADER_EXPANDED_HEIGHT = .1 * Dimensions.get('window').height

export default class EventsShow extends Component {
  //renders the page with all of the events in scrolling format
  //click events for more information
  constructor(props) {
  super(props);
  this.state = {
    scrollY: new Animated.Value(0),
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
      borderBottomWidth: 0,
      backgroundColor: 'rgb(165,36,59)',
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

  render(){

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'No Email');

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, 0],
      extrapolate: 'clamp',
    });

    const headerTitle = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT],
    outputRange: [1, -1],
    extrapolate: 'clamp'
  });

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color='#B30738' />
        </View>
      )
    }
    else{
      return(
        <View style={styles.container}>
          <ImageBackground source={require("../../../assets/Images/upcoming_events_background.png")} style={styles.backgroundImage}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Animated.Text style={[styles.title, {opacity: headerTitle}]}>Upcoming Events</Animated.Text>
            </Animated.View>

            <View style={styles.opacity}>

                <EventsList
                    email={email}
                    onScroll={Animated.event(
                      [{ nativeEvent: {
                          contentOffset: {
                             y: this.state.scrollY
                           }
                         }
                      }],
                    )}/>

              </View>
          </ImageBackground>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    headerContainer: {
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: 'rgb(165,36,59)',
      borderBottomWidth: 1
    },
    noEventsContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignSelf: 'center'
    },
    noEventsText: {
      fontWeight: '500',
      textAlign: 'center',
      marginTop: (.1 * Dimensions.get('window').height),
      fontSize: (.07 * Dimensions.get('window').width),
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
    flatlistContainer: {
      height: '100%',
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: (.09 * Dimensions.get('window').width),
      color: 'white',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
  }
);
