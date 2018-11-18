import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
      }
from 'react-native';

import { withNavigation } from 'react-navigation';

class StickyLogic extends Component {

  _onPressText = () => {
    const{navigate} = this.props.navigation;
    navigate('EventsHome')
  }

  render(){
    if(this.props.status == "COMPLETE") {
      return(
        <View style={styles.stickyContainer}>
          <View>
            <Text style={styles.textContainer}>{this.props.type}: <Text style={styles.textBold}>COMPLETE</Text></Text>
          </View>

          <View style={styles.completeContainer}>
            <View style={styles.bottomComplete}>
              <Text style={[styles.textContainer, styles.textBold]}>Event Attended:</Text>
              <Text style={[styles.textContainer, styles.textBold]}>Date Completed:</Text>
            </View>

            <View style={styles.bottomComplete}>
              <Text style={styles.textContainer}>UHP Presents</Text>
              <Text style={styles.textContainer}>11-9-18</Text>
            </View>
          </View>
        </View>
      )
    }
    else {
      return(
        <View style={styles.stickyContainer}>
          <View style={styles.incompleteContainer}>
            <Text style={styles.textContainer}>{this.props.type}: <Text style={styles.textBold}>INCOMPLETE</Text></Text>
            <Text style={styles.textContainer}>Must complete this event by the end of spring quarter</Text>
            <Text style={[styles.textContainer, styles.textBold]} onPress={() => this._onPressText()}>Press here to see list of upcoming events</Text>
          </View>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
    stickyContainer: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 15,
      marginRight: 15,
      paddingVertical: 20,
      backgroundColor: '#F7FFCB',
      shadowColor: 'black'
    },
    textContainer: {
      fontSize: 20,
      textAlign: 'center',
    },
    textBold:{
      fontWeight: 'bold',
    },
    completeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    incompleteContainer: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    bottomComplete: {
      flexDirection: 'column'
    },
})

export default withNavigation(StickyLogic);
