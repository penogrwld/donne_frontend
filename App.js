import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ChoicesScreen from "./screens/ChicesScreen";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./screens/HomeScreen";
import LikedScreen from "./screens/LikedScreen";
import DonationScreen from "./screens/DonationScreen";
import UserScreen from "./screens/UserScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ThanksScreen from "./screens/ThanksScreen";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const store = configureStore({
  reducer: { user },
});



const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'User') {
          iconName = 'user';
        } else if (route.name === 'Liked') {
          iconName = 'comment';
        } else if (route.name === 'Donation') {
          iconName = 'plus-circle';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#A896CF',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
    })}>
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Liked" component={LikedScreen} />
      <Tab.Screen name="Donation" component={DonationScreen} />
    </Tab.Navigator>
  );
 }


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
