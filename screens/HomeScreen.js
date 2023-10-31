import { View, Text, SafeAreaView, StyleSheet,} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { localFetch } from "../localFetch";
import { useDispatch, useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addLike } from "../reducers/user";


export default function HomeScreen({navigation}) {
  
  const user = useSelector((state)=> state.user.value)
  const dispatch = useDispatch()

  const [don, setDon] = useState([])
  const [disliked, setDisliked] = useState(false)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  // let currentItemIndex = Math.floor(Math.random()*don.length)

  useEffect(() => {
    fetch(`https://donne-backend-pljfklhkf-penogrwld.vercel.app/objects/${user.token}`)
    .then((response) => response.json())
    .then(data => {
      setDon(data.result) 
      setCurrentItemIndex(Math.floor(Math.random() * data.result.length))
    })
  }, [disliked]);


  let card = <></>
  if(don.length > 0 && currentItemIndex < don.length) { // Pour vérifier qu'il y a bien des objets à donner
    card =  [don[currentItemIndex]].map( data => {
          return <ItemCard key={data.image[0]} item = {data}/> 
      })
      }


  const handleDislike = () => {   // clic sur le bouton X
    setDisliked(!disliked) // affiche le prochain element du tableauu
    
  };
  
  const handleLike = () => { 
    fetch(`https://${localFetch}/users/like/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({object: don[currentItemIndex]})
    })
    .then((response)=>response.json())
    .then(data => fetch(`https://donne-backend-pljfklhkf-penogrwld.vercel.app/objects/${user.token}`)
    .then((response) => response.json())
    .then(data => {
      setDon(data.result) 
      dispatch(addLike())
    }))
   
  };

  return (
    <View style={styles.container}>

        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.header}>
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