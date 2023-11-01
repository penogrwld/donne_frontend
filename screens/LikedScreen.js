import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { localFetch } from "../localFetch";
import DenicheurCard from "../components/DenicheurCard";

export default function LikedScreen({navigation}) {
 
  const [swap, setSwap] = useState(true)
  const [accepted, setAccepted] = useState(false)

 

  const [nbrLikes, setNbrLikes] = useState(5);
  const [objData, setObjData] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleAccept = () => {
    setAccepted(!accepted)
  }
  
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${localFetch}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setNbrLikes(5-data.finalObj.likedObjects.length);
        setObjData(data.finalObj.likedObjects)
      });
  }, [user.numberLikes]);
  
  const allObject = objData.map((obj, key) => {
    console.log(obj.user)
    return <DenicheurCard key={key} 
    id = {obj._id}
    image={obj.image[0]} 
    title={obj.title} 
    // avatar={obj.user.avatar}
    description={obj.description}
    condition={obj.condition}/> 
  })
  



  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />

      <View style={styles.header}>
        <FontAwesome name='arrow-left' style={styles.iconTop} size={32} color={'black'} onPress={() => navigation.navigate('Trouver')}/>
           <Text style={styles.headerText} >MES LIKES </Text>  
        <FontAwesome name='exchange' style={styles.iconTop2} size={31} color={'black'} onPress={() => navigation.navigate('Donneur')}/>
      </View>

    <ScrollView>
        {allObject}
    </ScrollView>

        <View style={styles.reste}>
          <Text style={styles.resteText}>Tu peux encore liker {nbrLikes} objets !</Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  header: {
    borderBottomWidth: 1,
    marginTop: 50,
    marginLeft:0,
    padding: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between", 
    },
    headerText: {
      fontSize: 20,
      fontWeight: "800",
    },
    arrowLeft: {
     alignItems: "flex-start",
     paddingLeft: 10,
     paddingTop: 50,
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
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  resteText: {
    fontWeight: '700',
    fontSize: 20,
    fontStyle: 'italic',
    
  },
  iconTop: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
  iconTop2: {
    paddingRight: 10,
    paddingBottom: 2,
  }

});

