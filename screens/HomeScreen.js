import { View, Text, SafeAreaView, StyleSheet,} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';
import { localFetch } from "../localFetch";
import { useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function HomeScreen({navigation}) {
  
  const user = useSelector((state)=> state.user.value)

  const [don, setDon] = useState([])


  useEffect(() => {
    fetch(`http://${localFetch}:3000/objects/${user.token}`)
    .then((response) => response.json())
    .then(data => {
      setDon(data.result) 
    })
  }, []);

  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  let card

  if(don.length > 0) { // Pour vérifier qu'il y a bien des objets à donner
    card =  [don[currentItemIndex]].map( data => {
          return <ItemCard key={data.title} item = {data} /> 
      })
      }


  const handleDislike = () => {   // clic sur le bouton X
    setCurrentItemIndex((currentItemIndex + 1) % don.length); // affiche le prochain element du tableauu
    
  };
  
  const handleLike = () => {  // clic sur le bouton COEUR qui modifie le tabBarBadge
  };
      
  return (
    <View style={styles.container}>

        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.header}>
        <FontAwesome5 name="arrow-left" onPress={() => navigation.navigate('Choices')} size={28} color="#000" />
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