import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
        Switch
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Login from './app/Components/Login/login.js'
import StartPage from './app/Components/StartPage/StartPage.js'
import ParticipationHome from './app/Components/ParticipationHome/ParticipationHome.js'
import EventsList from './app/Components/EventsList/EventsList.js'

const App = createStackNavigator({
  Start: { screen: StartPage },
  Participation: { screen: ParticipationHome },
  EventsHome: {screen: EventsList},
});

export default App;

//export default class uhpApp extends Component {
//  constructor(props){
//    super(props);
//    this.state = {
//      value: false
//    };
//  }

//  render() {
//    return (
//      <Login />
//        <StartPage />
//        <ParticipationHome />
//        <EventsList />
//    );
//  }
//}

//const styles = StyleSheet.create({
//  container:{
//    flex: 1,
//    backgroundColor:'#fff',
//    alignItems:'center',
//    justifyContent: 'center',
// },
//});
