/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Back icon for the upper left corner.
 * Notable Features: Displays a chevron if the user is on ios and a back arrow if the user is on android.
 */

import React, { Component } from 'react';

import {View,
        Text,
        StyleSheet,
        Dimensions,
        Platform
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { AppLoading, Font } from 'expo';

import FontAwesome
from '../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';

export default class BackButton extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fontLoaded: false
  };
}

  _error_Nav(email, error){
    const{navigate} = this.props.navigation;
      navigate('Error', {
        email: email,
        error: error
      });
  }


  async componentWillMount() {
    try {
      await Font.loadAsync({
        FontAwesome,
        MaterialIcons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      _this._error_Nav("angle_left", error);
    }
  }

  render() {

      if (!this.state.fontLoaded) {

        return (<AppLoading />);

      }
      else {
        if(Platform.OS === 'ios') {
          return(
            <View style={styles.container}>
              <Ionicons
                color={'white'}
                name={'ios-arrow-back'}
                size={(.1 * Dimensions.get('window').width)}
                onPress={() => this.props.navigation.goBack()}
                />

              <Text style={styles.title} onPress={() => this.props.navigation.goBack()}>Back</Text>
            </View>
          )
        }
        else {
          return(
            <View style={styles.container}>
              <MaterialIcons
                color={'white'}
                name={'arrow-back'}
                size={(.1 * Dimensions.get('window').width)}
                onPress={() => this.onPress()}
                />
            </View>
          )
        }
      }
    }
  };

  const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        fontSize: (.06 * Dimensions.get('window').width),
        color: 'white',
        marginLeft: (.02 * Dimensions.get('window').width),
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
      },
    }
  );
