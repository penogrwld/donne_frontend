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

      fetch(`${localFetch}/users/dislike/${user.token}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({ object: props.id })
      })
        .then(response => response.json())
        .then(data => {
          dispatch(removeLike())
        })
       }
      
       console.log(props)

    return (


<View style={styles.card}>

    <View style={styles.title}>
    <Text style={styles.text}>{props.title}</Text>
    </View>

    <View style={styles.middle} >
      <Image style={styles.imgItem} source={{ uri: props.image }} />

      <View style={styles.right}>
            <Text style={[styles.description, { maxWidth: 270 }]} >"{props.description}"</Text>
            <Text style={styles.condition}>{props.condition}</Text>
      </View>

      <FontAwesome onPress={() => handleDelete()} 
      style={styles.trash} name='trash-o' size={25} color='black'
      />
    </View>

    <View style={styles.bottom}>
      {props.avatar ? (
        <Image
        style={styles.imgDonneur}
        source={{ uri: props.avatar }}
        />
        ) : (
          <Image
          style={styles.imgDonneur}
          source={require("../assets/smile.png")}
        />
        
      )}
      
      <Text style={styles.user}> @{props.name}</Text>

    </View>
    <View style={styles.message}>
        <Text style={[styles.attention, { maxWidth: 350 }]}  > Attends le retour du donneur par téléphone ☎️ {'\n'}(s'il accepte ta demande)</Text>
    </View>
</View>

    );

  }
  

  const styles = StyleSheet.create({

    card: {
      margin: 10,
      flexWrap: 'wrap',
      paddingTop: 20,
      backgroundColor: 'rgba(255 255 255 / 0.9)',
      shadowColor: 'gray', // Ajout de l'ombre
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      borderRadius: 15,
    },

    title: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center',
    },

    text: {
      fontSize: 18,
      paddingBottom: 4,
      marginBottom: 4,
      fontWeight: 'bold',
      color: "#74D48F",
      fontSize: 22,
      textDecorationLine: 'underline'
    },

    trash: {
    paddingBottom: 20,
    },


    middle: {
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
      marginLeft: 30,
      marginBottom: 20,
      marginTop: 20,
    },

    bottom: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    user: {
      fontWeight: 'bold',
    },

    condition: {
      fontStyle: 'italic',
    },

    description: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 15,

    },
    attention: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 15,
    },
    message: {
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center'
    }

  });

