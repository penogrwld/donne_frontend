import { View, Text , StyleSheet, TouchableOpacity  } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'
import ConfettiCannon from 'react-native-confetti-cannon';


export default function ThanksScreen({navigation}) {


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <Text style={styles.header}>🎉 MERCI POUR VOTRE DON ! 🎉</Text>
            
            <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />

        <View style={styles.containerButton}>
          <TouchableOpacity  onPress={() => navigation.navigate('Profil')} style={styles.button}>
            <Text style={styles.textButton}>Voir mes dons</Text>
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
  header:{
    fontWeight: 'bold',
    fontSize: '20',
    color: "#A896CF",
  },
  containerButton: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#74D48F",
    padding: 20,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
    textButton: {
    color: "white",
    
  },
  
});