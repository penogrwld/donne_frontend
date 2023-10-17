import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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

    </View>
    </Provider>
  );
}
