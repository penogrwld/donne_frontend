import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { localFetch } from "../localFetch";
import DenicheurCard from "../components/DenicheurCard";
import { ScrollView } from "react-native-gesture-handler";

export default function LikedScreen({navigation}) {
 
  const [swap, setSwap] = useState(true)
  const [accepted, setAccepted] = useState(false)


  const handleAccept = () => {
    setAccepted(!accepted)
  }
  
  const user = useSelector((state) => state.user.value);

  const [nbrLikes, setNbrLikes] = useState(5);
  const [objData, setObjData] = useState([])

  console.log(objData)
 
  useEffect(() => {
    fetch(`http://${localFetch}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {

        setNbrLikes(5-data.finalObj.likedObjects.length);

        const allObject = data.finalObj.likedObjects.map((obj, key) => {
          return <DenicheurCard key={key} 
          image={obj.image[0]} 
          title={obj.title} 
          avatar={obj.user.avatar}
          description={obj.description}
          condition={obj.condition}/> 

        });

        setObjData(allObject)

      });
  }, [user.token]);


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />

      <View style={styles.header}>
      {swap ? (<Text style={styles.headerText} >Coté Denicheur</Text>) : (<Text style={styles.headerText}>Coté Dénicheur</Text>) }  
        <FontAwesome name='exchange' size={32} color={'black'} onPress={() => navigation.navigate('Donneur')}/>
      </View>

      {objData}

        <View style={styles.reste}>
          <Text style={styles.resteText}>Il te reste {nbrLikes} likes !</Text>
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
  header: {
    borderBottomWidth: 1,
    marginTop: 130,
    marginLeft:0,
    padding: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    
    
    },

    arrowLeft: {
     alignItems: "flex-start",
     paddingLeft: 20,
     marginTop: 5
    },

  headerText: {
    fontSize: 20,
    fontWeight: '800'
  },

  // Style pour chaque composant

  imgItem: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // alignItems: "flex-start"
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
    justifyContent: "center"
  },
  textes: {
    marginLeft: 10

  },
  titleText: {
    fontWeight: '700',
    marginBottom: 10
  },

  // Style des boutons
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,

  },
  buttonNo: {
    backgroundColor: "#A896CF",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50
  },
  buttonYes: {
    backgroundColor: "#74D48F",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50
  },
  accepted: {
    marginTop: 10
    // borderWidth: 1,
    // flexDirection: 'column',
  },

  reste: {

    alignItems: "center",
    justifyContent: "center",

  },

  resteText: {
    fontWeight: '700',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 100,
  }

});

