import { View, Text, StyleSheet, TouchableOppacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector } from 'react-redux';

export default function UserScreen() {

  const user = useSelector((state) => state.user.value);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
     
       <View style={styles.user}>
         <View style={styles.image}>
         <Text>+</Text>
         </View>

         <View style={styles.infos}>
         <Text>{user.firstname} {user.lastname}</Text>
         <Text>{user.email}</Text>
         </View>
       </View>

        <View style={styles.title}>
         <Text style={styles.text}>MES DONS</Text>
         <Text style={styles.text}>MES CATCHS</Text>
        </View>

     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  text: {
    margin: 30,
    marginBottom: 50,
    marginTop: 80,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,

  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  }, 
  image: {
    borderWidth: 1,
    backgroundColor: 'white',
   // borderRadius: '100%',
    padding: 50,
  },

});