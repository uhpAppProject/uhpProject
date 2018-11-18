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
      isloading: true,
      events: new Object,
  };
}

componentDidMount() {
  this.extractEvents();
}


async extractEvents() {
  /*Function for extracting "events" key from async storage and parsing it into
  A JS Object, then the funtion changes the isloading value with setState*/
  try {
    await AsyncStorage.getItem('Events')
    .then((response) => JSON.parse(response))
    .then((parsed) => {
        this.state.events = parsed
      })
    if(this.state.events[0] != undefined){
      this.setState({isloading: false});
    }
  }
  catch(error) {
    alert(error);
  }
}

_onPressItem = () => {
//    alert('Test')
//  const{navigate} = this.props.navigation;
//    navigate('IndividualEvent');
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
    />
)

  render() {

    if (this.state.isloading){
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else{
    return (
      <FlatList
        keyExtractor={(item) => item.event_id}
        data={this.state.events}
        renderItem={this.renderItem}
      />
    )
    }
  }
}

export default class EventsShow extends Component {
  //renders the page with all of the events in scrolling formatt
  //click events for more information
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Upcoming Events</Text>
        </View>
        <View styles={styles.eventsContainer}> <EventsList /> </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headerContainer: {
      alignItems: 'stretch',
      backgroundColor: '#B30738',
      paddingVertical: 60,
    },
    eventsContainer: {
      backgroundColor: 'yellow'
    },
    title: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      paddingHorizontal: 10
    },
  }
);
