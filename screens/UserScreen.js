import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeProfilePic } from "../reducers/user";
import { localFetch } from "../localFetch";
import { logout } from "../reducers/user";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserScreen({navigation}) {


  const user = useSelector((state) => state.user.value)
  const image = useSelector((state)=> state.image.value)
  const dispatch = useDispatch()

  const handleRemove = () => {
    fetch(`http://${localFetch}:3000/users/remove/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(dispatch(removeProfilePic()))
  }


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        {/* <FontAwesome name='arrow-left' size={32} color={'black'} onPress={() => navigation.navigate('Choices')} style={styles.arrowLeft}/> */}
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
         <TouchableOpacity style={styles.logout} onPress={()=> {
          dispatch(logout())
          navigation.navigate('Si')
          }}>
          <Text>LOGOUT</Text>
         </TouchableOpacity>
         </View>
       </View>

       <View style={styles.text1}>
       <Text>MES DONS</Text>
       </View>

          <TouchableOpacity onPress={()=>navigation.navigate('Donner')}>
         <View style={styles.dons}>
          <Text>+</Text>
         </View>
          </TouchableOpacity>

       <View style={styles.text2}>
       <Text>MES CATCHS</Text>
       </View>

          {/* <TouchableOpacity>
         <View style={styles.catchs}>
          <Text>+</Text>
         </View>
          </TouchableOpacity> */}


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
  header: {
    borderBottomWidth: 1,
    padding: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"

  },
  // arrowLeft:{
  //   alignItems: "flex-start",
  //   marginLeft: 15,
  //   marginTop: 5
  // },
   headerText: {
    fontSize: 20,
    fontWeight: '800',
    justifyContent:'center',
    paddingRight:5,
    paddingTop: 20
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
    borderRadius: 100,
    padding: 50,
    marginTop: 50,
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
  logout: {
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#A896CF',
    height: 30,
  }

});