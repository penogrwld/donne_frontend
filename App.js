import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SiScreen from "./screens/SiScreen";
import SuScreen from "./screens/SuScreen";
import ChoicesScreen from "./screens/ChoicesScreen";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./screens/HomeScreen";
import LikedScreen from "./screens/LikedScreen";
import DonationScreen from "./screens/DonationScreen";
import UserScreen from "./screens/UserScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ThanksScreen from "./screens/ThanksScreen";
import TutoScreen from "./screens/TutoScreen";
import SnapScreen from './screens/SnapScreen'
import CguScreen from './screens/CguScreen';



import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import object from "./reducers/object";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const store = configureStore({
  reducer: { user, object }
});



const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'User') {
          iconName = 'user-o';
        } else if (route.name === 'Liked') {
          iconName = 'heart-o';
        } else if (route.name === 'Donation') {
          iconName = 'plus-circle';
        } else if (route.name === 'Tuto') {
          iconName = 'hand-peace-o';
        } 

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#A896CF',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
    })}>
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Donation" component={DonationScreen} />
      <Tab.Screen name="Liked" component={LikedScreen} />
      <Tab.Screen name="Tuto" component={TutoScreen} />
    </Tab.Navigator>
  );
 }


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Si" component={SiScreen} />
          <Stack.Screen name="Su" component={SuScreen} />
          <Stack.Screen name="Choices" component={ChoicesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Cgu" component={CguScreen} />
          <Stack.Screen name="Snap" component={SnapScreen} />
          <Stack.Screen name="Thanks" component={ThanksScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
