import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        ActivityIndicator,
        AsyncStorage,
        ImageBackground,
        ScrollView,
        Dimensions,
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

static navigationOptions = {
  headerLeftContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '2%'
  },
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: '#B30738',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
  }
};

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
            <Text style={styles.headerTitle}>Participation</Text>
            <Text style={styles.headerText}>{this.state.status}</Text>
          </View>

          <ImageBackground source={require("../../Images/paticipation_status_background.png")} style={styles.backgroundImage}>
            <View style={styles.opacity}>
              <ScrollView style={styles.stickyContainer}>
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
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30738',
  },
  headerContainer: {
    height: '13%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#B30738',
  },
  headerTitle: {
    color: 'white',
    fontSize: (.045 * Dimensions.get('window').height),
    fontWeight: 'bold'
  },
  headerText: {
    color: 'white',
    fontSize: (.035 * Dimensions.get('window').height),
  },
  backgroundImage: {
    height: '100%',
    width: '100%'
  },
  opacity: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  stickyContainer: {
    height: (.74 * Dimensions.get('window').height),
    marginBottom: (.5 * Dimensions.get('window').height),
  },
})
