import React, { Component } from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

export default class HeaderRightTextButton extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fontLoaded: false
  };
}

  onPress = () => {
    const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: this.props.navigateTo })
    ],
    });

    this.props.navigation.dispatch(resetAction);
  }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text} onPress={() => this.onPress()}>{this.props.title}</Text>
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
      text: {
        color: 'white',
        fontSize: (.02 * Dimensions.get('window').height),
        textAlign: 'center',
        marginRight: (.02 * Dimensions.get('window').width)
      },
    }
  );
