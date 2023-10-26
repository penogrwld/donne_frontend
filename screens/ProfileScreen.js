import { View, Text, StyleSheet, TouchableOppacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from 'react-redux';
import React from "react";

export default function ProfileScreen() {
  const localFetch = '10.3.0.40'

  const user = useSelector((state) => state.user.value);

    return (
      <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
       
        <View style={styles.header}>
        <Text style={styles.headerText}>LE DONNEUR</Text>
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
  
          <View style={styles.title}>
           <Text style={styles.text}>SES DONS</Text>
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
    marginBottom: 150,
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
    borderRadius: 100,
    padding: 50,
    marginTop: 50,
  },
  header: {
    borderBottomWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800'
  },

});