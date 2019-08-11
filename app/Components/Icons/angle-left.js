/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Back icon for the upper left corner.
 * Notes: Displays a chevron if the user is on ios and a back arrow if the user is on android.
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

  async componentWillMount() {
    try {
      await Font.loadAsync({
        FontAwesome,
        MaterialIcons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      this.props.navigation.navigate('Error', { email: 'angle_left', error: error });
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
                onPress={() => this.props.navigation.goBack()}
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
