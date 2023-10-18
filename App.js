import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';


const store = configureStore({
  reducer: { user },
 });

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <View style={styles.containerButtons}>
      <TouchableOpacity style={styles.buttons}>
      <Text style={styles.text}>JE DONNE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
      <Text style={styles.text}>JE TROUVE</Text>
      </TouchableOpacity>
      </View>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7C4AB'
  },

  containerButtons: {
    width: '80%',
  },

  buttons: {
    backgroundColor: '#74D48F',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset:{ width: 5,  height: 5, },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
  }, 

  text:{
    color: 'white',
    fontFamily: 'Montserrat',
  },

});