import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        Dimensions,
      }
from 'react-native';

export default class PostIt extends Component {
  constructor(props) {
  super(props);
  this.state = {
  }
};

  render() {

      return (
                <View style={styles.postItContainer}>

                  <View style={styles.postItHeader}>
                    <Text style={styles.postItHeaderText}>{this.props.title}</Text>
                  </View>

                  <View style={styles.postItBody}>
                    <Text style={styles.postItBodyText}>{this.props.contents}</Text>
                  </View>

                </View>
      );
    };
  };


const styles = StyleSheet.create({
  postItContainer: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: (.9 * Dimensions.get('window').width),
    marginTop: (.05 * Dimensions.get('window').height),
    marginBottom: (.05 * Dimensions.get('window').height),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  postItHeader: {
    alignItems: 'center',
    marginTop: (.02 * Dimensions.get('window').height),
  },
  postItHeaderText: {
    fontSize: (.03 * Dimensions.get('window').height),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postItBody: {
    alignItems: 'flex-start',
    marginLeft: (.02 * Dimensions.get('window').width),
    marginRight: (.02 * Dimensions.get('window').width),
    marginTop: (.05 * Dimensions.get('window').height),
    marginBottom: (.02 * Dimensions.get('window').height),
  },
  postItBodyText: {
    fontSize: (.025 * Dimensions.get('window').height),
  },
});
