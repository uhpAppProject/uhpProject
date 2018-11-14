import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        FlatList,
        ActivityIndicator,
        AppRegistry,
      }
from 'react-native';

class EventsList extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isloading: true,
      events: new Object,
  };
}

async extractEvents() {
  try {
    await AsyncStorage.getItem('Events').then((response) => JSON.parse(response))
    .then((parsed) => {this.state.events = parsed})
    if(this.state.events[0] != undefined){
      this.setState({isloading: false});
    }
  }
  catch(error) {
    alert(error);
  }
}

  render() {

    this.extractEvents();

    if (this.state.loading){
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else{
    return (
      <FlatList
        data={this.state.events}
        renderItem={({item}) => <Text>{item.value}</Text>}
      />
      )
    }
  }
}

export default class EventsShow extends Component {
  render(){
    return(
      <View> <EventsList /> </View>
    )
  }
}


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20
  },
  opacityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: '100%'
  },
  logoContainer: {
    width: 300,
    height: 300
  },
  buttonContainer: {
    backgroundColor: '#B30738',
    height: 175,
    width: 160,
    marginTop: 25

},
  title_w: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 10
  },
  title_b: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 10
  },

  }
);
