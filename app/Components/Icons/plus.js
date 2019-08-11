/*
 * Coded by Brad Just on 7/22/19.
 * Purpose: Loads a plus icon to be displayed.
 * Notes: Animation
 */

import React, { Component } from 'react';

import {
        View,
        Text,
        StyleSheet,
        Dimensions,
        Platform,
      }
from 'react-native';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { AppLoading, Font } from 'expo';

export default class Plus extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fontLoaded: false
  };
}

  async componentWillMount() {
    try {
      await Font.loadAsync({
        MaterialIcons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      this.props.navigation.navigate('Error', { email: 'Plus', error: error });
    }
  }

  render() {

      var opacity = this.props.opacity

      if (!this.state.fontLoaded) {

        return (<AppLoading />);

      }
      else {
        return(
          <View style={styles.container}>
            <Ionicons
              color={'rgba(255, 255, 255,' + String(this.props.opacity) + ')'} //allows the opacity to be animated
              name={'ios-add'}
              size={(.1 * Dimensions.get('window').width)} //allows size to be animated
              />
          </View>
        )
      }
    }
  };

  const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    }
  );
