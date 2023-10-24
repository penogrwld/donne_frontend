import { View, Text , StyleSheet, TouchableOpacity  } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CguScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
            <TouchableOpacity style={styles.backItem} onPress={() => navigation.navigate('SignUp')}>
              <FontAwesome name="arrow-left" size={25} color="#000000" />
            </TouchableOpacity>
            
      <View style={styles.text}>
            <Text>CGU lorem ipsum</Text>
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

  text: {
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  
  text: {
    color: "white",
  },
  backItem: {
    color: "white",
    fontWeight: "bold" ,

  }
});