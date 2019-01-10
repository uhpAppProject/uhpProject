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

async extractAsyncData(asyncTitle) {
  /*Function for extracting a key from async storage (input as "asyncTitle")and parsing it into
  A JS Object, then the funtion changes the isloading value with setState*/
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
    alert(error);
  }
}

renderItem = ({ item }) => (
// MyListItems contains a TouchableOpacity and a headerscreen
  <MyListItem
      id={item.event_id}
      title={item.name}
      requirement={item.requirement}
      location={item.location}
      time={item.time}
      date={item.date}
      description={item.description}
      email={this.props.email}
      latitude={item.latitude}
      longitude={item.longitude}
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
    return (
      <View style={styles.flatlistContainer}>
        <AnimatedFlatList
          keyExtractor={(item) => item.event_id}
          data={this.state.events}
          renderItem={this.renderItem}
          scrollEventThrottle={16}
          onScroll={this.props.onScroll}
        />
      </View>
    )
    }
  }
}

const HEADER_EXPANDED_HEIGHT = .1 * Dimensions.get('window').height

export default class EventsShow extends Component {
  //renders the page with all of the events in scrolling formatt
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
      backgroundColor: '#B30738',
      elevation: 0,
    },
    headerTitleStyle: {
      color: 'white'
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
          <ImageBackground source={require("../../Images/upcoming_events_background.png")} style={styles.backgroundImage}>

            <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
              <Text style={styles.title}>Upcoming Events</Text>
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
      backgroundColor: '#B30738',
      borderBottomWidth: 1
    },
    animationContainer: {

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
      fontSize: (.05 * Dimensions.get('window').height),
      color: 'white',
    },
  }
);
