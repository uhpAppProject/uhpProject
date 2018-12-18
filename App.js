import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
} from 'react-native';

import { createStackNavigator, navigation} from 'react-navigation';


import StartPage from './app/Components/StartPage/StartPage.js'
import Login from './app/Components/Login/login.js'
import ParticipationHome from './app/Components/ParticipationHome/ParticipationHome.js'
import EventsShow from './app/Components/EventsList/EventsList.js'
import IndivEvent from './app/Components/EventsList/IndivEventScreen.js'
import ParticipationStatus from './app/Components/ParticipationHome/ParticipationStatus.js'
import LocationCheck from './app/Components/LocationCheck/LocationCheck.js'
import EventRequirements from './app/Components/EventRequirements/EventRequirements.js'
import ParticipationFAQ from './app/Components/ParticipationHome/ParticipationFAQ.js'
import AngleLeft from './app/Components/Icons/angle-left.js'

const App = createStackNavigator({
  Start: { screen: StartPage },
  Login: {screen: Login, navigationOptions: ({ navigation }) => ({
                      headerLeft: <AngleLeft navigation={navigation} title={''}/> })},
  Participation: { screen: ParticipationHome},
  EventRequirements: {screen: EventRequirements, navigationOptions: ({ navigation }) => ({
                      headerLeft: <AngleLeft navigation={navigation} title={'Home'}/> })
              },
  ParticipationFAQ: {screen: ParticipationFAQ, navigationOptions: ({ navigation }) => ({
                    headerLeft: <AngleLeft navigation={navigation} title={'Home'}/> })
            },
  EventsHome: { screen: EventsShow, navigationOptions: ({ navigation }) => ({
                headerLeft: <AngleLeft navigation={navigation} title={navigation.state.params.title}/>})
              },
  IndividualEvent: { screen: IndivEvent, navigationOptions: ({ navigation }) => ({
                      headerLeft: <AngleLeft navigation={navigation} title={'Events'}/> })
              },
  ParticipationStatus: {screen: ParticipationStatus, navigationOptions: ({ navigation }) => ({
                        headerLeft: <AngleLeft navigation={navigation} title={navigation.state.params.title}/> })
              },
  LocationCheck: {screen: LocationCheck, navigationOptions: ({ navigation }) => ({
                  headerLeft: <AngleLeft navigation={navigation} title={'Sign In'}/> })
              },
});

export default App;
