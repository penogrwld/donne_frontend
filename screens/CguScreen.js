import { View, Text , StyleSheet, TouchableOpacity  } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CguScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
            <TouchableOpacity onPress={() => navigation.navigate('Si')}>
              <FontAwesome name="arrow-left" size={25} color="#000000" style={styles.backItem} />
            </TouchableOpacity>
            
      <View >
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
    
  backItem: {
    
    fontWeight: "bold" ,
    flex: 0.7,
    flexDirection:"row",
    alignItems: "flex-end",
    justifyContent:"space-between",
   

  }

   /*text: {
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "center",
    
  
  },*/
  
});