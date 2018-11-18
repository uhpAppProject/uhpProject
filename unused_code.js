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


this.state.user_info[0].academic_status
this.state.user_info[0].social_justice_status
