import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/signInScreen';
import SignUpScreen from './screens/signUpScreen';
import choicesScreen from './screens/choicesScreen';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
 });

export default function App() {
  return (
    <Provider store={store}>
    {/* <View style={styles.container}>

    </View> */}
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
       <Stack.Screen name="signIn" component={SignInScreen} />
       <Stack.Screen name="signUp" component={SignUpScreen} />
       <Stack.Screen name="Choices" component={choicesScreen} />
     </Stack.Navigator>
   </NavigationContainer>
    </Provider>
  );
}

