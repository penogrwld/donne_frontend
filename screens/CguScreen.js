import { View, Text , StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CguScreen({navigation}) {
  return (
    <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
          <View style={styles.header}>
             <FontAwesome name="arrow-left" onPress={() => navigation.navigate('Su')} size={32} color="#000" />
          </View>
          <View name="Container vide"style={styles.containerVide}/>              
      <View >
            <Text name="CGU" style={styles.text}>CGU</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  header: {
    width: "100%",
    alignItems:"flex-start",
    flexDirection:"row",
    margin: 35,
    padding: 20,
    paddingTop: 10,
    //borderBottomWidth:1,
    //borderBottomColor:"red",
    //borderTopWidth:1,
    //borderTopColor:"red",
    justifyContent:"flex-start",
  },

  containerVide:{
    flex: .4,
    aligItems:"flex-start",
  },    

  text:{
    color:"black",
    fontWeight: "bold",
    fontSize:20
  }
  
  /*text: {
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "center",
    
  
  },*/
  
});