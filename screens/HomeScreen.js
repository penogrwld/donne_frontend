import { View, Text, SafeAreaView, StyleSheet,} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { localFetch } from "../localFetch";
import { useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function HomeScreen({navigation}) {
  
  const user = useSelector((state)=> state.user.value)

  const [don, setDon] = useState([])
  const [disliked, setDisliked] = useState(false)


  useEffect(() => {
    fetch(`http://${localFetch}:3000/objects/${user.token}`)
    .then((response) => response.json())
    .then(data => {
      setDon(data.result) 
    })
  }, [disliked]);

let currentItemIndex = Math.floor(Math.random()*don.length)

  let card = <></>
  if(don.length > 0 && currentItemIndex < don.length) { // Pour vérifier qu'il y a bien des objets à donner
    card =  [don[currentItemIndex]].map( data => {
          return <ItemCard key={data.title} item = {data}/> 
      })
      }


  const handleDislike = () => {   // clic sur le bouton X
    setDisliked(!disliked) // affiche le prochain element du tableauu
    
  };
  
  const handleLike = () => { 
    fetch(`http://${localFetch}:3000/users/like/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({object: don})
    })
    .then((response)=>response.json())
    .then(data => fetch(`http://${localFetch}:3000/objects/${user.token}`)
    .then((response) => response.json())
    .then(data => {
      setDon(data.result) 
    }))
   
  };
      
  return (
    <View style={styles.container}>

        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.header}>
        <FontAwesome name='arrow-left' size={32} color={'black'} onPress={() => navigation.navigate('Choices')} style={styles.arrowLeft}/>
       </View>

        <Text style={styles.headertext}>Quoi de neuf autour de moi ?</Text>
        
        {card}       
            
        <View style={styles.likeornot}>
            <Icon name="times" onPress={handleDislike} style={styles.cross} size={120} color='#A896CF'/>
            <FontAwesome name='heart' onPress={handleLike} style={styles.heart} size={100} color='#74D48F' /> 
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
  likeornot: {
    flexDirection: 'row',
    width: 400,
    height : 160,
    justifyContent: 'space-around',
    
  },
  namepage: {
    marginTop: 50,
  },
  header: {
    width: '100%',
    margin: 30,
    padding: 20,
    justifyContent: "flex-start",
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 18,
    paddingBottom: 10,
    marginBottom: 10,
  },
  
  heart: {
    paddingTop: 13,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,

  },
  cross : {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,

  }

});