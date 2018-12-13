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
    navigate('EventsHome', {
      email: this.props.email
    })
  }

  render(){
    if(this.props.status == "COMPLETE") {
      return(
        <View style={styles.stickyContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.textContainer}>{this.props.type}: <Text style={styles.textBold}>COMPLETE</Text></Text>
          </View>
//there is problem with the formatting on the "Event Attended and Date Completed" parts, they don't line up
//can't get the text to be contained in the sticky in the right way
          <View style={styles.completeContainer}>
            <View style={styles.bottomComplete}>
              <View style={styles.event_dateContainer}>
                <Text style={[styles.textContainer, styles.textBold]}>Event Attended:</Text>
                <Text style={styles.textContainer}>{this.props.event}</Text>
              </View>
            </View>

            <View style={styles.bottomComplete}>
              <View style={styles.event_dateContainer}>
                <Text style={[styles.textContainer, styles.textBold]}>Date Completed:</Text>
                <Text style={styles.textContainer}>{this.props.date}</Text>
              </View>
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
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 15,
      marginRight: 15,
      paddingVertical: 20,
      backgroundColor: '#F7FFCB',
      shadowColor: 'black'
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    event_dateContainer: {
//      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
  //    backgroundColor: 'blue'
    },
    textContainer: {
      fontSize: 20,
      marginLeft: 5,
      marginRight: 5,
      textAlign: 'center',
    },
    textBold: {
      fontWeight: 'bold',
    },
    completeContainer: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-around',
//      backgroundColor: 'red'
    },
    incompleteContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    bottomComplete: {
//      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
//      backgroundColor: 'green'
    },
})

export default withNavigation(StickyLogic);
