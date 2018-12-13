import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { withNavigation } from 'react-navigation';

class MyListItem extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
}

  _onPress = () => {
    const{navigate} = this.props.navigation;
      navigate('IndividualEvent', {
            title: this.props.title,
            requirement: this.props.requirement,
            location: this.props.location,
            date: this.props.date,
            time: this.props.time,
            description: this.props.description,
            email: this.props.email
        });
  }

  render() {
    return (
      <TouchableOpacity style={styles.opacityContainer} onPress={() => this._onPress()}>
        <View style={styles.elementContainer}>
          <Text style={[styles.leftText, styles.titleText]}>
            {this.props.title}
          </Text>
          <Text style={styles.rightText}>
            {this.props.location}
          </Text>
        </View>

        <View style={styles.elementContainer}>
          <Text style={styles.leftText}>
            {this.props.requirement}
          </Text>
          <Text style={styles.rightText}>
            {this.props.date}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.rightText}>
            {this.props.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    opacityContainer: {
      flex: 1,
      paddingVertical: 40,
      backgroundColor: 'white',
      },
    elementContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
      },
    titleText: {
      fontSize: 20
    },
    leftText: {
      marginLeft: 1,
    },
    rightText: {
      marginRight: 1,
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    }
  );

  export default withNavigation(MyListItem);
