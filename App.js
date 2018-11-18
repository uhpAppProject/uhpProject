import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import StartPage from './app/Components/StartPage/StartPage.js'
import ParticipationHome from './app/Components/ParticipationHome/ParticipationHome.js'
import EventsShow from './app/Components/EventsList/EventsList.js'
import IndivEvent from './app/Components/EventsList/IndivEventScreen.js'
import ParticipationStatus from './app/Components/ParticipationHome/ParticipationStatus.js'
import LocationCheck from './app/Components/LocationCheck/LocationCheck.js'

const App = createStackNavigator({
  Start: { screen: StartPage },
  Participation: { screen: ParticipationHome },
  EventsHome: { screen: EventsShow },
  IndividualEvent: { screen: IndivEvent },
  ParticipationStatus: {screen: ParticipationStatus},
  LocationCheck: {screen: LocationCheck}
});

export default App;
