import { View, Text , StyleSheet, TouchableOpacity  } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'

export default function CguScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <Text>CGU lorem ipsum</Text>
         <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttons}>
               <Text style={styles.text}>ACCEPTER</Text>
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
  containerButton: {
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "center",
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