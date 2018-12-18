import React, { Component } from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { AppLoading, Font } from 'expo';

import FontAwesome
from '../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons
from '../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

export default class AngleLeft extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fontLoaded: false
  };
}

  onPress = () => this.props.navigation.goBack();

    async componentWillMount() {
      try {
        await Font.loadAsync({
          FontAwesome,
          MaterialIcons
        });
        this.setState({ fontLoaded: true });
      } catch (error) {
        console.log('error loading icon fonts', error);
      }
    }

    render() {

      if (!this.state.fontLoaded) {

        return (<AppLoading />);

      }
      return (
        <View style={styles.container}>
          <Icon
            color={'white'}
            name={'angle-left'}
            size={.12 * Dimensions.get('window').width}
            onPress={() => this.onPress()}
            />

          <Text style={styles.title} onPress={() => this.onPress()}>{this.props.title}</Text>
        </View>
      );
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
      },
    }
  );
