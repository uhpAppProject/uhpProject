import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        AsyncStorage,
        FlatList,
        ActivityIndicator,
        ScrollView
      }
from 'react-native';

import {List} from 'react-native-elements'

import MyListItem from './ListItems.js'


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
  render(){

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'No Email');

    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Upcoming Events</Text>
        </View>
        <EventsList email={email}/>
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
      backgroundColor: 'white',
    },
    flatlistContainer: {
      flex: 1
    },
    headerContainer: {
      alignItems: 'stretch',
      backgroundColor: '#B30738',
      paddingVertical: 60,
    },
    title: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      paddingHorizontal: 10
    },
  }
);
