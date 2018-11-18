import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ActivityIndicator,
      }
from 'react-native';

import FormData from 'FormData';

import StickyLogic from './EventStickyLogic.js'

export default class ParticiptionStatus extends Component {
  constructor(props) {
  super(props);
  this.state = {
    user_email: 'tlannister@scu.edu',
    user_info: new Object(),
    isLoading: true,
    status: ''
  };
}

  componentDidMount(){
    var formData = new FormData();
    formData.append('email', this.state.user_email);

    fetch('http://192.168.1.109.:8888/participation_status_query.php', {
      method: 'POST',
      body: formData,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
              user_info: responseJson,
              isLoading: false})
      })
    .catch((error) => {
      console.error(error);
    });
  }

  checkStatus = () => {
    if(this.state.user_info[0].academic_status == 'COMPLETE' && this.state.user_info[0].social_justice_status == 'COMPLETE'){
      this.state.status = 'COMPLETE';
    }
    else{
      this.state.status = 'INCOMPLETE';
    }
  }

  render() {

    if(this.state.isLoading){
      return(
        <View>
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
            <StickyLogic type={'UHP Academic Event'} status={this.state.user_info[0].academic_status} />
            <StickyLogic type={'Social Justice Event'} status={this.state.user_info[0].social_justice_status} />
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
