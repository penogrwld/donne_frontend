import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function LikedScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <Text>Liked Screen</Text>
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
});