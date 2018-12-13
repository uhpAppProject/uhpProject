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
