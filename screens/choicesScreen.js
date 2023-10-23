import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function ChoicesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttons}>
              <Text style={styles.text}>JE DONNE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
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
