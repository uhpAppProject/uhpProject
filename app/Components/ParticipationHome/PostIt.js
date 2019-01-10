import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Text,
        TouchableOpacity,
        Dimensions,
      }
from 'react-native';

import { withNavigation } from 'react-navigation';

class PostIt extends Component {
  constructor(props) {
  super(props);
  this.state = {
  }
};

_onPress = () => {
  const{navigate} = this.props.navigation;
  navigate('ParticipationStatus', {
    title: 'FAQ',
  })
}
  render() {
    if(this.props.button){
      return(
        <View style={styles.container}>
          <View style={[styles.postItContainer, {marginBottom:(.02 * Dimensions.get('window').height)}]}>
            <View style={styles.postItHeader}>
              <Text style={styles.postItHeaderText}>{this.props.title}</Text>
            </View>
            <View style={styles.postItBody}>
              <Text style={styles.postItBodyText}>{this.props.contents}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={ () => this._onPress()}>
            <Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
          </TouchableOpacity>
        </View>
        )
    }
    else{
      return (
        <View style={[styles.postItContainer, {marginBottom:(.05 * Dimensions.get('window').height)}]}>

          <View style={styles.postItHeader}>
            <Text style={styles.postItHeaderText}>{this.props.title}</Text>
          </View>

          <View style={styles.postItBody}>
            <Text style={styles.postItBodyText}>{this.props.contents}</Text>
          </View>

        </View>
      );
    }
    };
  };


const styles = StyleSheet.create({
  container: {},
  postItContainer: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: (.9 * Dimensions.get('window').width),
    marginTop: (.05 * Dimensions.get('window').height),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  postItHeader: {
    alignItems: 'center',
    marginTop: (.02 * Dimensions.get('window').height),
  },
  postItHeaderText: {
    fontSize: (.03 * Dimensions.get('window').height),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: (.02 * Dimensions.get('window').width),
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: (.1 * Dimensions.get('window').height),
    width: (.9 * Dimensions.get('window').width),
    marginBottom: (.05 * Dimensions.get('window').height),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 1,
    elevation: 5,
  },
  buttonText: {
    fontSize: (.035 * Dimensions.get('window').height),
  }
});

export default withNavigation(PostIt);
