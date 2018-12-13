import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        ImageBackground,
      }
from 'react-native';

export default class ParticipationHome extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
}

onPressEvents = (email) => {
  const{navigate} = this.props.navigation;
    navigate('EventsHome', {
      email: email
    });
}

onPressParticipation = () => {
  const{navigate} = this.props.navigation;
    navigate('ParticipationStatus');
}
  render() {

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'No Email');

    return (
      <View style={styles.container}>
      //Background Image
          <ImageBackground source={require("../../Images/MissionChurch2.jpg")} style={styles.backgroundImage}>
          //Opacity over background Image
            <View style={styles.opacity}>
            //Header
              <View style={styles.headerContainer}>
                <Text style={styles.title_b}>UHP Participation Tracker</Text>
              </View>
              //First line of opacities
              <View style={styles.opacityContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressEvents(email)}>
                  <Text style={styles.title_w}>Honors Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressParticipation()}>
                  <Text style={styles.title_w}>Participation Status</Text>
                </TouchableOpacity>
              </View>
              //A second line of opacities for future development
              <View style={styles.opacityContainer}>
              </View>

            </View>

          </ImageBackground>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    },
  opacityContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30738',
    //borderRadius is ios only
    borderRadius: 5,
    height: 160,
    width: 160,
    marginTop: 25
    },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
