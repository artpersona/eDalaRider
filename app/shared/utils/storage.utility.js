import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLoggedUser = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('loggedUser', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getLoggedUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('loggedUser');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const storeAuthToken = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('authToken', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getAuthToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('authToken');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export {storeLoggedUser, getLoggedUser, storeAuthToken, getAuthToken};
