import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ActivityIndicator,
        AsyncStorage,
      }
from 'react-native';

import StickyLogic from './EventStickyLogic.js'

export default class ParticiptionStatus extends Component {
  constructor(props) {
  super(props);
  this.state = {
    user_info: new Object(),
    isLoading: true,
    status: ''
  };
}


  async extractUserInfo(asyncTitle) {
    /*Function for extracting input "asyncTitle" key from async storage and parsing it into
    A JS Object, then the funtion changes the isloading value with setState*/
    try {
      await AsyncStorage.getItem(asyncTitle)
      .then((response) => JSON.parse(response))
      .then((parsed) => {
          this.state.user_info = parsed
        })
      if(this.state.user_info[0] != undefined){
        this.setState({isLoading: false});
        }
      }
    catch(error) {
        alert(error);
        }
      }

  checkStatus = () => {
    if(this.state.user_info[0].academic_status == 'COMPLETE' && this.state.user_info[0].social_justice_status == 'COMPLETE'){
      this.state.status = 'COMPLETE';
    }
    else{
      this.state.status = 'INCOMPLETE';
    }
  }

  componentDidMount() {
    this.extractUserInfo('userInfo');
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

    this.checkStatus()

      return(
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Your Participation</Text>
            <Text style={styles.headerText}>Status: {this.state.status}</Text>
          </View>

          <View style={styles.stickyContainer}>
            <StickyLogic
                type={'UHP Academic Event'}
                status={this.state.user_info[0].academic_status}
                date={this.state.user_info[0].academic_date}
                event={this.state.user_info[0].academic_event_attended}
                email={this.state.user_info[0].email}
                />
            <StickyLogic
                type={'Social Justice Event'}
                status={this.state.user_info[0].social_justice_status}
                date={this.state.user_info[0].social_justice_date}
                event={this.state.user_info[0].social_justice_event_attended}
                email={this.state.user_info[0].email}
                />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#B30738',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  stickyContainer: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
})
