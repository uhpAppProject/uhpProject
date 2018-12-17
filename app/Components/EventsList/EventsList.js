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
      }
from 'react-native';

import MyListItem from './ListItems.js'

import AngleLeft from '../Icons/angle-left.js'


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
      geolocation={'(' + item.latitude + ', ' + item.longitude + ')'}
    />
)

componentDidMount() {
  this.extractAsyncData('Events');
}

  render() {

    if (this.state.isloading){
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else{
    return (
      <View style={styles.flatlistContainer}>
        <FlatList
          keyExtractor={(item) => item.event_id}
          data={this.state.events}
          renderItem={this.renderItem}
        />
      </View>
    )
    }
  }
}

export default class EventsShow extends Component {
  //renders the page with all of the events in scrolling formatt
  //click events for more information
  static navigationOptions = {
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '2%'
    },
    headerStyle: {
      height: (.07 * Dimensions.get('window').height),
      borderBottomWidth: 0,
      backgroundColor: '#B30738',
    },
    headerTitleStyle: {
      color: 'white'
    },
  };
  render(){

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'No Email');

    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Upcoming Events</Text>
        </View>

        <ImageBackground source={require("../../Images/upcoming_events_background.png")} style={styles.backgroundImage}>
          <View style={styles.opacity}>
            <EventsList email={email}/>
          </View>
        </ImageBackground>
      </View>
    )
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
      backgroundColor: 'grey',
    },
    headerContainer: {
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      height: '13%',
      backgroundColor: '#B30738',
      borderBottomWidth: 1
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
      height: '87%',
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: (.05 * Dimensions.get('window').height),
      color: 'white',
    },
  }
);
