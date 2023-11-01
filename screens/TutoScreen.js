  import { View, Text , StyleSheet, TouchableOpacity  } from 'react-native'
  import { LinearGradient } from "expo-linear-gradient";
  import React from 'react'

  export default function TutoScreen({navigation}) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <Text style={styles.textHeader}>BIENVENUE SUR DONNE !</Text>
          <View>
              <Text>Vous vous demandez peut être à quoi sert cette application ?</Text>
              <Text>Moi aussi.</Text>
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
    textHeader:{
      color: "#808080"
    }
  });