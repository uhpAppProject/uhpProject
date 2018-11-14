import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
      }
from 'react-native';

export default class ParticipationHome extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
}

onPressEvents = () => {
  const{navigate} = this.props.navigation;
    navigate('EventsHome');
}

onPressParticipation = () => {
  const{navigate} = this.props.navigation;
    navigate('EventsHome');
}
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title_b}>UHP Participation Tracker</Text>
        <View style={styles.opacityContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressEvents()}>
            <Text style={styles.title_w}>Honors Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressParticipation()}>
            <Text style={styles.title_w}>Participation Status</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'white'
  },
  opacityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: '100%'
  },
  logoContainer: {
    width: 300,
    height: 300
  },
  buttonContainer: {
    backgroundColor: '#B30738',
    height: 175,
    width: 160,
    marginTop: 25

},
  title_w: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 10
  },
  title_b: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 10
  },

  }
);
