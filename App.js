import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

