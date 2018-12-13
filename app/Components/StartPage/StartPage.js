import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        ActivityIndicator,
      }
from 'react-native';

import FormData from 'FormData';

export default class StartPage extends Component {
//works for valid users, throws a parse error for invalid users
  constructor(props) {
  super(props);
  this.state = {
    user_email: 'bjust@scu.edu',
    isLoading: true,
    alreadyStored: false,
  }
}

postEmailAsync = (url, email, asyncTitle) => {

    var formData = new FormData();
    formData.append('email', email);

    fetch( url , {
      method: 'POST',
      body: formData,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem(asyncTitle, JSON.stringify(responseJson));
      })
    .catch((error) => {
      console.error(error);
    });
  }

fetchEventsAsync = (url, asyncTitle) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem(asyncTitle, JSON.stringify(responseJson));
      })
    .catch((error) => {
      console.error(error);
    });
  }

  onPress = () => {
    const{navigate} = this.props.navigation;
      navigate('Participation', {
        email: this.state.user_email
      });
    }

  componentDidMount(){
    const ip = 'www.scuhonors.com';
    this.fetchEventsAsync('http://'+ ip + '/select_all_from_events.php', 'Events');
    this.postEmailAsync('http://' + ip + '/participation_status_query.php', this.state.user_email, 'userInfo');
    this.setState({isLoading: false});
  }

  render() {

    if(this.state.isLoading){
      return(
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      )
    }
    else {
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
      )
    }
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
