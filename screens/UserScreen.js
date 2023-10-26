import { View, Text, StyleSheet, TouchableOppacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserScreen() {

  const user = useSelector((state) => state.user.value);
  console.log(user)

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
     
        <View style={styles.header}>
        <FontAwesome name='arrow-left'/>
        <Text style={styles.headerText}>MON COMPTE</Text>
        </View>


       <View style={styles.user}>
         
         <View style={styles.image}>
         <Text>+</Text>
         </View>

         <View style={styles.infos}>
         <Text>{user.firstname} {user.lastname}</Text>
         <Text>{user.email}</Text>
         </View>
       </View>

       <View style={styles.text1}>
       <Text>MES DONS</Text>
       </View>

         <View style={styles.dons}>
          <Text>+</Text>
         </View>

       <View style={styles.text2}>
       <Text>MES CATCHS</Text>
       </View>

         <View style={styles.catchs}>
          <Text>+</Text>
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
  text1: {
    marginBottom: 150,
    marginTop: 80,
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10,
  },

  text2: {
    marginBottom: 125,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: 'black',
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
    // borderRadius: '50%',
    padding: 50,
    marginTop: 50,
  },
  header: {
    borderBottomWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",

  },
  headerText: {
    fontSize: 20,
    fontWeight: '800'
  },
  dons: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    
  },
  catchs: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

});