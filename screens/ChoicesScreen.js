import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addLatitude, addLongitude } from "../reducers/user";
import * as Location from 'expo-location';

export default function ChoicesScreen({ navigation }) {
  
  const user = useSelector((state)=> state.user.value)
  const dispatch = useDispatch()
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
        
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
            setIsLoading(false)
          });
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoading && currentPosition) {
      dispatch(addLatitude(currentPosition.latitude));
      dispatch(addLongitude(currentPosition.longitude));
    }
  }, [isLoading, currentPosition]);




  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.buttons} 
        onPress={() => navigation.navigate('TabNavigator', {screen :'Donner'})}>
          <Text style={styles.text}>JE DONNE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}
        onPress={() => navigation.navigate('TabNavigator', {screen :'Trouver'})}>
          <Text style={styles.text}>JE TROUVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  containerButtons: {
    width: "80%",
  },
  buttons: {
    backgroundColor: "#74D48F",
    padding: 20,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  text: {
    color: "white",
  },
});
