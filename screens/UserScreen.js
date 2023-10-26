import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeProfilePic } from "../reducers/user";
import { localFetch } from "../localFetch";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserScreen({navigation}) {

  const user = useSelector((state) => state.user.value)
  const image = useSelector((state)=> state.image.value)

  const handleRemove = () => {
    fetch(`http://${localFetch}:3000/users/remove/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(dispatch(removeProfilePic()))
  }

  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
     
        <View style={styles.header}>
        <FontAwesome name='arrow-left'/>
        <Text style={styles.headerText}>MON COMPTE</Text>
        </View>


       <View style={styles.user}>
         
         <View style={styles.photos}>
         {!user.avatar ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("UserSnap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
          <View style={styles.deleteContainer}>
                <Image style={styles.image} source={{ uri: user.avatar }} />
                <TouchableOpacity onPress={() => handleRemove()}>
                <FontAwesome name='times-circle-o' size={20} color='#000000' style={styles.deleteIcon} />
                </TouchableOpacity>
                </View>)}
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
  user: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: '20%',
  }, 
  photos: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    height: 110,
    width: 110,
  },
  addPhoto: {
    backgroundColor: 'white',
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
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

  image: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: '100%',
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