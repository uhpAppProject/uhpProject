# Project Description

  This is the code base for a cross platform mobile application written using React Native for the Santa Clara University
  Honors Program. Currently the app serves 3 functions:

    - Informational: The app contains a FAQ and other resources about the SCU honors program.
    - Participation Tracking: Users can check on their honors program participation requirements with the app.
    - Event Check-Ins: Users can RSVP for upcoming events in the app as well as check into events currently happening given they are in the correct location.

  This app was built by Santa Clara University students and is not directly affiliated with the University.

## Front End

  The user interface is written in JavaScript using React Native. The dependencies are as follows:

   - @expo/vector-icons: ^8.0.0
   - expo: ^32.0.0
   - expo-cli: ^2.21.1
   - global: ^4.3.2
   - googleapis: 27
   - react: 16.5.0
   - react-native: https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz
   - react-native-elements: ^0.19.1
   - react-native-vector-icons: ^4.4.2
   - react-navigation: ^2.18.2

## Back End

  The app uses The Google Suite as a backend. Specifically, it uses Google Sheets to store user data and Google Calendar to store events data. Google Forms are also used to track check-ins and RSVPs. All backend functionality is implemented
  with Google Apps Scripts, Google's cloud based JavaScript scripting platform.

  For help implementing such a back end, contact [Brad Just](mailto:bradpjust@gmail.com).

## Installation

  ...

# Usefulness

  This project was specifically created for the Santa Clara University Honors Program. But it can be used as a template
  for simple "quarry, fetch, and update" applications. Some notable features are:

    - Google sign-in functionality
    - Scrolling effects using React Native Animate
    - Code for checking a user's location against predefined longitude and latitude coordinates given a predefined radius.

  The app can easily be modified to work with a php-mysql backend and in fact initially was implemented in this way. Send me an email at mailto:bradpjust@gmail.com if interested in such a modification.

# Creators

  - Bradley Just and Alexa Kissas developed the code.
  - Hayley Trillo designed the UI.
