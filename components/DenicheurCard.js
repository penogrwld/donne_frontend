import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { localFetch } from "../localFetch";
  import { removeLike } from "../reducers/user";


  import { useDispatch, useSelector } from 'react-redux';
  

  export default function DenicheurCard(props){


    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch()
    const handleDelete = () => {

      fetch(`http://${localFetch}:3000/users/unlike/${user.token}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({ object: props.objectId })
      })
        .then(response => response.json())
        .then(data => {
          dispatch(removeLike())
        })
       }
      

    return (


<View style={styles.card}>

    <View style={styles.title}>
    <Text style={styles.text}>{props.title}</Text>
    <FontAwesome onPress={() => handleDelete()}
    style={styles.trash} name='trash-o' size={25} color='black'
     />
    </View>


    <View style={styles.middle} >
      <Image style={styles.imgItem} source={{ uri: props.image }} />

      <View style={styles.right}>
      <Text style={[styles.description, { maxWidth: 270 }]} >"{props.description}"</Text>
      <Text style={styles.condition}>{props.condition}</Text>
      </View>
    </View>
    <View style={styles.bottom}>
      {props.avatar ? (
        <Image
          style={styles.imgDonneur}
          onPress={() => navigation.navigate("Profile")}
          source={{ uri: props.avatar }}
        />
      ) : (
        <Image
          style={styles.imgDonneur}
          onPress={() => navigation.navigate("Profile")}
          source={require("../assets/smile.png")}
        />
      )}
   <Text style={styles.user}>{props.user}</Text> 

    
    </View>

</View>

    );

  }
  

  const styles = StyleSheet.create({

    card: {
      flexWrap: 'wrap',
      borderWidth: 1,
      paddingTop: 20,
      backgroundColor: 'transparent',
      shadowColor: 'gray', // Ajout de l'ombre
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      borderRadius: 10,
    },

    title: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center',
      paddingLeft: 150,
    },

    text: {
      fontSize: 18,
      paddingBottom: 10,
      marginBottom: 10,
      fontWeight: 'bold',
    },

    trash: {
    // paddingLeft: 120,
    paddingBottom: 20,
    },


    middle: {
      // borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
   
    },

    condition: {
      padding: 10,
    },
    right: {
      margin: 10,
      alignItems: 'center',
    },

    imgItem: {
      width: 80,
      height: 80,
      borderRadius: 10,
      
    },

    imgDonneur:{
      width: 60,
      height: 60,
      borderRadius: 50,
      margin: 30,

    },

    bottom: {

      flexDirection: 'row',
  
    },

    condition: {
      fontStyle: 'italic',
    },

  });

