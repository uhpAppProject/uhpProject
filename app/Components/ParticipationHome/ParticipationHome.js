import React, { Component } from 'react';
import {
        StyleSheet,
        View,
        Image,
        Text,
        TouchableOpacity,
        AsyncStorage,
        ImageBackground,
        Dimensions,
      }
from 'react-native';


export default class ParticipationHome extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
}

static navigationOptions = {
  title: 'Home',
  headerStyle: {
    height: (.07 * Dimensions.get('window').height),
    backgroundColor: '#B30738',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: (.03 * Dimensions.get('window').height)
  },
};

onPressEvents = (email) => {
  const{navigate} = this.props.navigation;
    navigate('EventsHome', {
      email: email,
      title: 'Home'
    });
}

onPressParticipation = () => {
  const{navigate} = this.props.navigation;
    navigate('ParticipationStatus');
}

onPressEventReqs = () => {
  const{navigate} = this.props.navigation;
    navigate('EventRequirements');
}

onPressParticipationFAQ = () => {
  const{navigate} = this.props.navigation;
    navigate('ParticipationFAQ');
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
              //First line of opacities
              <View style={styles.buttons}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onPressEvents(email)}>
                      <Text style={styles.title_w}>Upcoming Honors Events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.onPressParticipation()}>
                      <Text style={styles.title_w}>Participation Status</Text>
                    </TouchableOpacity>
                  </View>
                  //A second line of opacities for future development
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onPressEventReqs()}>
                      <Text style={styles.title_w}>Event Requirements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.onPressParticipationFAQ()}>
                      <Text style={styles.title_w}>Honors Participation FAQs</Text>
                    </TouchableOpacity>
                  </View>
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
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  opacity: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttons: {
    flex: 1,
    marginTop: '15%'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: '2%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
    },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30738',
    //borderRadius is ios only
    borderRadius: 5,
    height: '72%',
    width: '47%',
    },
  title_w: {
    color: 'white',
    textAlign: 'center',
    fontSize: (.04 * Dimensions.get('window').height),
    padding: 5
    },
  }
);
