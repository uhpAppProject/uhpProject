async checkKeys() {
  //Function for checking the number of keys stored in AsyncStorage
  try {
    const keys = await AsyncStorage.getAllKeys()
    if(keys != null){
      this.state.keys = keys;
    }
  }
  catch(error) {
    alert(error);
  }
}


async testIfStored(asyncTitle) {
  //tests to see if info is already stored in async storage, if it is, returns true
  try {
      const item = await AsyncStorage.getItem(asyncTitle)
      if(item != null){
        return(true)
      }
    }
  catch(error) {
    alert(error);
  }
}

//code for switching from sign-in page to participation home while clearing the stack
_onPress = () => {
  const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [
    NavigationActions.navigate({ routeName: 'Participation', params: {email: this.state.user_email}})
  ],
  });

  this.props.navigation.dispatch(resetAction);
  }
