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
        ActivityIndicator,
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
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: (.03 * Dimensions.get('window').height),
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    navigate('ParticipationStatus', {
      title: 'Home',
    }
  )
};


onPressEventReqs = () => {
  const{navigate} = this.props.navigation;
    navigate('EventRequirements');
}

onPressParticipationFAQ = (email) => {
  const{navigate} = this.props.navigation;
    navigate('ParticipationFAQ')
}


  render() {

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'No Email');

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color='#B30738' />
        </View>
      )
    }
    else{
    return (
      <View style={styles.container}>

          <ImageBackground source={require("../../Images/MissionChurch2.jpg")} style={styles.backgroundImage}>

            <View style={styles.opacity}>


              <View style={styles.buttons}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onPressEvents(email)}>
                      <Text style={styles.title}>Upcoming Honors Events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.onPressParticipation()}>
                      <Text style={styles.title}>Participation Status</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onPressEventReqs()}>
                      <Text style={styles.title}>Event Requirements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.onPressParticipationFAQ()}>
                      <Text style={styles.title}>Honors Participation FAQs</Text>
                    </TouchableOpacity>
                  </View>
                </View>

            </View>

          </ImageBackground>

      </View>

    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    shadowOpacity: 1.0,
    elevation: 5,
    },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30738',
    borderRadius: 5,
    height: '72%',
    width: '47%',
    },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: (.07 * Dimensions.get('window').width),
    margin: (.01 * Dimensions.get('window').width),
    },
  }
);
