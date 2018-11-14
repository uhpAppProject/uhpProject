import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
      }
from 'react-native';

export default class StartPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    events: new Object(),
  }
}

async extractEvents() {
  try {
      await AsyncStorage.getItem('Events').then((response) => JSON.parse(response))
      .then((parsed) => {this.state.events = parsed})
      if(this.state.events[0] != undefined){
        alert(this.state.events[1].value);
      }
  }
  catch(error) {
    alert(error);
  }
}

onPress = () => {
  this.extractEvents();
  const{navigate} = this.props.navigation;
    navigate('Participation');
  }

  render() {

    fetch('http://172.20.73.143:8888/testing.php')
      .then((response) => response.json())
      .then((responseJson) => {
//        this.state.events = responseJson;
        AsyncStorage.setItem("Events", JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.error(error);
    });

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>SCU Honors Program Participation Tracker</Text>
        </View>
        <Image source={require("../../Images/SCU-Seal_Outlined_201-2-2.jpg")}
                      style={styles.logoContainer}></Image>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={ () => this.onPress()}>

          <Text style={styles.title}>Sign In</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white'
  },
  headerContainer: {
    backgroundColor: '#B30738',
    alignSelf: 'stretch',
    paddingVertical: 40,
  },
  logoContainer: {
    width: 300,
    height: 300
  },
  buttonContainer: {
    backgroundColor: '#B30738',
    paddingHorizontal: 110,
    paddingVertical: 25,
    marginBottom: 50
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 10
  },

  }
);
