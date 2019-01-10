import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
        Platform,
} from 'react-native';

import { Linking } from 'expo';

import { createNavigationContainer, createSwitchNavigator, createStackNavigator, navigation} from 'react-navigation';


import StartPage from './app/Components/StartPage/StartPage.js'
import Login from './app/Components/Login/login.js'
import ForgotPassword from './app/Components/Login/forgot_password.js'
import ParticipationHome from './app/Components/ParticipationHome/ParticipationHome.js'
import Settings from './app/Components/Settings/settings.js'
import PasswordReset from './app/Components/Settings/password-reset.js'
import NewPassword from './app/Components/Settings/new-password.js'
import ConfirmPassword from './app/Components/Settings/confirm-password.js'
import EventsShow from './app/Components/EventsList/EventsList.js'
import IndivEvent from './app/Components/EventsList/IndivEventScreen.js'
import ParticipationStatus from './app/Components/ParticipationHome/ParticipationStatus.js'
import LocationCheck from './app/Components/LocationCheck/LocationCheck.js'
import Rsvp from './app/Components/LocationCheck/RSVP.js'
import EventRequirements from './app/Components/EventRequirements/EventRequirements.js'
import ParticipationFAQ from './app/Components/ParticipationHome/ParticipationFAQ.js'
import BackButton from './app/Components/Icons/angle-left.js'
import SettingsCog from './app/Components/Icons/settingsCog.js'

const AppNavigator = createStackNavigator({
  Start: { screen: StartPage },
  Login: {screen: Login, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={''}/> })},
  ForgotPassword: {screen: ForgotPassword, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Login'}/> })},
  Participation: { screen: ParticipationHome, navigationOptions: ({ navigation }) => ({
                    headerRight: <SettingsCog navigation={navigation}/> }),
                  },
  Settings: {screen: Settings, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Home'}/> })
                    },
  PasswordReset: {screen: PasswordReset,
                  navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Settings'}/> }),
                    },
  ConfirmPassword: {screen: ConfirmPassword, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Settings'}/> })
                                      },
  NewPassword: {screen: NewPassword,
                navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={navigation.state.params.title}/> }),
                     },
  EventRequirements: {screen: EventRequirements, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Home'}/> })
              },
  ParticipationFAQ: {screen: ParticipationFAQ, navigationOptions: ({ navigation }) => ({
                    headerLeft: <BackButton navigation={navigation} title={'Home'}/> })
            },
  EventsHome: { screen: EventsShow, navigationOptions: ({ navigation }) => ({
                headerLeft: <BackButton navigation={navigation} title={navigation.state.params.title}/>})
              },
  IndividualEvent: { screen: IndivEvent, navigationOptions: ({ navigation }) => ({
                      headerLeft: <BackButton navigation={navigation} title={'Events'}/> })
              },
  ParticipationStatus: {screen: ParticipationStatus, navigationOptions: ({ navigation }) => ({
                        headerLeft: <BackButton navigation={navigation} title={navigation.state.params.title}/> })
              },
  LocationCheck: {screen: LocationCheck, navigationOptions: ({ navigation }) => ({
                  headerLeft: <BackButton navigation={navigation} title={'Sign In'}/> })
              },
  Rsvp: {screen: Rsvp, navigationOptions: ({ navigation }) => ({
                  headerLeft: <BackButton navigation={navigation} title={'Back To Event'}/> })
              },
});

const ResetPasswordNav = createStackNavigator({
//  StartPage: {screen: StartPage1},
  ForgotPasswordReset:  {screen: NewPassword}
});
const FullStack = createSwitchNavigator(
  {
  MainNavigator: AppNavigator,
  ForgotPasswordNavigator:  ResetPasswordNav,
  },
);

const AppContainer = createNavigationContainer( FullStack );

export default class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    screen: '',
  }
};


  render() {
    return(
        <AppContainer />
      );
  };
};
